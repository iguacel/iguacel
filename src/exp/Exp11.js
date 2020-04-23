import React, { Fragment, useState, useContext, useMemo } from "react";
import useSmallSize from "../hooks/useSmallSize";
import covid from "../data/covid_europe";
import { scaleTime, scaleLinear } from "d3-scale";
import { area, curveStep } from "d3-shape";
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
import { useSpring, animated } from "react-spring";

import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import Canvas from "./comp/Canvas";

const startDate = new Date("1/22/20");

const getDateArray = (start, end) => {
  let arr = [],
    dt = new Date(start);

  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
};

const updated = new Date("4/22/20");

const dates = getDateArray(startDate, updated);

const TooltipCanvas = ({
  selected,
  width,
  height,
  colors,
  isEnglish,
  dark,
  maxYScale,
  maxIndex,
  maxDate,
  maxNumber,
}) => {
  const {
    id,
    position,
    center,
    row,
    column,
    cellSize,
    cell,
    name,
    code,
    eu,
    first,
    confirmed,
    confirmed_daily,
    deaths,
    deaths_daily,
  } = selected;

  // color
  const foreground = dark
    ? "RGBA(255, 255, 255, 0.8)"
    : "RGBA(26, 27, 30, 0.6)";

  // d3
  const margin = { top: 50, right: 0, left: 50, bottom: 40 };

  const xScale = scaleTime()
    .domain([startDate, updated])
    .range([0, width - margin.right - margin.left]);

  const yScale = scaleLinear()
    .domain([0, maxYScale])
    .range([height - margin.top - margin.bottom, 0]);

  class TipCanvasCell {
    constructor({ selected }) {
      this.id = selected.id;
      this.position = selected.position;
      this.center = selected.center;
      this.row = selected.row;
      this.column = selected.column;
      this.cellSize = selected.cellSize;
      this.cell = selected.cell;
      this.name = selected.name;
      this.code = selected.code;
      this.eu = selected.eu;
      this.first = selected.first;
      this.confirmed = selected.confirmed;
      this.confirmed_daily = selected.confirmed_daily;
      this.deaths = selected.deaths;
      this.deaths_daily = selected.deaths_daily;
    }
    draw(ctx) {
      const areaGen = area()
        .y0(height - margin.top - margin.bottom)
        .curve(curveStep)
        .context(ctx);

      ctx.beginPath();

      ctx.translate(margin.left, margin.top);

      // Bg test
      // ctx.fillStyle = "pink";
      // ctx.fillRect(
      //   0,
      //   0,
      //   width - margin.left - margin.right,
      //   height - margin.top - margin.bottom
      // );

      // Rect
      ctx.fillStyle = colors.bg;
      ctx.fillRect(
        xScale(new Date(this.first[0])),
        0,
        width - margin.left - margin.right - xScale(new Date(this.first[0])),
        height - margin.top - margin.bottom
      );

      ctx.fillStyle = colors.main;

      areaGen(
        this.confirmed_daily.map((point, i) => {
          return [xScale(dates[i]), yScale(point)];
        })
      );

      ctx.closePath();
      ctx.fill();

      xAxis(ctx);
      yAxis(ctx);
      legendLines(ctx);
    }

    update(ctx) {
      this.draw(ctx);
    }

    animate(ctx) {
      this.draw(ctx);
    }
  }

  const draw = (canvas, ctx) => {
    new TipCanvasCell({
      selected,
    }).update(ctx);
  };

  const xAxis = (ctx) => {
    let tickCount = width / 100;
    let tickSize = 6;
    let ticks = xScale.ticks(tickCount);
    let tickFormat = xScale.tickFormat();
    let tickPadding = 7;

    ctx.beginPath();
    ticks.forEach(function (d) {
      ctx.moveTo(xScale(d), height - margin.top - margin.bottom);
      ctx.lineTo(xScale(d), height - margin.top - margin.bottom + tickSize);
    });
    ctx.strokeStyle = "gray";
    ctx.fillStyle = "gray";
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    ctx.font = "12px Inter";
    ticks.forEach(function (d) {
      ctx.fillText(
        tickFormat(d),
        xScale(d),
        height - margin.top - margin.bottom + tickSize + tickPadding
      );
    });
  };

  const yAxis = (ctx) => {
    let tickCount = 5;
    let ticks = yScale.ticks(tickCount);
    let tickFormat = yScale.tickFormat(tickCount);

    ctx.beginPath();
    ticks.forEach(function (d) {
      ctx.moveTo(-margin.left, yScale(d));
      ctx.lineTo(width - margin.left - margin.right, yScale(d));
    });

    ctx.fillStyle = "gray";
    ctx.strokeStyle = foreground;
    ctx.setLineDash([2, 1]);

    ctx.stroke();
    ctx.setLineDash([]);


    ctx.textAlign = "left";
    ctx.textBaseline = "left";
    ctx.font = "12px Inter";
    ticks.forEach(function (d) {
      ctx.fillText(tickFormat(d), -margin.left, yScale(d) - 20);
    });

    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.restore();
  };

  const legendLines = (ctx) => {
    const legendTop = 10;

    console.log("legendLines", first);
    ctx.strokeStyle = foreground;

    let firstCase = new Date(first[0]);

    ctx.beginPath();
    ctx.moveTo(-margin.left, -margin.top + legendTop);
    ctx.lineTo(xScale(firstCase), -margin.top + legendTop);
    ctx.lineTo(xScale(firstCase), height - margin.top - margin.bottom);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(width, -margin.top + legendTop);
    ctx.lineTo(xScale(maxDate), -margin.top + legendTop);
    ctx.lineTo(xScale(maxDate), margin.top - margin.bottom);

    ctx.stroke();
  };

  return (
    <Canvas
      style={{
        overflow: "visible",
      }}
      draw={(canvas, ctx) => {
        draw(canvas, ctx);
      }}
      width={width}
      height={height}
    />
  );
};

