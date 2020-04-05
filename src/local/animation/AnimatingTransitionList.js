import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const AnimatingTransitionList = () => {
  const [isToggled, setToggle] = useState(true);

  const animation = useTransition(isToggled, null, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <div
      className="animatingTransition center"
      style={{
        margin: "1em 0",
        border: "1px solid orange",
        position: "relative",
        height: "250px"
      }}
    >
      <button style={{ zIndex: 999 }} onClick={() => setToggle(!isToggled)}>
        Toggle {isToggled ? "ON" : "OFF"}
      </button>

      {animation.map(({ item, key, props }) =>
        item ? (
          <animated.h3
            key={key}
            style={{
              ...props,
              padding: "1em",
              width: "100%",
              background: "RGBA(111, 222, 170, 1.00)"
            }}
          >
            Hello
          </animated.h3>
        ) : (
            <animated.h3
              key={key}
              style={{
                ...props,
                padding: "1em",
                width: "100%",
                background: "slategray"
              }}
            >
              World
          </animated.h3>
          )
      )}
    </div>
  );
};

export default AnimatingTransitionList;

// https://coursehunters.net/course/animating-react
