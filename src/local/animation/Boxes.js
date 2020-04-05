import React from 'react'
import { useSprings, animated } from "react-spring";

const boxesGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "20px",
}

const box = {
  height: "20px",
  width: "20px",
}

const items = [0.1, 0.2, 0.3, 0.4, 0.5];

const Boxes = () => {

  const springs = useSprings(
    items.length,
    items.map(item => ({
      from: {
        opacity: 0, background: "teal", transform: "translate3d(0px, 0, 0)"
      },
      to: { opacity: item, background: "orange", transform: `translate3d(${item * 20}px, 0, 0)` }
    }))
  );

  return (
    <div style={boxesGrid}>
      <h3>Boxes</h3>
      {springs.map(animation => (
        <animated.div key={Math.random()} style={{ ...animation, ...box }} />
      ))}
    </div>
  )
}

export default Boxes
