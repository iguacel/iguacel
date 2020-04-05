import React from "react";
import { animated, useSpring } from "react-spring";

const Box = () => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));


  return (
    <animated.div
      className="center"
      style={{
        transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`),
        opacity: x.interpolate({
          map: Math.abs,
          range: [0, 400],
          output: [1, 0]
        }),
        background: "black",
        width: "200px",
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "1em auto"
      }}
    >
      <h3 className="pm white">Box</h3>
    </animated.div>
  );
};

export default Box;
