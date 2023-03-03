import React, { useState, useRef } from "react";
import QrScanner from "qr-scanner";
import './qrcodescanner.css';
function QrCodeScanner() {
  const [result, setResult] = useState("");
  const videoRef = useRef(null);
  const qrScannerRef = useRef(null);

  const handleScan = (result) => {
    setResult(result);
  };

  const handleError = (error) => {
    console.error(error);
  };

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = videoRef.current;
      video.srcObject = stream;
      const qrScanner = new QrScanner(video, handleScan, handleError);
      qrScannerRef.current = qrScanner;
      await qrScanner.start();
    } catch (error) {
      console.error(error);
    }
  };

  const stopScanner = () => {
    const qrScanner = qrScannerRef.current;
    if (qrScanner) {
      qrScanner.stop();
    }
  };

  return (
    <div className="scanner-container">
      <div className="video-container">
        <video ref={videoRef} className="video" />
      </div>
      <div className="result-container">
        <p className="result-text">Result: {result}</p>
      </div>
      <div className="button-container">
        <button onClick={startScanner} className="button">
          Start scanner
        </button>
        <button onClick={stopScanner} className="button">
          Stop scanner
        </button>
      </div>
    </div>
  );
  
}

export default QrCodeScanner;
