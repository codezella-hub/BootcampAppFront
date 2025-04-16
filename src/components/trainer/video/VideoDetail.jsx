import React, { useEffect, useState, useRef, useCallback } from 'react';
import Header from '../../student/Header';
import Footer from '../../student/Footer';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import _ from 'lodash';
import { useAuthStore } from '../../../store/authStore';

function VideoDetail() {
    const { user } = useAuthStore();
    const { id, subCourseId } = useParams();
    const [video, setVideo] = useState(null);
    const [ListVideo, setVideos] = useState([]);
    const [videoDuration, setVideoDuration] = useState(0);
    const videoRef = useRef(null);
    const navigate = useNavigate();
    const [progressId, setProgressId] = useState(null); // Store video progress _id
    const [videoProgress, setVideoProgress] = useState({});
    const [isMarkedDone, setIsMarkedDone] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [initialProgress, setInitialProgress] = useState(0);
    const initialPositionSet = useRef(false);
    // Static user ID for testing
    const STATIC_USER_ID = user._id;


const handleNavigateToQuiz = () => {
  const courseId = video.subCourse.course;
  const subCourseId = video.subCourse._id;
  navigate(`/quiz-create/${courseId}/${subCourseId}`);
};

    // Fetch initial progress and set video time
    useEffect(() => {
        // Modify fetchInitialProgress
        const fetchInitialProgress = async () => {
            try {
                const response = await axios.get(`/api/videoProgress/${id}`);
                if (response.status === 200) {
                    setProgressId(response.data._id);
                    setIsMarkedDone(response.data.completed);
                    setInitialProgress(response.data.watchedDuration || 0);

                    // Initialize current time state
                    setCurrentTime(response.data.watchedDuration || 0);
                }
            } catch (error) {
                console.log("No progress found, starting fresh");
                // Create initial progress record
                try {
                    const newProgress = await axios.post(`/api/UpdateVideoProgress/${id}`, {
                        user: STATIC_USER_ID,
                        video: id,
                        currentTime: 0,
                        duration: videoDuration
                    });
                    setProgressId(newProgress.data._id);
                } catch (error) {
                    console.error("Error creating initial progress:", error);
                }
            }
        };
        fetchInitialProgress();
    }, [id]);

    // Modify sendProgressUpdate to handle completion state
    const sendProgressUpdate = async (currentTime) => {
        try {
            const response = await axios.put(`/api/UpdateVideoProgress/${progressId}`, {
                user: STATIC_USER_ID,
                video: id,
                currentTime,
                duration: videoDuration
            });

            // Update completion state from response
            if (response.data.completed) {
                setIsMarkedDone(true);
                setVideoProgress(prev => ({ ...prev, [id]: true }));
            }
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    // 2-second debounced update instead of 5
    const debouncedUpdate = useCallback(
        _.debounce((ct) => sendProgressUpdate(ct), 2000),
        [progressId, videoDuration]
    );

    // Modify handleTimeUpdate
    const handleTimeUpdate = (e) => {
        const ct = e.target.currentTime;
        setCurrentTime(ct);

        // Check for auto-completion
        if (videoDuration > 0 && (ct / videoDuration) >= 0.95) {
            debouncedUpdate.flush();
        } else {
            debouncedUpdate(ct);
        }
    };
    // Save progress when leaving page
    useEffect(() => {
        // Modify beforeunload handler
        const handleBeforeUnload = () => {
            if (videoRef.current && progressId) {
                const ct = videoRef.current.currentTime;
                const data = new URLSearchParams();
                data.append('user', STATIC_USER_ID);
                data.append('video', id);
                data.append('currentTime', ct);
                data.append('duration', videoDuration);

                navigator.sendBeacon(
                    `/api/UpdateVideoProgress/${progressId}`,
                    data
                );
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            debouncedUpdate.flush();
        };
    }, [progressId, videoDuration]);

    // Immediate save on pause
    useEffect(() => {
        const videoElement = videoRef.current;

        const handlePause = () => {
            debouncedUpdate.flush();
        };

        if (videoElement) {
            videoElement.addEventListener('pause', handlePause);
        }

        return () => {
            if (videoElement) {
                videoElement.removeEventListener('pause', handlePause);
            }
        };
    }, [debouncedUpdate]);

    /* useEffect(() => {
         const fetchInitialProgress = async () => {
             try {
                 const response = await axios.get(`/api/videoProgress/${id}`);
                 if (response.status === 200) {
                     setProgressId(response.data._id);
                     setIsMarkedDone(response.data.completed);
                 }
             } catch (error) {
                 console.log("No progress found, starting fresh");
             }
         };
         fetchInitialProgress();
     }, [id]);*/

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const videoResponse = await axios.get(`/api/getVideo/${id}`);
                const videosResponse = await axios.get(`/api/getVideosBySubCourse/${subCourseId}`);

                if (isMounted) {
                    if (videoResponse.status === 200) setVideo(videoResponse.data);
                    if (videosResponse.status === 200) {
                        const videos = videosResponse.data;
                        setVideos(videos);

                        // Fetch progress for all videos in parallel
                        const progressPromises = videos.map(video =>
                            axios.get(`/api/videoProgress/${video._id}`)
                                .then(res => ({ id: video._id, completed: res.data.completed }))
                                .catch(() => ({ id: video._id, completed: false }))
                        );

                        const progressResults = await Promise.all(progressPromises);
                        const progressMap = progressResults.reduce((acc, curr) => {
                            acc[curr.id] = curr.completed;
                            return acc;
                        }, {});

                        setVideoProgress(progressMap);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
        return () => { isMounted = false; };
    }, [id, subCourseId]);


    // Add cleanup effect
    useEffect(() => {
        return () => {
            if (videoRef.current) {
                const ct = videoRef.current.currentTime;
                sendProgressUpdate(ct);
            }
        };
    }, [progressId, videoDuration]);
    const openCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error("Error accessing the camera:", error);
            Swal.fire("Error", "Unable to access the camera. Please check your permissions.", "error");
        }
    };

    const closeCamera = (mediaStream) => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
        }
    };

    const handleStartQuiz = async () => {
        Swal.fire({
            title: "Open Camera?",
            text: "Please enable your camera before taking the quiz.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Accept",
            cancelButtonText: "No, Cancel",
            reverseButtons: true,
            html: `
                <video id="cameraPreview" width="100%" height="auto" autoplay playsinline></video>
            `,
            didOpen: async () => {
                const videoElement = document.getElementById("cameraPreview");
                try {
                    const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    videoElement.srcObject = mediaStream;
                } catch (error) {
                    console.error("Error accessing the camera:", error);
                    Swal.showValidationMessage("Camera access denied. Please allow camera permissions.");
                }
            },
            willClose: () => {
                const videoElement = document.getElementById("cameraPreview");
                if (videoElement && videoElement.srcObject) {
                    videoElement.srcObject.getTracks().forEach(track => track.stop());
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/quiz');
            }
        });
    };

    if (!video) {
        return <div>Loading...</div>;
    }

    // Handle manual completion
    const handleMarkAsDone = async () => {
        const result = await Swal.fire({
            title: 'Mark as completed?',
            text: 'This will record your video completion',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, mark as done!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.put(
                    `/api/UpdateVideoProgress/${progressId}`,
                    {
                        user: STATIC_USER_ID,
                        video: id,
                        currentTime: videoDuration,
                        duration: videoDuration
                    }
                );

                if (response.status === 200) {
                    Swal.fire('Success!', 'Video marked as completed', 'success');
                    setIsMarkedDone(true);
                    setVideoProgress(prev => ({ ...prev, [id]: true }));
                    setCurrentTime(videoDuration);
                }
            } catch (error) {
                Swal.fire('Error', 'Failed to save progress', 'error');
                console.error("Update error:", error);
            }
        }
    };
    return (
        <div>
            <Header />

            <div style={{ display: 'flex', marginTop: '20px', padding: '0 20px' }}>
                <div style={{ flex: 3, marginRight: '20px' }}>
                    <div style={{ backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                        <video
                            key={video?.url}
                            ref={videoRef}
                            onLoadedMetadata={(e) => {
                                setVideoDuration(e.target.duration);
                                if (!initialPositionSet.current) {
                                    e.target.currentTime = initialProgress;
                                    // Watch 30 seconds → refresh → should resume at 30s
                                    // Add debug logs in onLoadedMetadata:
                                    console.log('Setting initial time to:', initialProgress);
                                    initialPositionSet.current = true;
                                }
                            }}
                            onTimeUpdate={handleTimeUpdate}
                            controls
                            autoPlay
                            style={{ width: '100%', height: '600px', objectFit: 'contain' }}
                        >
                            <source src={video?.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <div className="single-upcoming-events" key={video._id} style={{ margin: '40px 40px 60px 40px' }}>
                            <div className="information">
                                <a>
                                    <h5 className="title">{video.title}</h5>
                                </a>
                            </div>
                            {user.role === 'user' ? (
  <button className="rts-btn btn-primary with-arrow" onClick={handleStartQuiz}>
    Start quiz
  </button>
) : (
  <button className="rts-btn btn-primary with-arrow" onClick={handleNavigateToQuiz}>
    Create quiz
  </button>
)}

                        </div>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <div className="single-upcoming-events" key={video._id} style={{ margin: '40px 40px 60px 40px' }}>
                            <div className="information">
                                <a>

                                    <h5 className="title">
                                        {isMarkedDone ? '✓ Completed: ' : ''}
                                        Progress: {Math.round((currentTime / videoDuration) * 100 || 0)}%
                                    </h5>
                                </a>
                            </div>
                            <button
                                className="rts-btn btn-primary with-arrow"
                                onClick={handleMarkAsDone}
                                disabled={isMarkedDone}
                            >
                                {isMarkedDone ? 'Completed ✓' : 'Mark as Done'}
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ flex: 1, maxWidth: '400px' }}>
                    <h3 style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ddd' }}>
                        Up Next ({ListVideo.length})
                    </h3>

                    <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        {ListVideo.map((listVideo) => (
                            <Link
                                key={listVideo._id}
                                to={`/VideoDetail/${listVideo._id}/${subCourseId}`}
                                style={{
                                    display: 'flex',
                                    marginBottom: '12px',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    backgroundColor: listVideo._id === id ? '#f0f0f0' : 'transparent',
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    {/* Thumbnail */}
                                    <div style={{ width: '160px', marginRight: '12px' }}>
                                        <img
                                            src={listVideo.thumbnail}
                                            alt={listVideo.title}
                                            style={{ width: '100%', height: '90px', objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                    </div>

                                    {/* Title and Description */}
                                    <div style={{ flex: 1 }}>
                                        <h4 style={{ fontSize: '14px', margin: 0, WebkitLineClamp: 2, overflow: 'hidden' }}>
                                            {listVideo.title}
                                        </h4>
                                        <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', WebkitLineClamp: 2, overflow: 'hidden' }}>
                                            {listVideo.description}
                                        </p>
                                    </div>

                                    {/* Completion Status Indicator */}
                                    <div style={{ marginLeft: 'auto', paddingRight: '8px' }}>
                                        <div
                                            style={{
                                                width: '12px',
                                                height: '12px',
                                                borderRadius: '50%',
                                                backgroundColor: videoProgress[listVideo._id] ? '#4CAF50' : '#ff4444'
                                            }}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default VideoDetail;