import React from "react";
import Canvas from "./comp/Canvas.js";
import useRaf from "../hooks/useRaf";

export default () => {
  const WIDTH = 200;
  const HEIGHT = 200;

  const [count, setCount] = React.useState(0)
  useRaf(progress => setCount(progress / 300));

  const animation = (canvas, ctx) => {
    ctx.fillStyle = 'gold';
    ctx.arc(
      WIDTH / 2,
      HEIGHT / 2,
      (WIDTH / 2) * Math.abs(Math.cos(count)),
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = "tomato";
    ctx.strokeStyle = "tomato";
    ctx.strokeRect(0, 0, WIDTH, HEIGHT);
    ctx.fillRect(WIDTH / 2 - 10, HEIGHT / 2 - 10, 20, 20);
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Canvas
        width={WIDTH}
        height={HEIGHT}
        draw={(canvas, ctx) => animation(canvas, ctx)}
      />
    </div>
  );
};