import React, { useState, useMemo, useEffect, useRef, useContext } from "react";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
// Data
import carto from "../data/cartoSpain";
import options from "../data/covidSpainOptions";
import { csvParse } from "d3-dsv";
// Hooks
import useSmallSize from "../hooks/useSmallSize";
import { isTouchDevice } from "../utils/browsers";
// Context
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
import Canvas from "./comp/Canvas";
// D3 / VX
import { scaleTime, scaleLinear, scaleLog } from "d3-scale";
import { area, curveStep } from "d3-shape";
import { bisector } from "d3-array";
import { AxisRight, AxisLeft, AxisBottom } from "@vx/axis";
import { useTooltip } from "@vx/tooltip";
import { localPoint } from "@vx/event";
import { Grid } from "@vx/grid";
import {
  scaleLinear as vxScaleLinear,
  scaleLog as vxScaleLog,
} from "@vx/scale";
import { AreaClosed, Line, Bar, LinePath } from "@vx/shape";
// Animation
import { useSpring, animated } from "react-spring";
// Select
import "./css/covidSpain.css";

// const getDateArray = (start, end) => {
//   let arr = [],
//     dt = new Date(start);

//   while (dt <= end) {
//     arr.push(new Date(dt));
//     dt.setDate(dt.getDate() + 1);
//   }
//   return arr;
// };

const drawCartogram = (size) => {
  const cellSize = size / 10;
  const columns = 10;
  const rows = 10;
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
      if (carto[`c${id}`]) {
        grid.push({
          id,
          position,
          center,
          row: row + 1,
          column: column + 1,
          cellSize,
          ...carto[`c${id}`],
        });
      }
    }
  }

  return grid;
};

