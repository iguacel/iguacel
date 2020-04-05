import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const SpringLine = ({ width, height }) => {
  const [on, toggle] = useState(true);

  const { color } = useSpring({
    color: on ? "gold" : "slategray",
  });

  return (
    <div style={{ border: "1px solid rebeccaPurple", padding: "1em" }}>
      <h3>SpringLine {on ? "on" : "off"}</h3>

      <svg
        style={{
          cursor: "pointer",
          overflow: "visible",
          border: "1px solid tomato"
        }}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
        onClick={() => toggle(!on)}
      >
        <animated.circle cx={10} cy={10} r={10} fill={color} />
      </svg>
    </div>
  );
};

export default SpringLine;
