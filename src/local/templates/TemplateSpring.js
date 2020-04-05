import React, { useState, useCallback } from "react";
import { useTransition, animated } from "react-spring";

const pageStyles = {
  cursor: "pointer",
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  willChange: "transform, opacity",
};

const pages = [
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightpink", ...pageStyles }}>
      <h1>A</h1>
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightblue", ...pageStyles }}>
      <h1>B</h1>
    </animated.div>
  ),
  ({ style }) => (
    <animated.div style={{ ...style, background: "lightgreen", ...pageStyles }}>
      <h1>C</h1>
    </animated.div>
  ),
];

export default function App() {
  const [view, setView] = useState(0);
  const changeView = useCallback(() => setView((view) => (view + 1) % 3), []);
  const transitions = useTransition(view, (v) => v, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });
  return (
    <div className="simple-trans-main" onClick={changeView}>
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item];
        return <Page key={key} style={props}></Page>;
      })}
    </div>
  );
}