export default () => {
  const size = useSmallSize();
  const cartogram = useMemo(() => drawCartogram(size), [size]);

  // State
  const [refDiv, { width, height }] = useMeasure({ polyfill: ResizeObserver });
  const [data, setData] = useState(null);
  const [commit, setCommit] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visible, setVisible] = useState("cases_accumulated");

  const [isLog, setIsLog] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2020-02-20"));

  // Context
  const { dark } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;
  const isTouch = isTouchDevice();

  // Fun
  const changeVisible = (selected) => {
    setVisible(selected);
  };

  const changeLog = () => {
    setIsLog(!isLog);
  };

  // Intl api
  const rtf =
    Intl.PluralRules &&
    new Intl.RelativeTimeFormat(language.id, { numeric: "auto" });

  const select = (data) => {
    setIsOpen(true);
    setSelected(data);
  };

  // Globals
  const cellSize = size / 10;

  useEffect(() => {
    // Get data
    const fetchData = () => {
      const uri =
        "https://raw.githubusercontent.com/montera34/escovid19data/master/data/output/covid19-provincias-spain_consolidated.csv";
      fetch(uri)
        .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
        .then((text) => csvParse(text))
        .then((data) => {
          const out = data.reduce((acc, x, i, arr) => {
            const { ine_code: ine, date } = x;

            if (!acc[`c${ine}`]) {
              let meta;
              Object.keys(carto).forEach((c) => {
                if (carto[c].ine === ine) {
                  meta = { ...carto[c] };
                }
              });

              acc[`c${ine}`] = {
                data: [x],
                meta,
                firstDate: x.date,
              };
            } else {
              acc[`c${ine}`].data = [...acc[`c${ine}`].data, x];
            }

            return acc;
          }, {});

          // save data
          setData(out);
          setIsLoaded(true);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();

    // Last commit
    fetch(
      "https://api.github.com/repos/montera34/escovid19data/branches/master"
    )
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((json) => {
        setCommit({
          author: json.commit.author.login,
          date: json.commit.commit.author.date,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // End useEffect
  }, []);

  // d3
  const xScale = scaleTime()
    .domain([startDate, new Date()])
    .range([0, cellSize]);

  const getMax = () => {
    return options.find((x) => x.value === visible).max;
  };

  const yScale = scaleLinear().domain([0, getMax()]).range([cellSize, 0]);

  const yScaleLog = scaleLog().domain([0.1, getMax()]).range([cellSize, 0]);

  // Colors
  const colors = {
    bg: dark ? "RGBA(228, 230, 234, 0.20)" : "RGBA(228, 230, 234, 1.00)",
    main: dark ? "RGBA(238, 174, 146, 1.00)" : "RGBA(226, 80, 59, 1.00)",
    lightColor: dark ? "RGBA(75, 76, 78, 1.00)" : "RGBA(214, 214, 214, 1.00)",
  };

  // CANVAS

  let nData = 0;

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
      this.ine = x.ine;
      this.data = data && data[x.id];
    }
    draw(ctx) {
      // Rect
      ctx.fillStyle = colors.bg;
      ctx.fillRect(
        xScale(new Date()) + this.position.x,
        this.position.y,
        cellSize - xScale(new Date()),
        cellSize
      );

      const areaGen = area()
        .y0(this.position.y + cellSize)
        .curve(curveStep)
        .context(ctx);

      const filteredData = this.data?.data.filter(
        (x) =>
          x[visible] !== "0" &&
          !isNaN(parseFloat(x[visible])) &&
          isFinite(x[visible])
      );

      ctx.fillStyle = colors.lightColor;
      ctx.font = `${cellSize / 5}px Inter`;

      ctx.beginPath();
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      {
        filteredData.length > 2
          ? areaGen(
            filteredData.map((point, i) => {
              nData = nData + 1;
              return [
                xScale(new Date(point.date)) + this.position.x,
                isLog
                  ? yScaleLog(point[visible]) + this.position.y
                  : yScale(point[visible]) + this.position.y,
              ];
            })
          )
          : ctx.fillText(
            `${isEnglish ? "N/A" : "N/D"}`,
            this.center.x,
            this.center.y + 10
          );
      }
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
    if (!isLoaded) {
      return;
    }
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

    ctx.clearRect(0, 0, size, size); // clear

    objects.forEach((x) => x.update(ctx));
  };

  // END CANVAS
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        ref={refDiv}
        style={{
          position: "relative",
          margin: "0 auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Menu
          changeVisible={changeVisible}
          commit={commit}
          isEnglish={isEnglish}
          language={language}
          rtf={rtf}
          changeLog={changeLog}
          isLog={isLog}
          cellSize={cellSize}
        />

        {selected && (
          <Tooltip
            commit={commit}
            rtf={rtf}
            visible={visible}
            size={size}
            selected={selected}
            colors={colors}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            dark={dark}
            data={data}
            isLog={isLog}
            changeLog={changeLog}
            startDate={startDate}
          />
        )}


        {/* SVG */}
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
          {cartogram.map((carto) => (
            <SvgCell
              colors={colors}
              isTouch={isTouch}
              key={`cartoSvg${carto.id}`}
              carto={carto}
              select={select}
              data={data}
              isLoaded={isLoaded}
              visible={visible}
            />
          ))}

          <Key
            marginLeft={10}
            colors={colors}
            changeLog={changeLog}
            isLog={isLog}
            cellSize={cellSize}
            visible={visible}
            isEnglish={isEnglish}
            startDate={startDate}
          />
        </svg>

        {/* CANVAS */}
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
    </div>


  );
};

const Menu = ({
  changeVisible,
  isEnglish,
  // commit,
  // language,
  // rtf,
  // changeLog,
  // isLog,
  // cellSize,
}) => {
  return (
    <div
      className="menuPanel"
    >
      <Select
        options={options}
        changeVisible={changeVisible}
        isEnglish={isEnglish}
      />
    </div>
  );
};

const Key = ({
  isLog,
  cellSize,
  row = 0,
  column = 5,
  visible,
  isEnglish,
  colors,
  changeLog,
  marginLeft,
  startDate,
}) => {
  const position = { x: cellSize * row, y: cellSize * column };

  const max = options.find((x) => x.value === visible).max;

  const yScale = vxScaleLinear({
    range: [cellSize, 0],
    domain: [0, max],
    nice: true,
  });

  const yScaleLog = vxScaleLog({
    range: [cellSize, 0],
    domain: [0.1, max],
    nice: true,
  });

  const xScale = vxScaleLinear({
    domain: [new Date(startDate), new Date()],
    range: [0, cellSize],
  });

  return (
    <g>
      <rect
        stroke="var(--foreground-color)"
        fill="var(--foreground-color)"
        opacity="0.2"
        x={position.x + marginLeft}
        y={position.y}
        width={cellSize}
        height={cellSize}
      />

      <Grid
        top={position.y}
        left={position.x + marginLeft}
        xScale={xScale}
        yScale={isLog ? yScaleLog : yScale}
        stroke="var(--background-color)"
        width={cellSize}
        height={cellSize}
        numTicksRows={4}
        numTicksColumns={0}
      />

      <AxisRight
        top={position.y}
        left={position.x + cellSize + marginLeft}
        scale={isLog ? yScaleLog : yScale}
        numTicks={2}
        stroke="var(--foreground-color)"
        tickStroke="var(--foreground-color)"
        tickLabelProps={(value, index) => ({
          fill: "var(--foreground-color)",
          textAnchor: "start",
          dx: "1em",
          dy: "0.25em",
        })}
        tickFormat={(value) => {
          return value;
        }}
        tickComponent={({ formattedValue, ...tickProps }) => (
          <text style={{ fontSize: "0.7em" }} {...tickProps}>
            {formattedValue}
          </text>
        )}
      />

      <circle
        cx={position.x + 12 + marginLeft}
        cy={position.y + cellSize + 25}
        r={10}
        stroke="var(--foreground-color)"
        fill="none"
        strokeWidth="1px"
      />

      {isLog && (
        <circle
          cx={position.x + 12 + marginLeft}
          cy={position.y + cellSize + 25}
          r={4}
          fill={colors.main}
        />
      )}

      <text
        style={{
          pointerEvents: "none",
          fill: "var(--foreground-color)",
          dominantBaseline: "hanging",
          fontSize: "0.8em",
        }}
        x={position.x + 32 + marginLeft}
        y={position.y + cellSize + 20}
        fontSize="22"
      >
        {isEnglish && "Use log"}
        {!isEnglish && "Escala"}
      </text>

      <text
        style={{
          pointerEvents: "none",
          fill: "var(--foreground-color)",
          dominantBaseline: "hanging",
          fontSize: "0.8em",
        }}
        x={position.x + 32 + marginLeft}
        y={position.y + cellSize + 38}
        fontSize="22"
      >
        {isEnglish && "scale"}
        {!isEnglish && "log."}
      </text>

      <rect
        style={{ cursor: "pointer" }}
        onClick={() => changeLog()}
        className="hitRect"
        fill="transparent"
        x={position.x}
        y={position.y}
        width={cellSize + 50}
        height={cellSize + 50}
      />
    </g>
  );
};

const Select = ({ options, changeVisible, isEnglish }) => {
  const items = options;

  return (
    <div>
      <select
        className="select-css"
        onChange={(e) => {
          e.preventDefault();
          changeVisible(e.currentTarget.value);
        }}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {isEnglish ? item.label : item.label_es}
          </option>
        ))}
      </select>
    </div >
  );
};

const SvgCell = ({
  carto,
  select,
  isLoaded,
  colors,
  // data,
  // visible,
  // isTouch,
}) => {
  const { id, center, position, cellSize, abv, name_s } = carto;

  return (
    <g key={`cartoSvg${id}`}>
      <rect
        onClick={() => select(carto)}
        style={{ cursor: "pointer" }}
        id={`cartoSvg${id}`}
        x={position.x}
        y={position.y}
        width={cellSize}
        height={cellSize}
        fill="transparent"
        stroke={"gray"}
      />
      <text
        style={{
          pointerEvents: "none",
          fill: "var(--foreground-color)",
          dominantBaseline: "hanging",
          fontSize: "0.8em",
        }}
        x={position.x + 6}
        y={position.y + 6}
        fontSize="55"
      >
        {cellSize < 80 ? abv : name_s}
      </text>

      {!isLoaded && (
        <circle
          cx={center.x}
          cy={center.y}
          r={cellSize / 7}
          fill={colors.lightColor}
        />
      )}
    </g>
  );
};

// https://github.com/montera34/escovid19data

const Tooltip = ({
  commit,
  rtf,
  visible,
  selected,
  isOpen,
  setIsOpen,
  size,
  colors,
  dark,
  data,
  isLog,
  changeLog,
  startDate,
}) => {
  const {
    ccaa_es,
    name_s,
    // abv,
    // abv2,
    // ccaa,
    // cell,
    // cellSize,
    // center,
    // column,
    // id,
    // ine,
    // name,
    // position,
    // row,
  } = selected;

  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  const tipAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  });

  const metaOptions = options.find((x) => x.value === visible);

  // TODO. Go up and share with svg
  const filteredData = useMemo(() =>
    data[selected.id].data.filter(
      (x) => !isNaN(parseFloat(x[visible])) && isFinite(x[visible]),
      [visible, data]
    )
  );

  const newMax = useMemo(
    () => Math.max(...filteredData.map((x) => +x[visible])),
    [filteredData]
  );

  const newMaxDate = useMemo(() => {
    return filteredData.find((x) => +x[visible] === newMax);
  }, [filteredData]);

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
        width: "calc(100% - 40px)",
        height: "400px",
        overflow: "hidden"
      }}
      width={`${size}px`}
      height={`${size}px`}
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
          {name_s}

          <span
            style={{
              fontWeight: 400,
              fontSize: "85%",
              letterSpacing: "0.1em",
            }}
          >
            {" "}
            | {ccaa_es}
          </span>
        </p>
        <div
          className="covid_close"
          onClick={() => setIsOpen(!isOpen)}
          style={{
            cursor: "pointer",
            height: "100%",
            marginLeft: "auto",
            width: "50px",
            height: "50px",
            background: "var(--foreground-color)",
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
              fill="var(--background-color)"
              strokeWidth="1"
              stroke="var(--background-color)"
              d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"
            />
          </svg>
        </div>
      </div>
      {/* Canvas */}
      <div
        ref={ref}
        className="tooltip"
        style={{ margin: "1em", height: "250px" }}
      >
        <div
          className="keyCanvas"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <p style={{ margin: 0, padding: 0, flexBasis: "80%" }}>
            {isEnglish ? metaOptions?.desc : metaOptions?.desc_es}
          </p>

          <p style={{ textAlign: "right" }}>
            <span>
              {!isNaN(parseFloat(newMax)) && isFinite(newMax)
                ? new Date(newMaxDate.date).toLocaleDateString(
                  isEnglish ? "en-GB" : "es-ES",
                  {
                    month: "short",
                    day: "numeric",
                  }
                )
                : ""}
            </span>
            <br />
            <strong>
              {!isNaN(parseFloat(newMax)) && isFinite(newMax) ? newMax : ""}
            </strong>
          </p>
        </div>

        <Graph
          isLog={isLog}
          changeLog={changeLog}
          width={bounds.width}
          height={bounds.height}
          selected={selected}
          colors={colors}
          isEnglish={isEnglish}
          data={data}
          visible={visible}
          startDate={startDate}
          filteredData={filteredData}
          newMax={newMax}
          newMaxDate={newMaxDate}
        />
      </div>

      {/* Notes */}
      <div
        className="notes"
        style={{ margin: "4em 1em 0 1em", fontSize: "80%" }}
      >
        {commit?.date && commit?.author && (
          <p>
            <LastCommit
              commit={commit}
              isEnglish={isEnglish}
              language={language}
              rtf={rtf}
              width={bounds.width}
            />
          </p>
        )}
      </div>
    </animated.div>
  );
};

