import React, { useState, useContext, useRef } from "react";
import useMeasure from "react-use-measure";
import useInterval from "../hooks/useInterval";
import ThemeContext from "../context/ThemeContext";

// Following this tut by Ben Awad
// https://youtu.be/DvVt11mPuM0

// Globals
const numRows = 10;
const numCols = 10;

// Operations
const operations = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

// Grid
const randomGrid = () => {
  const grid = [];
  for (let i = 0; i < numRows; i++) {
    grid.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
  }
  return grid;
};

const simulation = (grid) => {
  // Spread doesn't work here. Clone multidimensional array
  let gridCopy = JSON.parse(JSON.stringify(grid));
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // computes neighbors
      let neighbors = 0;
      operations.forEach(([x, y]) => {
        const newI = i + x;
        const newJ = j + y;
        // check bounds
        if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
          neighbors += grid[newI][newJ];
        }
      });

      if (neighbors < 2 || neighbors > 3) {
        // fewer than 2 and more than 3 dies
        gridCopy[i][j] = 0;
      } else if (grid[i][j] === 0 && neighbors === 3) {
        // dead cell with 3 neighbours becomes alive
        gridCopy[i][j] = 1;
      }
    }
  }
  return gridCopy;
};

export default () => {
  const [refDiv, { width, height }] = useMeasure();
  const [grid, setGrid] = useState(randomGrid);
  const [running, setRunning] = useState(true);

  const smallestSize = width < height ? width : height;
  const size = smallestSize / numRows;

  // Styles
  const { dark } = useContext(ThemeContext);

  const buttonStyle = {
    backgroundColor: dark ? "var(--blue)" : "var(--green)",
    borderRadius: "50%",
    width: size,
    height: size,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 500ms",
    willChange: "background-color",
  };

  const buttonWrapper = {
    position: "absolute",
    display: "flex",
    width: size * 3 - 2,
    height: size * 1 - 2,
    justifyContent: "space-between",
    alignItems: "center",
  };

  // Ref to use in useInterval
  const runningRef = useRef(running);
  runningRef.current = running;

  useInterval(() => {
    if (!runningRef.current) {
      return;
    }
    setGrid((g) => simulation(g));
  }, 200);

  return (
    <div
      ref={refDiv}
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <div style={buttonWrapper}>
        {/* Restart */}
        <div
          onClick={() => {
            setRunning(false);
            // update ref to prevent race condition?
            // Not needed?
            // runningRef.current = false;
            setGrid(randomGrid());

            setRunning(true);
            // runningRef.current = true;
          }}
          style={buttonStyle}
        >
          {restartIcon}
        </div>

        {/* Play, stop */}
        <div
          onClick={() => {
            if (running) {
              setRunning(false);
              // runningRef.current = false;
            } else {
              setRunning(true);
              // runningRef.current = true;
            }
          }}
          style={buttonStyle}
        >
          {running ? stopIcon : playIcon}
        </div>
      </div>

      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numCols}, ${size}px)`,
        }}
      >
        {grid.map((row, i) =>
          row.map((col, j) => (
            <div
              key={`row${i}-col${j}`}
              style={{
                width: size,
                height: size,
                backgroundColor: grid[i][j]
                  ? "var(--foreground-color)"
                  : undefined,
                border: "1px solid var(--foreground-color)",
                transition: "none",
              }}
            ></div>
          ))
        )}
      </div>
    </div>
  );
};

// SVGS
const fillColor = "white";

const playIcon = (
  <svg
    style={{ width: "63%" }}
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    viewBox="-2 0 32 32"
    aria-hidden="true"
  >
    <path
      fill={fillColor}
      d="M7,28a1,1,0,0,1-1-1V5a1,1,0,0,1,.5-.87,1,1,0,0,1,1,0l19,11a1,1,0,0,1,0,1.74l-19,11A1,1,0,0,1,7,28ZM8,6.73V25.27L24,16Z"
    />
    <title>Play</title>
  </svg>
);

const stopIcon = (
  <svg
    style={{ width: "63%" }}
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path
      fill={fillColor}
      d="M12,8V24H8V8h4m0-2H8A2,2,0,0,0,6,8V24a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z"
    />
    <path
      fill={fillColor}
      d="M24,8V24H20V8h4m0-2H20a2,2,0,0,0-2,2V24a2,2,0,0,0,2,2h4a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2Z"
    />
    <title>Pause</title>
  </svg>
);

const restartIcon = (
  <svg
    style={{ width: "63%" }}
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path
      fill={fillColor}
      d="M25,18A10,10,0,1,1,15,8h6.18L17.6,11.59,19,13l6-6L19,1,17.6,2.41,21.19,6H15A12,12,0,1,0,27,18Z"
    />
    <title>Restart</title>
  </svg>
);
