'use client';

import { useRef, useState } from 'react';

export default function ScreenshotBeautifier() {
  const [scale, setScale] = useState(0.74);
  const [imageSrc, setImageSrc] = useState(null);
  const [file, setFile] = useState(null);
  const [canvasSize, setCanvasSize] = useState(400);

  const canvasRef = useRef(null);
  const isResizingRef = useRef(false);

  const handleScaleChange = (e) => {
    setScale(parseFloat(e.target.value));
  };

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setFile(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleMouseDown = (e) => {
    isResizingRef.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const initialSize = canvasSize;

    const handleMouseMove = (e) => {
      e.preventDefault();
      if (!isResizingRef.current) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const newSize = initialSize + deltaX + deltaY;

      if (newSize >= 100) {
        setCanvasSize(newSize);
      }
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <h1>Screenshot Beautifier</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />
      <button
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        Upload Image
      </button>
      <div>
        <label htmlFor="scale">Image Scale:</label>
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.001"
          value={scale}
          onChange={handleScaleChange}
        />
        {scale.toFixed(2)}
      </div>
      <div className="relative mt-2 lg:mb-5 lg:mx-0 overflow-hidden w-[50rem] flex items-start justify-center max-h-[90vh] h-full">
        {/* Resizable Canvas Container */}
        <div
          ref={canvasRef}
          className="canvas relative overflow-hidden bg-gradient-to-br from-[#fff2a4] via-[#d3acee] to-[#82f5ff]"
          style={{
            borderRadius: '12px',
            aspectRatio: 'auto',
            transform: 'scale(1)',
            width: '100%',
            height: `${canvasSize}px`, // Controlled by state
          }}
        >
          {/* Draggable Element */}
          <div
            onMouseDown={handleMouseDown}
            className={`w-[8px] absolute cursor-move rounded h-[8px] ring-2 bg-white/70 ring-black/50 hover:ring-pink-500 shadow-[0_0_4px_rgba(0,0,0.4)] right-[8px] bottom-[8px] z-30 ${
              isResizingRef.current ? '' : ''
            }`}
          >
            <div className="focus:outline-none absolute w-full h-full inset-0"></div>
          </div>
          {/* Image Scale and position Container */}
          <div
            className="duration-100 flex items-center justify-center"
            style={{
              transform: `scale(${scale}) translate(0%, 0%)`,
              transformOrigin: 'center',
              borderRadius: '11px',
              overflow: 'hidden',
            }}
          >
            {/* Image 3d Container */}
            <div
              className="flex flex-col opacity-100"
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.5) 0px 10px 65px 0px',
                borderRadius: '16px',
                transform:
                  'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
              }}
            >
              {/* Image Border Container */}
              <div
                className="p-[7px] bg-gradient-to-br from-white/50 to-gray-100/40 border border-white/30 backdrop-blur"
                style={{
                  borderRadius: '16px',
                  boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 12px',
                }}
              >
                {imageSrc && (
                  <img
                    alt="Input image"
                    className="pointer-events-none"
                    src={imageSrc}
                    style={{
                      width: 'fit-content',
                      borderRadius: '11px',
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
