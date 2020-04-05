import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimatingInterpolate = () => {
  const [isToggled, setToggle] = useState(false);

  const { color, y } = useSpring({
    color: isToggled ? "gold" : "slategray",
    y: isToggled ? -30 : 30
  });

  return (
    <div
      className="animatingInterpolate center"
      style={{ border: "1px solid gold", margin: "1em 0", height: "250px" }}
    >
      <button
        style={{ width: "180px", zIndex: 999 }}
        onClick={() => setToggle(!isToggled)}
      >
        Toggle {isToggled ? "ON" : "OFF"}
      </button>

      <animated.h3
        style={{
          padding: "1em",
          color,
          transform: y.interpolate(y => `translate3d(0,${y}px,0)`)
        }}
      >
        AnimatingInterpolate
      </animated.h3>
    </div>
  );
};

export default AnimatingInterpolate;
