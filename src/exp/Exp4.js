import React, { useState, useContext, useMemo } from "react";
import useInterval from "../hooks/useInterval";
import { PatternCircles } from "@vx/pattern";
import { isSafari } from "../utils/browsers";
import ThemeContext from "../context/ThemeContext";


const Element = ({ x, y, fraction, wh = 200 }) => {
  const r = wh / 2;
  return (
    <g
      style={{
        transform: `translate3d(${x}px, ${y}px, 0px) rotate(${
          -fraction * 360
          }deg)`,
      }}
    >
      <rect
        y={r}
        width="90px"
        height="125%"
        fill="url(#Circles)"
        shapeRendering="geometricPrecision"
      />
    </g>
  );
};

const genPoints = (steps, radius) => {
  const step = (Math.PI * 2) / steps;
  return new Array(steps).fill(0).map((x, i) => {
    return {
      i,
      x: -Math.cos(i * step) * radius,
      y: +Math.sin(i * step) * radius,
      fr: (1 / steps) * i,
      angle: (1 / steps) * i * 360,
    };
  });
};

export default function () {
  const [fraction, setFraction] = useState(0);
  const { dark } = useContext(ThemeContext);

  const colors = {
    main: dark ? "#162039" : "#4050A8",
    pattern: "white",
  };

  useInterval(() => {
    if (fraction >= 0.99) {
      setFraction(0);
      return;
    }
    setFraction(fraction + 0.006);
  }, 60);

  const n = 10;
  const r = 180;
  const points = useMemo(() => genPoints(n, r), []);

  return (
    <>
      <div
        className="vignette"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: "100%",
          height: "100%",
          zIndex: 3,
          boxShadow: `0 0 200px ${colors.main} inset`,
          opacity: 0.9,
          pointerEvents: "none",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexFlow: "column",
          zIndex: 2,
          width: "100%",
          height: "100vh",
          background: colors.main,
        }}
      >
        {isSafari && (
          <p
            style={{
              position: "fixed",
              top: "50%",
              width: "100px",
              height: "100px",
              zIndex: "2",
              textAlign: "center",
              color: "white",
            }}
          >
            Disabled on your browser
          </p>
        )}

        <svg
          style={{
            overflow: "visible",
            transform: "perspective(400px) rotateY(5deg)",
          }}
          width={`100%`}
          height={`100vh`}
        >
          {!isSafari && (
            <>
              <PatternCircles
                id="Circles"
                height={10}
                width={10}
                fill={colors.pattern}
              />
              <PatternCircles
                id="CirclesSmall"
                height={7}
                width={7}
                fill={colors.pattern}
              />
            </>
          )}
          <g
            style={{
              transform: `translate3d(50%, 50%, 0) rotate(${
                fraction * 180
                }deg)`,
            }}
          >
            {points.map((x, i) => {
              return (
                <g key={`group${i}`}>
                  <Element x={x.x} y={x.y} fraction={x.fr + fraction} />
                </g>
              );
            })}
          </g>

          <rect
            x={-100}
            y={-100}
            style={{ opacity: 0.04 }}
            width="250%"
            height="255%"
            fill="url(#CirclesSmall)"
          />
        </svg>
      </div>
    </>
  );
}

