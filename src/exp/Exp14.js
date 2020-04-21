import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';

export default () => {
  const width = 200;
  const height = 200;

  let refCanvas = useRef();

  const scale = (canvas, ctx) => {
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(ratio, ratio);
  };

  useEffect(() => {
    let canvas = refCanvas.current;
    let ctx = canvas.getContext('2d');

    let requestId;
    let i = 0;

    scale(canvas, ctx);

    const animation = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        (canvas.width / 2) * Math.abs(Math.cos(i)),
        0,
        2 * Math.PI
      );

      ctx.fillStyle = 'red';
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = '50px Inter';
      ctx.textAlign = "center";
      ctx.fillText('Inter', width / 2, height / 2);

      i += 0.01;
      requestId = requestAnimationFrame(animation);
    };

    animation();

    return () => {
      cancelAnimationFrame(requestId);
    };
  });

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <canvas width={width} height={height}
        ref={refCanvas}
        style={{ border: "1px solid gold" }}
      />
    </div>
  );
};
