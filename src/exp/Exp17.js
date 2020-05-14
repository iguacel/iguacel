import React, { useEffect, useMemo, useState, useContext, useRef } from "react";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";

import useInterval from "../hooks/useInterval";

import ThemeContext from "../context/ThemeContext";

export default () => {
  const [refDiv, { width, height }] = useMeasure({ polyfill: ResizeObserver });

  const [count, setCount] = useState(2);
  const countMin = 3;
  const countMax = 4;

  useInterval(() => {
    setCount((count) => (count > countMax ? countMin : count + 1));
  }, 900);

  let refCanvas = useRef();

  const size = width >= height ? width : height;
  const step = size / count;

  // Color
  const { dark } = useContext(ThemeContext);

  const colors = [
    "RGBA(212, 209, 212, 1.00)",
    dark ? "#4051A7" : "#D74C13",
    dark ? "white" : "black",
  ];

  const randomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const mainColor = dark ? "RGBA(22, 24, 25, 1.00)" : "white";
  const bgColor = dark ? "black" : "white";

  // Offscreen pattern
  const drawPattern = () => {
    const patternCanvas = document.createElement("canvas");
    const patternCtx = patternCanvas.getContext("2d");

    const patternSize = 5;
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;

    patternCtx.strokeStyle = "black";
    patternCtx.moveTo(0, 0);
    patternCtx.lineTo(patternSize, patternSize);
    patternCtx.moveTo(0, patternSize);
    patternCtx.lineTo(patternSize, 0);
    patternCtx.stroke();

    return patternCanvas;
  };

  const patternCanvas = useMemo(() => drawPattern(), []);

  // Grid
  const makeGrid = () => {
    let out = [];
    for (var x = 0; x < size; x += step) {
      for (var y = 0; y < size; y += step) {
        out.push({ x, y, step });
      }
    }
    return out;
  };

  const grid = makeGrid();

  useEffect(() => {
    let canvas = refCanvas.current;
    let ctx = canvas.getContext("2d");

    // Scale
    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(ratio, ratio);

    // End scale
    const drawLine = (x, y, step) => {
      ctx.fillStyle = randomColor();
      ctx.fillRect(x, y, step + 5, step + 5);

      const leftToRight = Math.random() >= 0.5;

      if (leftToRight) {
        ctx.moveTo(x, y);
        ctx.lineTo(x + step, y + step);
      } else {
        ctx.moveTo(x + step, y);
        ctx.lineTo(x, y + step);
      }

      ctx.stroke();
    };

    // Draw
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.lineCap = "square";
      ctx.lineWidth = step / 3;

      ctx.beginPath();
      ctx.strokeStyle = mainColor;

      grid.map((x) => {
        drawLine(x.x, x.y, x.step);
      });

      const pattern = ctx.createPattern(patternCanvas, "repeat");
      ctx.globalCompositeOperation = "overlay";
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    draw();
  });

  return (
    <div
      ref={refDiv}
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: bgColor,
      }}
    >
      <canvas width={width} height={height} ref={refCanvas} />
    </div>
  );
};
