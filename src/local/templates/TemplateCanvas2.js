import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { getPixelRatio } from "../utils/canvas";

const Circle = () => {
  let ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let context = canvas.getContext('2d');

    let ratio = getPixelRatio(context);
    let width = getComputedStyle(canvas)
      .getPropertyValue('width')
      .slice(0, -2);
    let height = getComputedStyle(canvas)
      .getPropertyValue('height')
      .slice(0, -2);

    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    let requestId,
      i = 0;
    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        (canvas.width / 2) * Math.abs(Math.cos(i)),
        0,
        2 * Math.PI
      );
      context.fill();
      i += 0.05;
      requestId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <canvas
        ref={ref}
        style={{ width: '100px', height: '100px' }}
        foo="bar"
      />
    </div>
  );
};

export default Circle;
