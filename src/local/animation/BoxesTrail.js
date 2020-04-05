import React, { useState } from 'react'
import { useTrail, animated } from "react-spring";

const boxesGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: "20px",
}

const box = {
  height: "20px",
  width: "20px",
  background: "teal",
  margin: "0 auto"
}

const items = [0.1, 0.2, 0.3, 0.4, 0.5];

const BoxesTrail = () => {
  const [on, toggle] = useState(false);

  const trail = useTrail(
    items.length,
    {
      opacity: on ? 1 : 0,
      transform: on ? "scale(1.2)" : "scale(1)"
    }
  );

  return (
    <div style={boxesGrid}>
      <h3>BoxesTrail</h3>
      <button onClick={() => toggle(!on)}>Toggle</button>
      {trail.map(animation => (
        <animated.div key={Math.random()} style={{ ...animation, ...box }} />
      ))}
    </div>
  )
}

export default BoxesTrail
