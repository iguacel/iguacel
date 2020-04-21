import React, { useState, useCallback, useContext, useMemo } from "react";
import { useTransition, animated } from "react-spring";
import useInterval from "../hooks/useInterval";
import ThemeContext from "../context/ThemeContext";
import LanguageContext from "../context/LanguageContext";

import { isSafari } from "../utils/browsers";

const viewStyles = {
  cursor: "pointer",
  willChange: "transform, opacity",
};

const moonPhases = [
  { id: "0", name: "New Moon", abr: "New", name_es: "Nueva", abr_es: "Nueva" },
  { id: "1", name: "Waxing Crescent", abr: "", name_es: "Creciente", abr_es: "" },
  { id: "2", name: "First quarter", abr: "First Quarter", name_es: "Cuarto creciente", abr_es: "Cuarto creciente" },
  { id: "3", name: "Waxing Gibbous", abr: "", name_es: "Gibosa creciente", abr_es: "" },
  { id: "4", name: "Full Moon", abr: "Full", name_es: "Llena", abr_es: "Llena" },
  { id: "5", name: "Waning Gibbous", abr: "", name_es: "Gibosa menguante", abr_es: "" },
  { id: "6", name: "Last Quarter", abr: "Last quarter", name_es: "Cuarto menguante", abr_es: "Cuarto menguante" },
  { id: "7", name: "Waning Crescent", abr: "", name_es: "Menguante", abr_es: "" },
];

