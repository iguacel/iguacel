import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import { useMeasure } from "react-use";

const Accordion = () => {
  const [on, toggle] = useState(false);
  const [ref, { height, top }] = useMeasure();

  const animation = useSpring({ height: on ? height + top * 2 : 0 });


  return (
    <div
      className="center"
      style={{ border: "1px solid teal", width: "400px", overflow: "hidden" }}
    >
      <button onClick={() => toggle(!on)}>Toggle Accordion</button>
      <animated.div style={animation}>
        <div ref={ref} style={{ background: "teal", padding: "1em", width: "200px", margin: "0 auto" }}>
          <p className="pm">Hello, i'm in the accordion. And my fucking height is variable as fuck</p>
        </div>
      </animated.div>
    </div>
  );
};

export default Accordion;