const Tooltip = ({ selected, isOpen, setIsOpen, size, colors, dark }) => {
  const {
    id,
    position,
    center,
    row,
    column,
    cellSize,
    cell,
    name,
    name_es,
    code,
    eu,
    first,
    confirmed,
    confirmed_daily,
    deaths,
    deaths_daily,
  } = selected;

  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  const tipAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  });

  // Data
  const maxYScale = Math.max(...confirmed_daily);
  const maxIndex = confirmed_daily.indexOf(maxYScale);
  const maxDate = dates[maxIndex];
  const maxNumber = confirmed_daily[maxIndex];

  return (
    <animated.div
      className="tooltip"
      style={{
        ...tipAnimation,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "visible",
        zIndex: 2,
        background: "var(--background-color)",
        border: "1px solid var(--foreground-color)",
        width: "calc(100% - 60px)",
        maxWidth: "800px",
        height: "500px",
      }}
      width={`${size}px`}
      height={`${size}px`}
      viewBox={`0 0 ${size} ${size}`}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "50px",
          borderBottom: "1px solid var(--foreground-color)",
        }}
      >
        <p style={{ margin: 0, padding: "1em" }} className="h4">
          {isEnglish ? name : name_es}
          {eu ? (
            <span
              style={{
                fontWeight: 400,
                fontSize: "85%",
                letterSpacing: "0.1em",
              }}
            >
              {isEnglish ? " | EU" : " | UE"}
            </span>
          ) : (
              ""
            )}
        </p>
        <div
          onClick={() => setIsOpen(!isOpen)}
          style={{
            cursor: "pointer",
            height: "100%",
            marginLeft: "auto",
            width: "50px",
            height: "50px",
            borderLeft: "1px solid var(--foreground-color)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            aria-hidden="true"
          >
            <path
              fill="var(--foreground-color)"
              strokeWidth="1"
              stroke="var(--foreground-color)"
              d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"
            />
          </svg>
        </div>
      </div>
      {/* Canvas */}
      <div
        ref={ref}
        className="tooltipGraph"
        style={{ margin: "1em", height: "340px" }}
      >
        <div
          className="keyCanvas"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 0, padding: 0 }}>
            <strong>{isEnglish ? "First case:" : "Primer caso:"} </strong>
            <br />
            {new Date(selected.first[0]).toLocaleDateString(
              isEnglish ? "en-GB" : "es-ES",
              { month: "long", day: "numeric" }
            )}
          </p>

          <p style={{ textAlign: "left" }}>
            <strong>
              {isEnglish ? "Daily max:" : "Máximo diario:"} <br />
            </strong>

            <strong>
              {maxNumber.toLocaleString(isEnglish ? "en-GB" : "es-ES")}{" "}
            </strong>

            <span>
              (
              {new Date(maxDate).toLocaleDateString(
              isEnglish ? "en-GB" : "es-ES",
              { month: "long", day: "numeric" }
            )}
              )
            </span>
          </p>
        </div>

        <TooltipCanvas
          width={bounds.width}
          height={bounds.height}
          selected={selected}
          colors={colors}
          isEnglish={isEnglish}
          dark={dark}
          maxYScale={maxYScale}
          maxIndex={maxIndex}
          maxDate={maxDate}
          maxNumber={maxNumber}
        />
      </div>
      {/* Notes */}
      <div className="notes" style={{ margin: "3em 1em 0 1em" }}>
        <p style={{ opacity: "0.5", fontSize: "90%" }}>
          {isEnglish ? "Updated" : "Actualizado"}{" "}
          {new Date(updated)
            .toLocaleString(language.id)
            .split(" ")[0]
            .replace(",", "")}
          .
        </p>
      </div>
    </animated.div>
  );
};

