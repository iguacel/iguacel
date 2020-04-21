import React, { useEffect, useRef } from "react";
import { useMeasure } from "react-use";

import { scaleTime } from "d3-scale";
import data from "../data/unabomber";

import { idStates, strokeStates, fillStates } from "../data/cartogramUSA";

import months from "../data/months";
import { lerp } from "../utils/utils";

export default () => {
  const [ref, { width, height }] = useMeasure();

  const canvas = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }); // Make sure the effect runs only once

  // Globals
  let currentIndex = 0;
  let currentDate = new Date();
  let dx = 1;

  let margin = { top: 200, right: 0, bottom: 60, left: 0 };

  const colors = {
    package: "RGBA(173, 135, 98, 1)",
    defused: "RGBA(173, 177, 181, 1)",
    scale: ["#feedde", "#fdbe85", "#fd8d3c", "#e6550d", "#a63603"],
  };

  // Dates
  let start = new Date(data[0].date);
  start.setMonth(start.getMonth() - 45);
  let end = new Date(data[data.length - 1].date);
  end.setMonth(end.getMonth() + 4);
  const dataDates = [];
  data.forEach((x) => dataDates.push(new Date(x.date)));

  // Positions
  let statesPositions = {
    WA: { position: null, center: null, nBombs: 0 },
    CA: { position: null, center: null, nBombs: 0 },
    UT: { position: null, center: null, nBombs: 0 },
    TN: { position: null, center: null, nBombs: 0 },
    IL: { position: null, center: null, nBombs: 0 },
    MI: { position: null, center: null, nBombs: 0 },
    NJ: { position: null, center: null, nBombs: 0 },
    CT: { position: null, center: null, nBombs: 0 },
  };

  const xScale = scaleTime()
    .domain([start, end])
    .range([0, width * 4]);

  const xAxis = (ctx, x, dx) => {
    ctx.save();
    var tickCount = 22,
      ticks = x.ticks(tickCount),
      tickFormat = x.tickFormat();

    ticks.forEach((d) => {
      ctx.moveTo(x(d) + dx, margin.top + 10);
      ctx.lineTo(x(d) + dx, margin.top - 10);
    });

    ctx.font = "12px Inter";
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ticks.forEach(function (d) {
      ctx.fillText(tickFormat(d), x(d) + dx, -30 + margin.top);
    });
    ctx.restore();
  };

  class Cell {
    constructor(x, y, size, state) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.state = state;
    }
    draw(ctx) {
      ctx.save();

      ctx.font = "10px Inter";
      ctx.textAlign = "left";
      ctx.fillStyle = "gray";
      ctx.fillText(
        `${this.state}`,
        this.x + 6,
        this.y + 15,
        this.size,
        this.size
      );
      ctx.fillStyle =
        data[currentIndex].state === this.state
          ? "RGBA(173, 135, 98, 0.30)"
          : "RGBA(97, 92, 87, 0.20)";
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.restore();
    }
    update(ctx) {
      this.draw(ctx);
    }
  }

  const drawLabels = (ctx) => {
    ctx.save();
    ctx.fillStyle = "gray";
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "18px Inter";
    ctx.fillText(
      `${months[new Date(currentDate).getMonth() + 1]}`,
      width / 2,
      margin.top - 130
    );

    ctx.font = "45px Inter";
    ctx.fillText(
      `${new Date(currentDate).getFullYear()}`,
      width / 2,
      margin.top - 100
    );
    ctx.restore();
  };

  const drawCartogram = (ctx) => {
    const size = width / 12;
    const columns = 8;
    const rows = 12;
    const cartoHeight = columns * size;
    let id = 0;
    const marginTop = (height - cartoHeight) / 2 + 50;
    let state = null;
    ctx.font = "12px Inter";

    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
        if (strokeStates.includes(id)) {
          ctx.save();
          ctx.strokeStyle = `gray`;
          ctx.lineWidth = 0.5;
          ctx.strokeRect(j * size, i * size + marginTop, size, size);
          ctx.stroke();
          ctx.restore();
        }
        if (fillStates.includes(id)) {
          state = idStates[`s${id}`];

          const position = { x: j * size, y: i * size + marginTop };
          const center = {
            x: j * size + size / 2,
            y: i * size + marginTop + size / 2,
          };

          statesPositions[state] = {
            ...statesPositions[state],
            center,
            position,
          };

          new Cell(position.x, position.y, size, state).update(ctx);
        }
        id += 1;
      }
    }
  };

  class Bomb {
    constructor(d, x, y, size, color, nExplosion) {
      this.d = d;
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.nExplosion = nExplosion;
      this.dropBombTime = 0;
      this.dropSpeed = 0.01;
    }
    draw(ctx) {
      ctx.save();
      ctx.beginPath(ctx);
      ctx.rect(this.x, this.y, this.size, this.size);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();

      // Debug
      // ctx.save();
      // ctx.fillStyle = 'white';
      // ctx.fillText(this.nExplosion, this.x - this.size / 2, this.y);
      // Debug
      ctx.restore();
      ctx.restore();
    }
    update(ctx) {
      this.draw(ctx);
      if (new Date(currentDate) > new Date(this.d.date)) {
        currentIndex = this.d.index;
        this.animateBomb(ctx);
      }
    }
    animateBomb(ctx) {
      const start = { x: width / 2, y: margin.top };
      const end = statesPositions[data[currentIndex].state].position;

      // Pictogram
      const drawPictogram = (n, size) => {
        let squares = [];
        for (var i = 0; i < n; i++) {
          for (var j = 0; j < n; j++) {
            squares.push([
              j * size - 4 + (end.x + 8),
              i * size - 4 + (end.y + 9),
              size - 4,
            ]);
          }
        }
        return squares;
      };

      const cellSize = width / 12;
      const pictoPositions = drawPictogram(3, cellSize / 3.3, ctx);
      // Pictogram

      if (this.dropBombTime < 1) {
        this.x = lerp(
          start.x,
          pictoPositions[this.nExplosion + 2][0],
          this.dropBombTime
        );
        this.y = lerp(
          start.y,
          pictoPositions[this.nExplosion + 2][1],
          this.dropBombTime
        );
        this.size = lerp(
          this.size,
          pictoPositions[this.nExplosion + 2][2],
          this.dropBombTime
        );
        this.dropBombTime += this.dropSpeed;
      } else {
        this.x = pictoPositions[this.nExplosion + 2][0];
        this.y = pictoPositions[this.nExplosion + 2][1];
        this.size = pictoPositions[this.nExplosion + 2][2];
      }
      this.draw(ctx);
    }
  }

  class Box {
    constructor(d, x, y, size, color) {
      this.d = d;
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
    }
    draw(ctx) {
      ctx.save();
      ctx.beginPath(ctx);
      ctx.rect(this.x, this.y, this.size, this.size);
      ctx.globalAlpha =
        new Date(currentDate) < new Date(this.d.date) ? 0.8 : 0.2;
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    }
  }

  // INIT
  let bombs = [];

  const init = () => {
    // Bombs
    data.forEach((d, i) => {
      let size = 20;
      let x = -100;
      let y = margin.top - size / 2;
      let color = d.explosion ? colors.package : colors.defused;
      let nExplosion = d.nExplosion;
      bombs.push(new Bomb(d, x, y, size, color, nExplosion));
    });
  };

  init();

  // DRAW
  const animationLoop = () => {
    var ctx = canvas.current.getContext("2d");

    // Scale
    const ratio = window.devicePixelRatio || 1;

    canvas.current.width = width * ratio;
    canvas.current.height = height * ratio;

    canvas.current.style.width = `${width}px`;
    canvas.current.style.height = `${height}px`;

    ctx.scale(ratio, ratio);


    ctx.clearRect(0, 0, width, height); // clear canvas

    // Current Date
    currentDate = xScale.invert(width - width / 2 - dx);

    // Carto
    drawCartogram(ctx);

    // Boxes
    data.forEach((d, i) => {
      let size = 20;
      let x = xScale(new Date(d.date)) + dx;
      let y = margin.top - size / 2;
      let color = d.explosion ? colors.package : colors.defused;
      new Box(d, x, y, size, color).draw(ctx);
    });

    // Bombs
    bombs.forEach((bomb) => bomb.update(ctx));

    // Axis
    xAxis(ctx, xScale, dx);

    // Text
    drawLabels(ctx);

    // Box movement
    dx = currentIndex !== data[data.length - 1].index ? dx - 1.5 : dx - 0.2;

    // Loop
    requestRef.current = requestAnimationFrame(animationLoop);
  };

  return (
    <div
      ref={ref}
      style={{
        width: "100%",
        height: "100vh",
        maxWidth: "700px",
        margin: "0 auto",
      }}
    >
      <div
        className="line"
        style={{
          position: "fixed",
          top: `${margin.top}px`,
          right: "0px",
          width: "100%",
          height: "1px",
          background: "transparent",
          borderTop: "1px solid var(--foreground-color)",
          opacity: 0.5,
        }}
      ></div>
      <canvas ref={canvas} width={width} height={height} />
    </div>
  );
};
