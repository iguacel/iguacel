import React, { useContext, useState, useEffect, useRef } from "react";
import ThemeContext from "../context/ThemeContext";
import { useSpring } from "react-spring";
import { easeCubic } from "d3-ease";

import all from "../data/hc_all.js";

// SETTINGS
// canvas settings
const width = 820;
const height = 820;

// point settings
const numPoints = 700;
const pointWidth = 4;
const pointMargin = 3;

// POINTS

// LAYOUTS
const phyllotaxisLayout = (
  points,
  pointWidth,
  xOffset = width / 2 + 20,
  yOffset = height / 2 + 20,
  iOffset = 0
) => {
  // theta determines the spiral of the layout
  const theta = Math.PI * (3 - Math.sqrt(5));

  const pointRadius = pointWidth * 1.8;

  return points.forEach((point, i) => {
    const index = (i + iOffset) % points.length;
    const phylloX = pointRadius * Math.sqrt(index) * Math.cos(index * theta);
    const phylloY = pointRadius * Math.sqrt(index) * Math.sin(index * theta);

    point.x = xOffset + phylloX - pointRadius;
    point.y = yOffset + phylloY - pointRadius;
  });
};

// Wrap layout helpers so they only take points as an argument

const toCrass = (points) =>
  points.forEach((point, i) => {
    point.x = all.crass.points[i][0];
    point.y = all.crass.points[i][1];
  });

const toDk = (points) =>
  points.forEach((point, i) => {
    point.x = all.dk.points[i][0];
    point.y = all.dk.points[i][1];
  });

const toHuskerDu = (points) =>
  points.forEach((point, i) => {
    point.x = all.huskerdu.points[i][0];
    point.y = all.huskerdu.points[i][1];
  });

const toBadReligion = (points) =>
  points.forEach((point, i) => {
    point.x = all.badreligion.points[i][0];
    point.y = all.badreligion.points[i][1];
  });

const toConflict = (points) =>
  points.forEach((point, i) => {
    point.x = all.conflict.points[i][0];
    point.y = all.conflict.points[i][1];
  });

const toDri = (points) =>
  points.forEach((point, i) => {
    point.x = all.dri.points[i][0];
    point.y = all.dri.points[i][1];
  });

const toPhyllotaxis = (points) =>
  phyllotaxisLayout(points, pointWidth + pointMargin);

// store the layouts in an array to sequence through
const layouts = [
  toCrass,
  toPhyllotaxis,
  toDk,
  toPhyllotaxis,
  toHuskerDu,
  toPhyllotaxis,
  toBadReligion,
  toPhyllotaxis,
  toConflict,
  toPhyllotaxis,
  toDri,
  toPhyllotaxis,
];

const layoutsText = [
  "Crass",
  "1978",
  "Dead Kennedys",
  "1979",
  "Hüsker Dü",
  "1980",
  "Bad Religion",
  "1981",
  "Conflict",
  "1982",
  "D.R.I.",
  "1977",
];

// create initial layout
const initialLayout = (points) => {
  points.forEach((point, i) => {
    point.x = all.crass.points[i][0];
    point.y = all.crass.points[i][1];
  });

  return points;
};

const createPoints = (numPoints) => {
  const points = new Array(numPoints).fill().map((_, id) => ({
    id,
  }));

  return initialLayout(points);
};

export default () => {
  const [int, setInt] = useState(0);

  // colors
  const { dark } = useContext(ThemeContext);

  const colors = {
    main: dark ? "#85D079" : "#161819",
    bg: dark ? "#161819" : "#85D079",
  };

  // REFS
  let refCanvas = useRef();
  let prevInt = React.useRef(int);

  // Points
  let points = createPoints(numPoints, pointWidth, width, height);
  let prevPoints = React.useRef(points);

  useSpring({
    from: { animationProgress: 0 },
    to: { animationProgress: 1 },
    reset: int !== prevInt.current,
    onRest: () => {
      setInt((int + 1) % layouts.length);
      prevInt.current = int;
    },
    onStart: () => {
      // store the source position
      prevPoints.current.forEach((point) => {
        point.sx = point.x;
        point.sy = point.y;
      });

      // get destination x and y position on each point
      layouts[int](prevPoints.current);

      // store the destination position
      prevPoints.current.forEach((point) => {
        point.tx = point.x;
        point.ty = point.y;
      });
    },

    onFrame: ({ animationProgress }) => {
      prevPoints.current.forEach((point) => {
        point.x =
          point.sx * (1 - animationProgress) + point.tx * animationProgress;
        point.y =
          point.sy * (1 - animationProgress) + point.ty * animationProgress;
      });
    },
    config: { easing: easeCubic },
  });

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

    let requestId;

    // Animation
    const animation = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = colors.main;

      prevPoints.current.forEach((x) => {
        ctx.beginPath();
        ctx.arc(x.x, x.y, pointWidth, 0, 2 * Math.PI);
        ctx.fill();
      });

      requestId = requestAnimationFrame(animation);
    };

    animation();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, [prevPoints.current, dark, colors, int]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: colors.bg,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <p
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            background: colors.bg,
            color: "var(--foreground-color)",
            fontWeight: 700,
          }}
        >
          {layoutsText[int]}
        </p>
      </div>
      <canvas width={width} height={height} ref={refCanvas} />
    </div>
  );
};
