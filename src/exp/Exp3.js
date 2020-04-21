import React, { useState, useEffect, useRef } from "react";
import { useMeasure } from "react-use";

export default () => {
  const [ref, { width, height }] = useMeasure();

  const canvas = useRef(null);
  const requestRef = useRef();

  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(requestRef.current);
  }, [width, height]);

  let radius = 110;
  let x = 110;
  let y = 110;
  let dx = 2;
  let dy = 2;
  let colorIndex = 0;
  let squareSize = radius * 2;
  let bounces = 0;
  let hitDate = new Date();
  let hitCorner = 0;

  const colors = [
    "#F01836", //R
    "#64EF2C", //G
    "#4A74F5" //B
  ];

  // Path2d text
  const paths = {
    dvd:
      "M59.1 41.3H37.5L28 94h22.5c17.5 0 30-9.5 32.9-25.7 3-16.7-6.6-27-24.3-27zm8.8 25.6c-2 11.3-8 14.9-16.5 14.9h-5.7l5.2-28.4h5.8c9 0 13.1 2.8 11.2 13.5zm94.3-25.6h-36.8l-18.5 37.2h-.4l-5.1-37.2H83.7L93.2 94h21.3l24.9-46.1-8.3 46.1h22.5c17.5 0 30-9.5 32.9-25.7 3-16.7-6.6-27-24.3-27zm8.9 25.6c-2 11.3-8 14.9-16.5 14.9h-5.7l5.2-28.4h5.8c8.9 0 13.1 2.8 11.2 13.5z",
    video:
      "M43.1 131h.2l6.5-22.3h9.7l-10.4 31.6H37.4L27 108.7h9.7l6.4 22.3zm33.2 9.3h-8.6v-31.6h8.6v31.6zm9.3 0v-31.6h12c9.7 0 15.8 5.9 15.8 15.8s-6.1 15.8-15.7 15.8H85.6zm11.8-7.3c4.7 0 7.4-1.9 7.4-8.5s-2.7-8.5-7.6-8.5h-3v17h3.2zm25.2-24.3h22.8v6.9h-14.2v5.4h13v6.9h-13v5.4h14.1v6.9h-22.7v-31.5zm47.4 32c-8.6 0-15.4-5.7-15.4-16.2s6.7-16.2 15.4-16.2c8.6 0 15.4 5.7 15.4 16.2s-6.8 16.2-15.4 16.2zm0-24.9c-4.3 0-6.5 3.1-6.5 8.8 0 5.7 2.3 8.8 6.5 8.8 4.3 0 6.5-3.1 6.5-8.8.1-5.7-2.2-8.8-6.5-8.8z"
  };

  let matrix = document
    .createElementNS("http://www.w3.org/2000/svg", "svg")
    .createSVGMatrix();
  let dvd = new Path2D(paths.dvd);
  let video = new Path2D(paths.video);

  // DRAW
  const draw = () => {
    let ctx = canvas.current.getContext("2d");

    // Scale
    const ratio = window.devicePixelRatio || 1;

    canvas.current.width = width * ratio;
    canvas.current.height = height * ratio;

    canvas.current.style.width = `${width}px`;
    canvas.current.style.height = `${height}px`;

    ctx.scale(ratio, ratio);


    ctx.globalAlpha = 0.9;

    ctx.clearRect(0, 0, width, height); // clear canvas

    // Square
    ctx.beginPath();
    ctx.shadowBlur = 10;
    ctx.shadowColor = colors[colorIndex];
    ctx.rect(x - squareSize / 2, y - squareSize / 2, squareSize, squareSize);
    ctx.fillStyle = colors[colorIndex];
    ctx.fill();
    ctx.shadowBlur = 0;

    // Path 2d
    const p = new Path2D();
    const t = matrix.translate(x - squareSize / 2, y - squareSize / 2);
    p.addPath(dvd, t);
    ctx.fillStyle = "RGBA(26, 28, 30, 0.9)";
    ctx.fill(p);

    const p2 = new Path2D();
    const t2 = matrix.translate(x - squareSize / 2, y - squareSize / 2);
    p2.addPath(video, t2);
    ctx.fillStyle = "white";
    ctx.fill(p2);

    // Bounces
    ctx.font = "bold 25px Inter";
    ctx.textAlign = "center";
    ctx.fillStyle = "RGBA(26, 28, 30, 1.00)";
    ctx.fillText(
      `${bounces ? `${bounces} ${hitCorner ? `- ${hitCorner}` : ""}` : ""}`,
      x,
      y + 70
    );

    const flashScreen = () => {
      ctx.rect(0, 0, width, height);
      ctx.fillStyle = colors[colorIndex];
      ctx.fill();
    }

    const updateState = () => {
      colorIndex = colorIndex + 1 >= 3 ? 0 : colorIndex + 1;
      bounces += 1;
      let dif = new Date().getTime() - hitDate.getTime();

      if (dif < 150) {
        hitCorner += 1;
        flashScreen();
      }

      hitDate = new Date();
    };

    // x
    if (x + radius > width || x - radius < 0) {
      dx = -dx;
      updateState();
    }

    // y
    if (y + radius > height || y - radius < 0) {
      dy = -dy;
      updateState();
    }

    x += dx;
    y += dy;

    requestRef.current = requestAnimationFrame(draw);
  };
  return (
    <div
      ref={ref}
      style={{ width: "100%", height: "100vh" }}
      onClick={() => setIsPlaying(!isPlaying)}
    >
      <canvas ref={canvas} width={width * window.devicePixelRatio || 1} height={height * window.devicePixelRatio || 1} />
    </div>
  );
};
