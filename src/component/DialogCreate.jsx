import React, { useState, useRef } from "react";
import CanvasDraw from "react-canvas-draw";
import html2canvas from "html2canvas";
import "./DialogCreate.css";

const DialogCreate = ({ onClose }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [drawnImage, setDrawnImage] = useState(null);
  const [isDrawingEnabled, setIsDrawingEnabled] = useState(false);
  const [brush, setBrush] = useState(10);
  const canvasRef = useRef(null);

  // upload image
  const handleUploadImage = (event) => {
    const image = event.target.files[0];
    setUploadedImage(image);
    setIsDrawingEnabled(false);
  };

  const handleSave = () => {
    if (canvasRef.current) {
      html2canvas(document.querySelector(".image-editor-container")).then(
        (canvas) => {
          const fullImageDataURL = canvas.toDataURL();
          setDrawnImage(fullImageDataURL);
        }
      );
    }
  };

  const handleReset = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
      setDrawnImage(null);
    }
  };

  const handlePenClick = () => {
    setIsDrawingEnabled(!isDrawingEnabled);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <div className="dialog-header">
          <h2> Create </h2>
          <button className="dialog-close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="content-dialog">
          <div className="input-choose-file">
            <input type="file" onChange={handleUploadImage} accept="image/*" />
          </div>
          {uploadedImage && (
            <div>
              <div className="control-button">
                <div>
                  <button onClick={handlePenClick}>
                    <div className="icon-pen">&#9999;</div>
                  </button>
                </div>
                <div>
                  <button className="button" onClick={handleSave}>
                    Preview
                  </button>
                </div>
                <div>
                  <button className="button" onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </div>
              <div className="image-editor-container">
                <CanvasDraw
                  ref={canvasRef}
                  imgSrc={URL.createObjectURL(uploadedImage)}
                  brushColor="#ff0000"
                  brushRadius={parseInt(brush)}
                  canvasWidth={500}
                  canvasHeight={400}
                  disabled={!isDrawingEnabled}
                  hideInterface
                  className="canvas-draw"
                />
              </div>
              <div className="input-brush">
                <input
                  min="2"
                  max="50"
                  type="range"
                  onChange={(event) => {
                    setBrush(event.target.value);
                  }}
                />
              </div>

              {drawnImage && (
                <div className="show-image">
                  <div className="preview-container">
                    <h3>Hình đã vẽ:</h3>
                    <img
                      src={drawnImage}
                      alt="Hình đã vẽ"
                      width={200}
                      height={150}
                    />
                  </div>
                  <div className="preview-container">
                    <h3>Hình gốc</h3>
                    <img
                      src={URL.createObjectURL(uploadedImage)}
                      alt="Hình đã vẽ"
                      width={200}
                      height={150}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DialogCreate;
