// HiddenEyeTracker.jsx
import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import { Camera } from '@mediapipe/camera_utils';

const HiddenEyeTracker = ({ onDataUpdate }) => {
  const webcamRef = useRef(null);
  const totalFrames = useRef(0);
  const focusedFrames = useRef(0);

  const isLookingCenter = (landmarks) => {
    const leftIris = landmarks[468];
    const rightIris = landmarks[473];
    const leftEyeOuter = landmarks[33];
    const leftEyeInner = landmarks[133];
    const rightEyeInner = landmarks[362];
    const rightEyeOuter = landmarks[263];

    const leftEyeWidth = leftEyeInner.x - leftEyeOuter.x;
    const rightEyeWidth = rightEyeOuter.x - rightEyeInner.x;

    const leftIrisPos = (leftIris.x - leftEyeOuter.x) / leftEyeWidth;
    const rightIrisPos = (rightEyeOuter.x - rightIris.x) / rightEyeWidth;

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
      if (results.multiFaceLandmarks?.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];
        totalFrames.current += 1;
        if (isLookingCenter(landmarks)) focusedFrames.current += 1;

        const avg = (focusedFrames.current / totalFrames.current) * 100;
        onDataUpdate(avg.toFixed(2)); // update the parent
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
  }, []);

  return (
    <div style={{ display: 'none' }}>
      <Webcam ref={webcamRef} width={640} height={480} />
    </div>
  );
};

export default HiddenEyeTracker;
