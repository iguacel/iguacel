import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const ToggleSpring = () => {
  const [isToggled, setToggle] = useState(true);

  const animation = useSpring({
    opacity: isToggled ? 1 : 0
  });

  return (
    <div className="toggleSpring center" style={{ border: "1px solid slategray", margin: "1em 0" }}>
      <button style={{ width: "180px" }} onClick={() => setToggle(!isToggled)}>
        Toggle {isToggled ? "ON" : "OFF"}
      </button>
      <animated.h4 style={{ padding: "1em", ...animation }}>
        ToggleSpring
      </animated.h4>
    </div>
  );
};

export default ToggleSpring;
