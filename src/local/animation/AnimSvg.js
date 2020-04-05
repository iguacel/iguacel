import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimSvg = ({ width, height, margin, id, full }) => {
  const [isToggled, setToggle] = useState(false);

  const { color, r, shape } = useSpring({
    color: isToggled ? "gold" : "slategray",
    r: isToggled ? 100 : 10,
    shape: isToggled
      ? "M20,20 L20,200 L200,200 L200,20 L20,20 Z"
      : "M10, 10 L10,180 L180,180 L180,20 L20,20 Z"
  });

  const op = useSpring({
    config: { duration: 1500 },
    from: { opacity: 0 },
    opacity: 1
  });

  return (
    <div className="animSvg center">
      <h3>AnimSvg</h3>
      <button style={{}} onClick={() => setToggle(!isToggled)}>
        Toggle {isToggled ? "ON" : "OFF"}
      </button>
      <svg
        style={{ overflow: "visible", border: "1px solid slategray" }}
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <animated.circle
          style={op}
          cx={width / 2}
          cy={height / 2}
          r={r.interpolate(r => r)}
          fill={color}
        />
        <animated.text
          style={{ textAnchor: "middle" }}
          x="300"
          y={height - 100}
          fontSize="25"
          fill={color}
        >
          {r}
        </animated.text>

        <animated.path d={shape.interpolate(shape => shape)} />
      </svg>
    </div>
  );
};

export default AnimSvg;
