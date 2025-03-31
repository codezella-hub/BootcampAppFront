import React, { useEffect, useState, useRef } from 'react';
import Header from '../../student/Header';
import Footer from '../../student/Footer';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function VideoDetail() {
    const [video, setVideo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const [ListVideo, setVideos] = useState([]);
    let mediaStream = null;

    useEffect(() => {
        axios.get(`/api/getVideo/${id}`)
            .then(res => {
                if (res.status === 200) setVideo(res.data);
            })
            .catch(console.error);

        axios.get(`/api/getAllVideos`)
            .then(res => {
                if (res.status === 200) setVideos(res.data);
            })
            .catch(console.error);
    }, [id]);

    const openCamera = async () => {
        try {
            mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error("Error accessing the camera:", error);
            Swal.fire("Error", "Unable to access the camera. Please check your permissions.", "error");
        }
    };

    const closeCamera = () => {
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
                    mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                    videoElement.srcObject = mediaStream;
                } catch (error) {
                    console.error("Error accessing the camera:", error);
                    Swal.showValidationMessage("Camera access denied. Please allow camera permissions.");
                }
            },
            willClose: () => {
                closeCamera();
            }
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/quiz');
            } else {
                closeCamera();
            }
        });
    };

    if (!video) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            
            <div style={{ display: 'flex', marginTop: '20px', padding: '0 20px' }}>
                {/* Main Video Content */}
                <div style={{ flex: 3, marginRight: '20px' }}>
                    <div style={{ backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden' }}>
                        <video 
                            ref={videoRef}
                            controls 
                            autoPlay 
                            style={{ width: '100%', height: '600px', objectFit: 'contain' }}
                        >
                            <source src={video.url} type="video/mp4" />
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
                    <button className="rts-btn btn-primary with-arrow" onClick={handleStartQuiz}>Start quiz</button>
                </div>
                    </div>
                </div>

                {/* Video Playlist Sidebar */}
                <div style={{ flex: 1, maxWidth: '400px' }}>
                    <h3 style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ddd' }}>
                        Up Next ({ListVideo.length})
                    </h3>
                    
                    <div style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                        {ListVideo.map((listVideo, index) => (
                            <Link 
                                key={listVideo._id} 
                                to={`/video/${listVideo._id}`}
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
                                <div style={{ width: '160px', marginRight: '12px' }}>
                                    <img 
                                        src={listVideo.thumbnail} 
                                        alt={listVideo.title}
                                        style={{ 
                                            width: '100%', 
                                            height: '90px',
                                            objectFit: 'cover',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                                <div>
                                    <h4 style={{ 
                                        fontSize: '14px', 
                                        margin: 0,
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {listVideo.title}
                                    </h4>
                                    <p style={{ 
                                        fontSize: '12px', 
                                        color: '#666', 
                                        marginTop: '4px',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden'
                                    }}>
                                        {listVideo.description}
                                    </p>
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