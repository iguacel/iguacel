import React, { useEffect, useState, useRef, useContext } from "react";
// Data
import { cas, linksId } from "../data/caaSpain";
// D3
import { select } from "d3-selection";
import { forceX, forceY, forceSimulation, forceLink } from "d3-force";
import { scaleSqrt, scaleLinear, scaleTime } from "d3-scale";
import { area, line, curveBasis } from "d3-shape";
import { csvParse } from "d3-dsv";
// Etc
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { animated, useSpring } from "react-spring";
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";
// Comp
import Canvas from "./comp/Canvas";

// MAP
const Map = ({
  // ignore-prettier
  width = 900,
  height = 900,
  setSelected,
  setIsOpen,
  data,
}) => {
  const refSvg = useRef();

  const radiusScale = scaleSqrt().domain([0, 10000]).range([5, 310]);

  const nodes = cas.map((x) => {
    return {
      ...x,
      area: radiusScale(data[x.id].deaths[data[x.id].deaths.length - 1]),
    };
  });

  useEffect(() => {
    const svg = select(refSvg.current);

    const collision = () => {
      const padding = 10;
      for (let k = 0, iterations = 4, strength = 0.5; k < iterations; ++k) {
        for (let i = 0, n = nodes.length; i < n; ++i) {
          for (let a = nodes[i], j = i + 1; j < n; ++j) {
            let b = nodes[j],
              x = a.x + a.vx - b.x - b.vx,
              y = a.y + a.vy - b.y - b.vy,
              lx = Math.abs(x),
              ly = Math.abs(y),
              r = a.area / 2 + b.area / 2 + padding;
            if (lx < r && ly < r) {
              if (lx > ly) {
                lx = (lx - r) * (x < 0 ? -strength : strength);
                a["vx"] -= lx;
                b["vx"] += lx;
              } else {
                ly = (ly - r) * (y < 0 ? -strength : strength);
                a["vy"] -= ly;
                b["vy"] += ly;
              }
            }
          }
        }
      }
    };

    const simulation = forceSimulation(nodes)
      .force(
        "link",
        forceLink(linksId)
          .id((d) => d.id)
          .distance(0)
          .strength(0.0025)
          .iterations(6)
      )
      .force("x", forceX((d) => d.x).strength(0.1))
      .force("y", forceY((d) => d.y).strength(0.1))
      .force("collide", collision);

    for (let i = 0; i < 120; ++i) {
      simulation.tick();
    }

    simulation.on("tick", () => {
      const rect = svg
        .selectAll("g")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", (d) => `translate(${d.x}, ${d.y})`);

      // Rect
      rect
        .append("rect")
        .attr("width", (d) => d.area)
        .attr("height", (d) => d.area)
        .attr("x", (d) => -d.area / 2)
        .attr("y", (d) => -d.area / 2)
        .attr("fill", "var(--foreground-color)")
        // .attr("stroke", "var(--background-color)")
        .style("cursor", "pointer");

      rect.on("click", (d) => {
        setSelected({ ...d, ...data[d.id] });
        setIsOpen(true);
      });

      // Text
      rect
        .append("text")
        .style("font-size", `22px`)
        .style("fill", "var(--background-color)")
        .style("pointer-events", "none")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("dy", (d) => {
          return d.area > 90 ? -15 : "";
        })
        .text((d) => (d.area > 30 ? d.sim : ""));

      rect
        .append("text")
        .style("font-weight", `700`)
        .style("font-size", `26px`)
        .style("pointer-events", "none")
        .style("fill", "var(--background-color)")
        .style("opacity", "0.5")
        .attr("text-anchor", "middle")
        .attr("dy", 15)
        .attr("dominant-baseline", "middle")
        .text((d) => {
          return d.area > 90 ? data[d.id].total : "";
        });
    });
  }, [nodes]);

  return (
    <>
      <svg
        ref={refSvg}
        style={{
          width: "100%",
          overflow: "visible",
        }}
        viewBox={`0 0 ${width} ${height}`}
      >
        {/* Canarias */}
        <polyline
          stroke="var(--foreground-color)"
          fill="none"
          points="0,745 175,745 175,900"
          style={{ opacity: "0.5", strokeDasharray: "4 2" }}
        />
      </svg>
    </>
  );
};

const Tip = ({ selected, dates, colors, isOpen, setIsOpen, dark }) => {
  const size = 50;

  const [ref, bounds] = useMeasure({ polyfill: ResizeObserver });

  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  const tipAnimation = useSpring({
    opacity: isOpen ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
  });

  // Data
  const maxYScale = Math.max(...selected.deaths);
  const maxIndex = selected.deaths.indexOf(maxYScale);
  const maxDate = dates[maxIndex];
  const maxNumber = selected.deaths[maxIndex];

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
        height: "390px",
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
          {selected?.name}
        </p>
        <div
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
        className="tooltipGraph"
        style={{ margin: "1em", height: "230px" }}
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
            {isEnglish ? "Quarantine" : "Cuarentena"}
            <br />
            {new Date(new Date("2020-03-15"))
              .toLocaleString(language.id)
              .split(" ")[0]
              .replace(",", "")}
          </p>

          <p style={{ textAlign: "right" }}>
            {isEnglish ? "Deaths:" : "Muertes:"}
            <br />
            <strong>{selected.total}</strong>
          </p>
        </div>

        <TooltipCanvas
          dates={dates}
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
          {new Date(dates.upd)
            .toLocaleString(language.id)
            .split(" ")[0]
            .replace(",", "")}
          .
        </p>
      </div>
    </animated.div>
  );
};

