import React, { useRef, useEffect } from "react";

export default ({ width, height, draw }) => {
  let canvasRef = useRef();

  const scale = (canvas, ctx) => {
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(ratio, ratio);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    scale(canvas, ctx);
    draw(canvas, ctx);
  })

  return (
    <canvas style={{ border: "1px solid white" }}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
}