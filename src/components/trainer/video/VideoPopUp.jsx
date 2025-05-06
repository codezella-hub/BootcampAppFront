import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function VideoPopUp() {
    const [video, setVideo] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef(null);
    let mediaStream = null;

    useEffect(() => {
        axios.get(`/api/getVideo/${id}`)
            .then(res => {
                if (res.status === 200) {
                    setVideo(res.data);
                }
            })
            .catch(console.error);
    }, [id]);

    const handleFullscreen = () => {
        if (videoRef.current) {
            if (videoRef.current.requestFullscreen) {
                videoRef.current.requestFullscreen();
            } else if (videoRef.current.mozRequestFullScreen) { /* Firefox */
                videoRef.current.mozRequestFullScreen();
            } else if (videoRef.current.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
                videoRef.current.webkitRequestFullscreen();
            } else if (videoRef.current.msRequestFullscreen) { /* IE/Edge */
                videoRef.current.msRequestFullscreen();
            }
        }
    };

    if (!video) {
        return <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontSize: '1.5rem'
        }}>Loading...</div>;
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            zIndex: 1000
        }}>
            <video 
                ref={videoRef}
                controls 
                autoPlay 
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                }}
            >
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <button 
                onClick={handleFullscreen}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    padding: '10px',
                    background: 'rgba(0,0,0,0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}
            >
                ⤢ Fullscreen
            </button>
        </div>
    );
}

export default VideoPopUp;