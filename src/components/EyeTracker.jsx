import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

const EyeTracker = () => {
  const webcamRef = useRef(null);
  const [concentration, setConcentration] = useState(0);
  const [totalFrames, setTotalFrames] = useState(0);
  const [focusedFrames, setFocusedFrames] = useState(0);
  const [averageConcentration, setAverageConcentration] = useState(null);

  const isLookingCenter = (landmarks) => {
    const leftIris = landmarks[468]; // iris gauche
    const rightIris = landmarks[473]; // iris droite
    const leftEyeOuter = landmarks[33];
    const leftEyeInner = landmarks[133];
    const rightEyeInner = landmarks[362];
    const rightEyeOuter = landmarks[263];
  
    const leftEyeWidth = leftEyeInner.x - leftEyeOuter.x;
    const rightEyeWidth = rightEyeOuter.x - rightEyeInner.x;
  
    const leftIrisPos = (leftIris.x - leftEyeOuter.x) / leftEyeWidth;
    const rightIrisPos = (rightEyeOuter.x - rightIris.x) / rightEyeWidth;
  
    // Si les iris sont bien centrés (entre 0.4 et 0.6), on considère que c'est focus
    return leftIrisPos > 0.35 && leftIrisPos < 0.65 && rightIrisPos > 0.35 && rightIrisPos < 0.65;
  };
  

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        setTotalFrames((prev) => prev + 1);
        setFocusedFrames((prev) => prev + (isLookingCenter(landmarks) ? 1 : 0));

        const updatedConcentration = ((focusedFrames + 1) / (totalFrames + 1)) * 100;
        setConcentration(updatedConcentration.toFixed(2));
      }
    });

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current.video, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, [focusedFrames, totalFrames]);

  const handleShowAverage = () => {
    if (totalFrames > 0) {
      const average = (focusedFrames / totalFrames) * 100;
      setAverageConcentration(average.toFixed(2));
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Concentration des yeux</h2>
      <Webcam ref={webcamRef} width={640} height={480} style={{ borderRadius: 10 }} />
      <h3>Concentration actuelle : {concentration}%</h3>
      <button onClick={handleShowAverage}>Afficher la concentration moyenne</button>
      {averageConcentration !== null && (
        <h3>Concentration moyenne depuis le début : {averageConcentration}%</h3>
      )}
    </div>
  );
};

export default EyeTracker;