const LastCommit = ({ commit, isEnglish, language, rtf, width }) => {
  const units = [
    ["year", 31536000000],
    ["month", 2628000000],
    ["day", 86400000],
    ["hour", 3600000],
    ["minute", 60000],
    ["second", 1000],
  ];

  const relatime = (elapsed) => {
    for (const [unit, amount] of units) {
      if (Math.abs(elapsed) > amount || unit === "second") {
        return rtf.format(Math.round(elapsed / amount), unit);
      }
    }
  };

  return (
    <span>
      <a
        href="https://github.com/montera34/escovid19data"
        title="Escovid19 data"
        target="_blank"
        rel="noopener noreferrer"
      >
        Escovid19data
      </a>
      .{" "}
      {width > 400 && (
        <>
          {isEnglish ? "Updated by " : "Actualizado por "} {commit?.author}{" "}
          {!Intl.PluralRules
            ? new Date(commit.date)
              .toLocaleString(language.id)
              .split(" ")[0]
              .replace(",", "")
            : relatime(new Date(commit.date) - new Date())}
          .
        </>
      )}
    </span>
  );
};

const Graph = ({
  width,
  height,
  selected,
  colors,
  isEnglish,
  data,
  visible,
  isLog,
  changeLog,
  startDate,
  filteredData,
  newMax,
  newMaxDate,
}) => {
  const margin = {
    top: 40,
    right: 0,
    left: 50,
    bottom: 60,
  };
  const gHeight = height - margin.top - margin.bottom;
  const gWidth = width - margin.left - margin.right;

  // Scales
  // const max = options.find((x) => x.value === visible).max;

  const xScale = vxScaleLinear({
    domain: [new Date(startDate), new Date()],
    range: [0, gWidth],
  });

  const yScale = vxScaleLinear({
    range: [gHeight, 0],
    domain: [0, newMax],
    nice: true,
  });

  const yScaleLog = vxScaleLog({
    range: [gHeight, 0],
    domain: [0.1, newMax],
    clamp: true,
    nice: true,
  });

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(isEnglish ? "en-GB" : "es-ES", {
      month: "short",
      day: "numeric",
    });

  // accessors
  const xAcc = (d) => new Date(d.date);
  const yAcc = (d) => +d[visible];
  const bisectDate = bisector((d) => new Date(d.date)).left;

  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const svgRef = useRef();

  const handleTooltip = (event) => {
    let coords = localPoint(event.target.ownerSVGElement, event);

    if (!coords.x) {
      return;
    }

    let { x } = coords;

    const x0 = xScale.invert(x - margin.left);
    const index = bisectDate(filteredData, x0, 1);
    let d0 = filteredData[index - 1];
    let d1 = filteredData[index];
    let d = d0;
    if (d1 && d1.date) {
      d = x0 - xAcc(d0.date) > xAcc(d1.date) - x0 ? d1 : d0;
    }
    // Call

    showTooltip({
      tooltipData: d,
      tooltipLeft: x,
      tooltipTop: isLog ? yScaleLog(d?.[visible]) : yScale(d?.[visible]),
    });
  };

  return (
    <div style={{ position: "relative" }}>
      <svg
        ref={svgRef}
        style={{ overflow: "visible" }}
        viewBox={`0 0 ${width} ${height}`}
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              className="stop1"
              offset="0%"
              stopColor="var(--background-color)"
              stopOpacity={0}
            />
            <stop
              className="stop2"
              offset="20%"
              stopColor="var(--background-color)"
              stopOpacity={1}
            />
            <stop
              className="stop2"
              offset="80%"
              stopColor="var(--background-color)"
              stopOpacity={1}
            />
            <stop
              className="stop3"
              offset="100%"
              stopColor="var(--background-color)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        {/* Max line */}
        {!isNaN(parseFloat(newMax)) && isFinite(newMax) && (
          <LinePath
            data={[
              [width, 10],
              [xScale(new Date(newMaxDate.date)) + margin.left, 10],
              [
                xScale(new Date(newMaxDate.date)) + margin.left,
                isLog
                  ? yScaleLog(newMax) + margin.top
                  : yScale(newMax) + margin.top,
              ],
            ]}
            x={(d) => d[0]}
            y={(d) => d[1]}
            stroke={"var(--foreground-color)"}
            style={{ opacity: 0.5 }}
            strokeWidth={1}
          />
        )}

        <g
          style={{ transform: `translate(${margin.left}px, ${margin.top}px)` }}
        >
          <Grid
            xScale={xScale}
            yScale={isLog ? yScaleLog : yScale}
            stroke={colors.lightColor}
            width={gWidth}
            height={gHeight}
            numTicksRows={4}
            numTicksColumns={0}
            columnLineStyle={{
              pointerEvents: "none",
            }}
            lineStyle={{
              pointerEvents: "none",
            }}
          />

          {filteredData && (
            <AreaClosed
              data={filteredData}
              x={(d) => xScale(xAcc(d))}
              y={(d) => (isLog ? yScaleLog(yAcc(d)) : yScale(yAcc(d)))}
              yScale={isLog ? yScaleLog : yScale}
              fill={colors.lightColor}
              curve={curveStep}
            />
          )}

          <AxisLeft
            scale={isLog ? yScaleLog : yScale}
            hideAxisLine
            hideTicks
            numTicks={newMax < 20 ? 1 : 3}
            tickLabelProps={(value, index) => ({
              textAnchor: "end",
              dy: 5,
              fill: "var(--foreground-color)",
              style: { fontSize: "0.8em" },
            })}
            tickFormat={(value) => {
              return value;
            }}
          />

          {filteredData.length < 2 && (
            <text
              dy={-10}
              x={gWidth / 2}
              y={gHeight / 2}
              style={{ textAnchor: "middle", fontSize: "1.8em" }}
              fill="var(--foreground-color)"
            >
              {isEnglish ? "N/A" : "N/D"}
            </text>
          )}

          <Bar
            onClick={() => changeLog()}
            style={{ cursor: "pointer" }}
            x={-margin.left}
            y={0}
            width={margin.left}
            height={gHeight}
            fill="transparent"
            data={filteredData}
          />

          <AxisBottom
            top={gHeight}
            tickFormat={formatDate}
            numTicks={width > 550 ? 8 : 3}
            scale={xScale}
            stroke="var(--foreground-color)"
            tickStroke="var(--foreground-color)"
            hideAxisLine={false}
            tickLabelProps={(value, index) => ({
              dy: 12,
              fill: "var(--foreground-color)",
              textAnchor: "middle",
              style: { fontSize: "0.8em" },
            })}
          />

          <Bar
            style={{ cursor: "crosshair" }}
            onTouchStart={(event) => handleTooltip(event)}
            onTouchMove={(event) => hideTooltip(event)}
            onMouseMove={(event) => handleTooltip(event)}
            onMouseLeave={(event) => hideTooltip(event)}
            x={0}
            y={0}
            width={gWidth}
            height={gHeight}
            fill="transparent"
            data={filteredData}
          />
        </g>

        {tooltipData && (
          <g>
            <Line
              from={{ x: tooltipLeft, y: margin.top }}
              to={{ x: tooltipLeft, y: gHeight + margin.top }}
              stroke="var(--foreground-color)"
              strokeWidth={1}
              style={{ pointerEvents: "none" }}
              strokeDasharray="2,2"
            />

            <circle
              cx={tooltipLeft}
              cy={tooltipTop + margin.top}
              r={5}
              fill={colors.main}
              stroke="var(--background-color)"
              strokeWidth={3}
              style={{ pointerEvents: "none" }}
            />

            <rect
              x={tooltipLeft - 50}
              y={16}
              fill="url(#grad1)"
              width="100px"
              height="20px"
            />

            <text
              dy={-10}
              x={tooltipLeft}
              y={margin.top}
              style={{ textAnchor: "middle" }}
              fill="var(--foreground-color)"
            >
              {tooltipData[visible]}
            </text>

            <rect
              x={tooltipLeft - 50}
              y={height - 45}
              fill="url(#grad1)"
              width="100px"
              height="20px"
            />

            <text
              x={tooltipLeft}
              dy={-30}
              y={height}
              style={{ textAnchor: "middle", fontSize: "0.8em" }}
              fill="var(--foreground-color)"
            >
              {new Date(tooltipData.date).toLocaleDateString(
                isEnglish ? "en-GB" : "es-ES",
                { month: "long", day: "numeric" }
              )}
            </text>
          </g>
        )}


      </svg>
    </div>
  );
};
