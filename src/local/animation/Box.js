import React from "react";
import { animated, useSpring } from "react-spring";

const Box = () => {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));

  // const bind = useGesture(({ down, delta }) => {
  //   set({ xy: down ? delta : [0, 0] });
  // });

  return (
    <>
      <button onClick={() => set({ xy: [-40, 0] })}>-40</button>
      <button onClick={() => set({ xy: [40, 0] })}>+40</button>
      <animated.div
        className="center"
        style={{
          transform: xy.interpolate((x, y) => `translate3d(${x}px, ${y}px, 0)`),
          background: "teal",
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
    </>
  );
};

export default Box;
