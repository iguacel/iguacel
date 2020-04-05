import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimatingKeyframes = () => {
  const [isToggled, setToggle] = useState(false);

  const { color, y } = useSpring({
    color: isToggled ? "gold" : "slategray",
    y: isToggled ? 0 : 1
  });

  return (
    <div className="animatingKeyframes center" style={{ margin: "1em 0", border: "1px solid orange", height: "320px" }}>
      <button onClick={() => setToggle(!isToggled)}>
        Toggle {isToggled ? "ON" : "OFF"}
      </button>

      <animated.h3
        style={{
          padding: "1em",
          color,
          transform: y
            .interpolate({
              range: [0, 0.25, 0.5, 0.75, 1],
              output: [0, -25, 0, 75, 100]
            })
            .interpolate(y => `translate3d(0,${y}px,0)`)
        }}
      >
        keyframes
      </animated.h3>

    </div>
  );
};

export default AnimatingKeyframes;
