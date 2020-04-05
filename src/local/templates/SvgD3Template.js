import React, {
  useState, useContext, useMemo
} from "react";
import { useMeasure } from "react-use";
import ThemeContext from "../context/ThemeContext";
import { scaleLinear } from "@vx/scale";
import { extent } from "d3-array";

const Circle = ({ x = 10, y = 10, r = 10, color }) => {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        fill="crimson"
        r={r}
        shape-rendering="geometricPrecision"
      />
      <text
        style={{ textAnchor: "middle" }}
        x={x}
        y={y}
        dy="0.3em"
        fill="var(--foreground-color)"
      >
        ▶ {x} ▲ {y}
      </text>
    </>
  );
};

export default function () {
  const [ref, { width, height }] = useMeasure();

  const { dark } = useContext(ThemeContext);

  const margin = {
    top: 90, right: 30, left: 30, bottom: 90
  }
  const gHeight = height - margin.top - margin.bottom;
  const gWidth = width - margin.left - margin.right;

  // Scale


  // Colors
  const color = {
    main: dark ? "crimson" : "navy"
  };


  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        zIndex: 2,
        width: "100%",
        height: "100vh",
      }}
    >

      <svg
        style={{ border: "1px solid gray" }}
        viewBox={`0 0 ${width} ${height}`}
      >


        <g style={{ transform: `translate(${margin.left}px, ${margin.top}px)` }}>
          <rect fill={color.main} x={0} y={0} width={gWidth} height={gHeight} />

        </g>
      </svg>

    </div>
  );
}
