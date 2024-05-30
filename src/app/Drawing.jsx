import React, { useState } from 'react';

const Example = () => {
  return (
    <MouseMoveLineDrawing>
      <div
        className="grid  lg:h-[500px] rounded-xl justify-center items-end  bg-neutral-200 pointer-events-none"
        style={{ userSelect: 'none' }}>
        <span
          className="text-5xl font-black text-yellow-500 pointer-events-none "
          style={{ userSelect: 'none' }}>
          Draw one-line mothamoto
        </span>
      </div>
    </MouseMoveLineDrawing>
  );
};

const MAX_POINTS = 4000;

const MouseMoveLineDrawing = ({ children }) => {
  const [points, setPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false); // State to track drawing status

  const handleMouseMove = (e) => {
    if (!isDrawing) return; // Only draw if isDrawing is true
    setPoints((pv) => {
      const x = e.clientX;
      const y = e.clientY;
      const pointBuffer = [...pv, `${x} ${y}`];
      if (pointBuffer.length > MAX_POINTS) {
        pointBuffer.shift();
      }
      return pointBuffer;
    });
  };

  const handleMouseDown = () => {
    setIsDrawing(true); // Start drawing
  };

  const handleMouseUp = () => {
    setIsDrawing(false); // Stop drawing
  };

  return (
    <>
      <button className="text-white text-2xl" onClick={() => setPoints([])}>
        Draw Again
      </button>
      <div
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp} // Optional: stop drawing when cursor leaves the element
        className="h-full w-full">
        {children}
        <svg
          className="pointer-events-none fixed left-0 top-0 h-full w-full"
          viewBox="0 0 window.innerWidth window.innerHeight">
          <polyline
            className="stroke-neutral-900"
            fill="none"
            strokeWidth="4"
            strokeDasharray="0"
            strokeLinecap="round"
            points={`${points.join(', ')}`}></polyline>
        </svg>
      </div>
    </>
  );
};

export default Example;