export default () => {
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const size = useSmallSize();
  const { dark } = useContext(ThemeContext);

  const select = (data) => {
    console.log(data);
    setIsOpen(true);
    setSelected(data);
  };

  // Globals
  const cellSize = size / 11;
  const maxYScale = 26843;

  // d3
  const xScale = scaleTime().domain([startDate, updated]).range([0, cellSize]);

  const yScale = scaleLinear().domain([0, maxYScale]).range([cellSize, 0]);

  // Colors
  const colors = {
    bg: dark ? "RGBA(228, 230, 234, 0.20)" : "RGBA(228, 230, 234, 1.00)",
    main: dark ? "RGBA(237, 179, 72, 1.00)" : "RGBA(226, 80, 59, 1.00)",
  };

  const drawCartogram = () => {
    const cellSize = size / 11;
    const columns = 11;
    const rows = 11;
    let id = -1;
    let grid = [];

    for (var i = 0; i < columns; i++) {
      for (var j = 0; j < rows; j++) {
        const position = { x: j * cellSize, y: i * cellSize };
        const row = i;
        const column = j;
        const center = {
          x: j * cellSize + cellSize / 2,
          y: i * cellSize + cellSize / 2,
        };
        id++;
        if (covid[`c${id}`]) {
          grid.push({
            id,
            position,
            center,
            row: row + 1,
            column: column + 1,
            cellSize,
            ...covid[`c${id}`],
          });
        }
      }
    }

    return grid;
  };

  const cartogram = useMemo(() => drawCartogram(), [size]);

  // CANVAS

  class BgCanvasCell {
    constructor({ x }) {
      this.id = x.id;
      this.position = x.position;
      this.center = x.center;
      this.row = x.row;
      this.column = x.column;
      this.cellSize = x.cellSize;
      this.cell = x.cell;
      this.name = x.name;
      this.code = x.code;
      this.eu = x.eu;
      this.first = x.first;
      this.confirmed = x.confirmed;
      this.confirmed_daily = x.confirmed_daily;
      this.deaths = x.deaths;
      this.deaths_daily = x.deaths_daily;
    }
    draw(ctx) {
      // Rect
      ctx.fillStyle = colors.bg;
      ctx.fillRect(
        xScale(new Date(this.first[0])) + this.position.x,
        this.position.y,
        cellSize - xScale(new Date(this.first[0])),
        cellSize
      );

      const areaGen = area()
        .y0(this.position.y + cellSize)
        .curve(curveStep)
        .context(ctx);

      ctx.fillStyle = colors.main;

      ctx.beginPath();
      areaGen(
        this.confirmed_daily.map((point, i) => {
          return [
            xScale(dates[i]) + this.position.x,
            yScale(point) + this.position.y,
          ];
        })
      );
      ctx.closePath();
      ctx.fill();
    }

    update(ctx) {
      this.draw(ctx);
    }
    animate(ctx) {
      // Call draw
      this.draw(ctx);
    }
  }

  // INIT
  let objects = [];

  const init = (canvas, ctx) => {
    // Objects
    cartogram.forEach((x, i) => {
      objects.push(
        new BgCanvasCell({
          x,
        })
      );
    });
  };

  // DRAW
  const draw = (canvas, ctx) => {
    init(canvas, ctx);

    ctx.clearRect(0, 0, size, size); // clear canvas

    objects.forEach((x) => x.update(ctx));
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {selected && (
        <Tooltip
          size={size}
          selected={selected}
          colors={colors}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dark={dark}
        />
      )}
      <svg
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
          zIndex: 1,
        }}
        width={`${size}px`}
        height={`${size}px`}
        viewBox={`0 0 ${size} ${size}`}
      >
        {cartogram.map((data) => (
          <SvgCell key={`cartoSvg${data.id}`} data={data} select={select} />
        ))}
      </svg>

      <Canvas
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
        }}
        draw={(canvas, ctx) => {
          draw(canvas, ctx);
        }}
        width={size}
        height={size}
      />
    </div>
  );
};

const SvgCell = ({ data, select }) => {
  return (
    <Fragment key={`cartoSvg${data.id}`}>
      <rect
        onClick={() => select(data)}
        style={{ cursor: "pointer" }}
        id={`cartoSvg${data.id}`}
        x={data.position.x}
        y={data.position.y}
        width={data.cellSize}
        height={data.cellSize}
        fill="transparent"
        stroke="gray"
      />
      <text
        style={{
          pointerEvents: "none",
          fill: "var(--foreground-color)",
          dominantBaseline: "hanging",
          fontSize: "0.8em",
        }}
        x={data.position.x + 6}
        y={data.position.y + 6}
        fontSize="55"
      >
        {data.code}
      </text>
    </Fragment>
  );
};