const Moon = ({ x, y, fraction, angle, wh = 80 }) => {
  const light = "#F5F0E6";
  const dark = "gray";
  const r = wh / 2;
  const moonPhase = Math.trunc(fraction * 4) % 4; // %4 so fraction === 1 results in phase === 0
  const backgroundColor = moonPhase < 2 ? dark : light;
  const coverColor = moonPhase === 0 || moonPhase === 3 ? dark : light;
  const revealColor = moonPhase < 2 ? light : dark;
  const quarterFraction = +parseFloat(fraction % 0.25).toFixed(2);
  const snakeEyeClosing =
    r * 4 * (moonPhase % 2 === 1 ? 0 : 1 / 4 - quarterFraction);
  const snakeEyeOpening = r * 4 * (moonPhase % 2 === 0 ? 0 : quarterFraction);

  // https://observablehq.com/@martien/moon-phases

  return (
    <g
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${
          fraction * 360 - angle
          }deg) scale(0.8)`,
      }}
    >
      <circle fill={backgroundColor} r={r} />

      {!isSafari && (
        <g mask="url(#showRightHalf)">
          <circle fill={revealColor} r={r} />
          <ellipse fill={coverColor} ry={r} rx={snakeEyeClosing} />
        </g>
      )}

      {isSafari && (
        <g clip-path="url(#showRightHalf)">
          <circle fill={revealColor} r={r} />
          <ellipse fill={coverColor} ry={r} rx={snakeEyeClosing} />
        </g>
      )}

      <ellipse fill={revealColor} ry={r} rx={snakeEyeOpening} />
    </g>
  );
};

const Labels = ({ x, y, abr }) => {

  return (
    <text
      x={x}
      y={y}
      style={{ textAnchor: "middle", opacity: 0.5 }}
      fill="var(--foreground-color)"
    >
      {abr}
    </text>
  );
};

const FullLabels = ({ x, y, name, fr }) => {

  return (
    <text
      x={x}
      y={y - 40}
      style={{ textAnchor: "middle", opacity: 0.5 }}
      fill="var(--foreground-color)"
    >
      {name}

      <tspan x={x} y={y} dy={50}>
        {fr !== 0 ? fr.toFixed(2) : "0 - 1"}
      </tspan>
    </text>
  );
};

const genPoints = (length, radius) => {
  const step = (Math.PI * 2) / length;
  return moonPhases.map((x, i) => {
    return {
      ...x,
      x: -Math.cos(i * step) * radius,
      y: +Math.sin(i * step) * radius,
      xLabels: -Math.cos(i * step) * (radius - 80),
      yLabels: +Math.sin(i * step) * (radius - 80),
      fr: (1 / length) * i,
      angle: (1 / length) * i * 360,
    };
  });
};

export default () => {
  const [fraction, setFraction] = useState(0);
  const { dark } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const isEnglish = language.isEnglish;

  const [view, setView] = useState(0);
  const changeView = useCallback(() => setView((view) => (view + 1) % 3), []);

  const transitions = useTransition(view, (v) => v, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });

  useInterval(() => {
    if (fraction >= 0.99) {
      setFraction(0);
      return;
    }
    setFraction(fraction + 0.006);
  }, 60);

  const n = moonPhases.length;
  const r = 180;
  const points = useMemo(() => genPoints(n, r), [n]);

  const pages = [
    ({ style }) => (
      <animated.g style={{ ...style, ...viewStyles }}>
        <>
          <g
            style={{
              transform: `translate3d(calc(50% - 20px), calc(50% - 20px), 0)`,
              opacity: 0.5,
              cursor: "pointer",
            }}
          >
            <path
              id="click"
              fill="var(--foreground-color)"
              d="M27.8 22.5c.3-.3.7-.5 1.2-.5.4 0 .8.2 1.1.5.3.3.5.8.5 1.3V30c0 1.6-.3 2.9-.8 4s-1.4 1.9-2.5 2.4h-6.8c-1-.2-1.8-.6-2.4-1.4-.7-.7-1.4-1.8-2.1-3.2L11.7 24l.6-.6c.2-.2.4-.4.6-.5.3-.1.5-.2.8-.1.3 0 .6.1.9.3.3.2.6.4.9.8l1.7 2.3V13.9c0-.5.2-.9.5-1.2s.7-.5 1.2-.5.9.2 1.2.5c.3.3.5.7.5 1.2v7.3h.2c0-.4.1-.8.4-1.1.3-.3.6-.5 1.1-.5.4 0 .8.2 1.1.5s.5.7.5 1.1v1.3h.2c0-.5.2-.9.5-1.2s.7-.4 1.1-.4c.4 0 .8.1 1.1.4s.4.7.4 1.1v1.1h.2c0-.3.1-.7.4-1zM13.1 17c-.4-.9-.7-1.9-.7-3 0-3.9 3.2-7.1 7.1-7.1 3.9 0 7.1 3.2 7.1 7.1 0 1.1-.2 2.1-.7 3l2.8 2c.8-1.5 1.3-3.2 1.3-5 0-5.8-4.7-10.5-10.5-10.5C13.8 3.6 9.1 8.3 9.1 14c0 1.8.5 3.5 1.3 5l2.7-2z"
            />
          </g>

          <g
            className="rotateAll"
            style={{
              transform: `perspective(10px) translate3d(50%, 50%, 0) rotate(${
                -fraction * 360
                }deg)`,
              cursor: "pointer",
            }}
          >
            {points.map((x, i) => {
              return (
                <Moon
                  key={`moon${x.id}`}
                  x={x.x}
                  y={x.y}
                  fraction={x.fr + fraction}
                  angle={x.angle}
                />
              );
            })}
          </g>

          <g
            style={{
              transform: `translate3d(50%, 50%, 0)`,
            }}
          >
            {points.map((x, i) => {
              return (
                <Labels
                  key={`moonLabels${x.id}`}
                  x={x.xLabels}
                  y={x.yLabels}
                  name={isEnglish ? x.name : x.name_es}
                  abr={isEnglish ? x.abr : x.abr_es}
                />
              );
            })}
          </g>
        </>
      </animated.g>
    ),
    ({ style }) => (
      <animated.g style={{ ...style, ...viewStyles }}>
        <g
          style={{
            transform: `translate3d(50%, 50%, 0)`,
          }}
        >
          <Moon wh={220} x={500 / 2} y={500 / 2} fraction={fraction} />
          <text
            x={0}
            y={200}
            style={{
              textAnchor: "middle",
              opacity: 0.5,
              fontFeatureSettings: "tnum",
              fontVariantNumeric: "tabular-nums",
            }}
            fill="var(--foreground-color)"
          >
            <tspan x={0} y={160} dy={0}>
              {isEnglish ? "Fraction" : "Fracción"}
            </tspan>
            <tspan x={0} y={160} dy={30}>
              {" "}
              {fraction.toFixed(2)}
            </tspan>
          </text>
        </g>
      </animated.g>
    ),
    ({ style }) => (
      <animated.g style={{ ...style, ...viewStyles }}>
        <g>
          <g
            style={{
              transform: `translate3d(50%, 50%, 0)`,
            }}
          >
            {points.map((x, i) => {
              return (
                <FullLabels
                  key={`moonLabelsFull${x.id}`}
                  x={x.x}
                  y={x.y}
                  name={isEnglish ? x.name : x.name_es}
                  abr={isEnglish ? x.abr : x.abr_es}
                  fr={x.fr}
                />
              );
            })}

            {points.map((x, i) => {
              return (
                <Moon
                  key={`moonFull${x.id}`}
                  x={x.x}
                  y={x.y}
                  fraction={x.fr}
                  angle={x.angle}
                  wh={60}
                />
              );
            })}
          </g>
        </g>
      </animated.g>
    ),
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "column",
        zIndex: 3,
        width: "100%",
        height: "100vh",
        cursor: "pointer",
        background: dark ? "#0E1016" : "#77CCD2",
        border: `1px solid ${dark ? "#0E1016" : "#77CCD2"}`,
      }}
      onClick={changeView}
    >
      <svg
        style={{
          overflow: "visible",
          maxWidth: "600px",
        }}
        viewBox={`0 40 ${500} ${500}`}
      >
        <defs>
          {/* Chrome bug using clipPath*/}
          {!isSafari && (
            <mask id="showRightHalf">
              <rect
                y={-r}
                width="50%"
                height="100%"
                style={{ stroke: "none", fill: "#ffffff" }}
              />
            </mask>
          )}

          {isSafari && (
            <clipPath id="showRightHalf">
              <rect
                y={-r}
                width="50%"
                height="100%"
                style={{ stroke: "none", fill: "#ffffff" }}
              />
            </clipPath>
          )}
        </defs>
        <g>
          {transitions.map(({ item, props, key }) => {
            const Page = pages[item];
            return <Page key={key} style={props}></Page>;
          })}
        </g>
      </svg>
    </div>
  );
};
