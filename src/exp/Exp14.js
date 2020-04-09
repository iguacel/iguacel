import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { getPixelRatio } from "../utils/canvas";

export default () => {
  let ref = useRef();

  useEffect(() => {
    let canvas = ref.current;
    let ctx = canvas.getContext('2d');

    let ratio = getPixelRatio(ctx);
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

    let requestId;
    let i = 0;

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

      ctx.font = "30px Inter";
      ctx.fillStyle = 'white';
      ctx.fillText("Canvas txt", width / 2, height / 2);
      ctx.fillText("pixelRatio", width / 2, height / 2 + 40);
      ctx.fillText("pixelRatio", width / 2, height / 2 + 80);

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
      <canvas
        ref={ref}
        style={{ border: "1px solid gold", width: '100%', height: '100vh' }}
        foo="bar"
      />
    </div>
  );
};
