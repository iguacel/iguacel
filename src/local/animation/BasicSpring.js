import React from "react";
import { useSpring, animated } from "react-spring";

const BasicSpring = () => {
  const animation = useSpring({
    config: { duration: 1250 },
    from: { opacity: 0 },
    opacity: 1
  });

  return (
    <animated.div
      style={{ ...animation, background: "RGBA(111, 222, 170, 1.00)" }}
      className="basicSpring center"
    >
      <h3 style={{ padding: "1em" }}>BasicSpring</h3>
    </animated.div>
  );
};

export default BasicSpring;

// https://coursehunters.net/course/animating-react
