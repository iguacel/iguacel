import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const AnimatingTransitionArray = () => {

  const [items, setItems] = useState([
    { letter: "A", key: 1 },
    { letter: "B", key: 2 },
    { letter: "C", key: 3 }
  ]);

  const animation = useTransition(items, item => item.key, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  return (
    <div
      className="animatingTransition center"
      style={{
        margin: "1em 0",
        border: "1px solid slategray"
      }}
    >
      <button style={{ zIndex: 999 }} onClick={() => setItems({ letter: "A", key: 1 })}>
        setItems
      </button>

      {animation.map(({ item, key, props }) =>
        <animated.h3
          key={key}
          style={{
            ...props,
            padding: "1em",
            width: "100%",
            background: "RGBA(111, 222, 170, 1.00)",
            fontSize: "6em",
            color: "white",
            fontWeight: "600"
          }}
        >
          {item.letter}
        </animated.h3>
      )
      }
    </div>
  );
};

export default AnimatingTransitionArray;
