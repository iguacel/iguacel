import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
  useMemo,
} from "react";
import useSmallSize from "../hooks/useSmallSize";
import covid from "../data/covid_europe";
import { scaleTime, scaleLinear } from "d3-scale";
import { area, curveStep } from "d3-shape";
import ThemeContext from "../context/ThemeContext";

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

const dates = getDateArray(startDate, new Date());

const Tooltip = ({ data }) => {
  return (
    <div>
      <h1>{data && data.id}</h1>
    </div>
  );
};

export default () => {
  const [selected, setSelected] = useState(null);
  const size = useSmallSize();
  const canvas = useRef(null);
  const requestRef = useRef();
  const { dark } = useContext(ThemeContext);

  const select = (data) => {
    setSelected(data);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }); // Make sure the effect runs only once

  // Globals
  const cellSize = size / 11;

  // d3
  const xScale = scaleTime()
    .domain([startDate, new Date()])
    .range([0, cellSize]);

  const yScale = scaleLinear().domain([0, 7000]).range([cellSize, 0]);

  // Colors
  const colors = {
    bg: dark ? "RGBA(228, 230, 234, 0.20)" : "RGBA(228, 230, 234, 1.00)",
    main: "RGBA(226, 80, 59, 1.00)",
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

  class CanvasCell {
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
      // if () {
      //   this.animate(ctx);
      // }
    }
    animate(ctx) {
      // Call draw
      this.draw(ctx);
    }
  }

  // INIT
  let objects = [];

  const init = () => {
    // Objects
    cartogram.forEach((x, i) => {
      objects.push(
        new CanvasCell({
          x,
        })
      );
    });
  };
  init();

  // DRAW
  const animationLoop = () => {
    var ctx = canvas.current.getContext("2d");

    ctx.clearRect(0, 0, size, size); // clear canvas

    objects.forEach((x) => x.update(ctx));

    // Mov
    // mov++;
    // Loop
    // requestRef.current = requestAnimationFrame(animationLoop);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooltip selected={selected} />
      <svg
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "visible",
        }}
        width={`${size}px`}
        height={`${size}px`}
        viewBox={`0 0 ${size} ${size}`}
      >
        {cartogram.map((data) => (
          <SvgCell key={`cartoSvg${data.id}`} data={data} select={select} />
        ))}
      </svg>

      <canvas
        style={{ size: "100%" }}
        ref={canvas}
        width={size * window.devicePixelRatio || 1}
        height={size * window.devicePixelRatio || 1}
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
        {/* -r{data.row}- c{data.column} */}
      </text>
    </Fragment>
  );
};
