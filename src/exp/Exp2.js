import React, { useMemo, useContext } from "react";
import { array, randomInt } from "../utils/utils";
import { hexbin } from "d3-hexbin";
import { scaleLinear } from "d3-scale";
import { Polygon } from "@vx/shape";
import chroma from "chroma-js";
import { useMeasure } from "react-use";
import ThemeContext from "../context/ThemeContext";

export default function ({
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}) {
  const [ref, { width, height }] = useMeasure();

  const { dark } = useContext(ThemeContext);

  const palette = dark
    ? chroma.scale(["#fafa6e", "#2A4858"]).mode("lch").colors(100)
    : chroma.scale(["#5AE5DD", "#AA4B9C"]).mode("lch").colors(100);

  const radius = 40;
  const n = Math.ceil(width / 12);
  const data = array(n).map((x, i) => {
    return { x: randomInt(0, 100), y: randomInt(0, 100) };
  });

  const xScale = scaleLinear()
    .domain([0, 100])
    .range([0, width - (margin.left + margin.right)]);

  const yScale = scaleLinear()
    .domain([0, 100])
    .range([0, height - (margin.top + margin.bottom)]);

  const hex = useMemo(() => {
    return hexbin()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y))
      .radius(radius)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);
  });

  const bins = useMemo(() => hex(data), [hex, data]);

  return (
    <div ref={ref} style={{ background: "#0D0C19" }}>
      <svg
        style={{ overflow: "visible" }}
        width="100%"
        height="100vh"
        viewBox={`0 0 ${width} ${height}`}
      >
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="25" result="noisy" />
        </filter>

        <rect
          filter="url(#noise)"
          style={{ opacity: 0.2 }}
          width={width}
          height={height}
          fill="transparent"
        />

        <g
          style={{
            transform: `translate(${margin.right}px, ${margin.top}px) `,
          }}
        >
          {bins.map((x, i) => {
            return (
              <g key={`polygon${i}`}>
                <defs>
                  <linearGradient
                    id={`grad${i}`}
                    x1={"0%"}
                    y1="90%"
                    x2="100%"
                    y2={`${randomInt(0, 100)}%`}
                  >
                    <stop
                      offset="0%"
                      style={{
                        stopColor: palette[randomInt(1, palette.length)],
                        stopOpacity: 0.9,
                      }}
                    />
                    <stop
                      offset="100%"
                      style={{
                        stopColor: chroma(
                          palette[randomInt(1, palette.length)]
                        ).darken(),
                        stopOpacity: 1,
                      }}
                    />
                  </linearGradient>

                  <pattern
                    id={`pattern${i}`}
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle
                      cx={randomInt(0, 12)}
                      cy={randomInt(0, 12)}
                      r={randomInt(0, 12)}
                      fill="#999"
                    />
                  </pattern>

                  <mask
                    id={`pattern-mask${i}`}
                    x="0"
                    y="0"
                    width="1"
                    height="1"
                  >
                    <rect
                      x="0"
                      y="0"
                      width={"100%"}
                      height={"100%"}
                      fill={`url(#pattern${i})`}
                    />
                  </mask>
                </defs>
                <Polygon
                  mask={`url(#pattern-mask${i})`}
                  style={{
                    transformOrigin: `50% 50%`,
                  }}
                  sides={6}
                  size={radius * 1.75}
                  key={`polygon${i}`}
                  center={{ x: x.x, y: x.y }}
                  fill={`url(#grad${i})`}
                />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