const TooltipCanvas = ({
  selected,
  width,
  height,
  colors,
  dark,
  maxYScale,
  dates,
}) => {
  // color
  const foreground = dark
    ? "RGBA(255, 255, 255, 0.8)"
    : "RGBA(26, 27, 30, 0.6)";

  // d3
  const margin = { top: 50, right: 0, left: 50, bottom: 40 };

  const xScale = scaleTime()
    .domain([dates.dates[0], dates.upd])
    .range([0, width - margin.right - margin.left]);

  const yScaleLinear = scaleLinear()
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
      this.first = dates.dates[0];
      this.deaths = selected.deaths;
    }

    draw(ctx) {
      const areaGen = area()
        .y0(height - margin.top - margin.bottom)
        .curve(curveBasis)
        .context(ctx);

      const lineGen = line().context(ctx);

      ctx.beginPath();

      ctx.translate(margin.left, margin.top);

      ctx.fillStyle = colors.bg;

      areaGen(
        this.deaths.map((point, i) => {
          return [xScale(dates.dates[i]), yScaleLinear(point)];
        })
      );

      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = colors.main;
      ctx.lineWidth = 3;
      ctx.beginPath();

      lineGen(
        this.deaths.map((point, i) => {
          return [xScale(dates.dates[i]), yScaleLinear(point)];
        })
      );

      ctx.stroke();

      ctx.lineWidth = 0.5;
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
    let tickCount = width / 150;
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
    let tickCount = 3;
    let ticks = yScaleLinear.ticks(tickCount);
    let tickFormat = yScaleLinear.tickFormat(tickCount);

    ctx.beginPath();
    ticks.forEach(function (d) {
      ctx.moveTo(-margin.left, yScaleLinear(d));
      ctx.lineTo(width - margin.left - margin.right, yScaleLinear(d));
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
      ctx.fillText(tickFormat(d), -margin.left, yScaleLinear(d) - 20);
    });

    ctx.save();
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.restore();
  };

  const legendLines = (ctx) => {
    const legendTop = 10;

    ctx.strokeStyle = foreground;

    let quarantine = new Date("2020-03-15");

    ctx.beginPath();
    ctx.moveTo(-margin.left, -margin.top + legendTop);
    ctx.lineTo(xScale(quarantine), -margin.top + legendTop);
    ctx.lineTo(xScale(quarantine), height - margin.top - margin.bottom);
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

// MAIN
export default () => {
  const [data, setData] = useState(null);
  const [dates, setDates] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const closeTip = () => {
    setSelected(null);
    isOpen(false);
  };

  const { dark } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  // DATA
  // Force

  useEffect(() => {
    const fetchData = () => {
      const uri =
        "https://raw.githubusercontent.com/datadista/datasets/master/COVID%2019/ccaa_covid19_fallecidos.csv";
      fetch(uri)
        .then((res) => (res.ok ? res.text() : Promise.reject(res.status)))
        .then((text) => csvParse(text))
        .then((data) => {
          const format = data.reduce((acc, x, i, arr) => {
            const ca = x["CCAA"];
            const cod = x["cod_ine"];
            const key = `c${cod}`;
            // delete
            delete x["CCAA"];
            delete x["cod_ine"];
            // save dates
            if (i === 0) {
              const dates = [...Object.keys(x)].map((x) => new Date(x));
              setDates({ dates, upd: dates[dates.length - 1] });
            }
            // array
            const deaths = [...Object.values(x)].map((x) => +x);

            acc[key] = {
              key,
              cod,
              ca,
              deaths,
              total: deaths[deaths.length - 1],
            };
            return acc;
          }, {});
          // save data
          setData(format);
          setIsLoaded(true);
        });
    };

    fetchData();
  }, []);

  // Colors
  const colors = {
    bg: dark ? "RGBA(234, 234, 234, 0.20)" : "RGBA(26, 27, 30, 0.10)",
    main: dark ? "RGBA(234, 234, 234, 1.00)" : "RGBA(26, 27, 30, 1.00)",
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {isLoaded && data && dates && (
        <Map
          data={data}
          closeTip={closeTip}
          setSelected={setSelected}
          setIsOpen={setIsOpen}
          language={language}
        />
      )}

      {isLoaded && selected && dates && (
        <Tip
          dates={dates}
          selected={selected}
          closeTip={closeTip}
          colors={colors}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dark={dark}
        />
      )}
    </div>
  );
};
