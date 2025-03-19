import React, { useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

function Quiz() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Request access to the camera when the component mounts
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera:", err);
        Swal.fire("Error", "Unable to access the camera. Please check your permissions.", "error");
      });

    return () => {
      // Stop the camera when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    const checkCamera = setInterval(() => {
      if (videoRef.current && (!videoRef.current.srcObject || videoRef.current.srcObject.getTracks().length === 0)) {
        Swal.fire("Warning", "You should open the camera to pass the quiz.", "warning");
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(checkCamera);
  }, []);

  return (
    <div>
      <h1>Quiz</h1>
      <div style={{ position: 'fixed', top: 10, right: 10, width: 150, height: 100 }}>
        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  );
}

export default Quiz;