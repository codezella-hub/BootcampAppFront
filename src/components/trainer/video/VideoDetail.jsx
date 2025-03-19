import React, { useEffect, useState, useRef } from 'react';
import Header from '../../student/Header';
import Footer from '../../student/Footer';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function VideoDetail() {
    const [video, setVideo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    let mediaStream = null; // Store the camera stream

    useEffect(() => {
        axios.get(`/api/getVideo/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setVideo(res.data);
                }
            })
            .catch(error => {
                console.error("Error fetching video:", error);
            });
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
            <div className="rts-bread-crumbarea-1 rts-section-gap bg_image">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-main-wrapper">
                                <h1 className="title">{video.title}</h1>
                                <div className="pagination-wrapper">
                                    <a href="/">Home</a>
                                    <i className="fa-regular fa-chevron-right" />
                                    <a className="active" href={`/video/${id}`}>Video Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rts-events-area rts-section-gap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="thumbnail-large-image">
                                <video width="100%" height="auto" controls>
                                    <source src={video.url} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="single-upcoming-events" key={video._id} style={{ margin: '40px 40px 60px 40px' }}>
                    <div className="information">
                        <a>
                            <h5 className="title">Get a certification</h5>
                        </a>
                    </div>
                    <button className="rts-btn btn-primary with-arrow" onClick={handleStartQuiz}>Start quiz</button>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default VideoDetail;