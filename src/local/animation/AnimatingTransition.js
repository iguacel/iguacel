import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import { useMeasure } from "react-use";

const AnimatingTransition = () => {
  const [isToggled, setToggle] = useState(false);
  const [ref, { height, top }] = useMeasure();

  const animation = useTransition(isToggled, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <>
      <div
        className="animatingTransition center"
        style={{
          margin: "1em 0",
          border: "1px solid orange",
        }}
      >
        <button style={{ zIndex: 999 }} onClick={() => setToggle(!isToggled)}>
          Toggle {isToggled ? "ON" : "OFF"}
        </button>

        {animation.map(
          ({ item, key, props }) =>
            item && (
              <animated.h3 ref={ref} key={key} style={{ ...props, padding: "1em" }}>
                AnimatingTransition
            </animated.h3>
            )
        )}
      </div>
      {height}

    </>
  );
};

export default AnimatingTransition;

// https://coursehunters.net/course/animating-react
