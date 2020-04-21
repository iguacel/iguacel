import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';


export default () => {
  const WIDTH = 200;
  const HEIGHT = 200;

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
      {/* <Kanvas
        width={WIDTH}
        height={HEIGHT}
        draw={(canvas, ctx) => {
          console.log(canvas);

          ctx.fillStyle = "tomato";
          ctx.strokeStyle = "tomato";
          ctx.strokeRect(0, 0, WIDTH, HEIGHT);
          ctx.fillRect(WIDTH / 2 - 10, HEIGHT / 2 - 10, 20, 20);
        }}
      /> */}

      <Canvas />
    </div>
  );
};

const Kanvas = ({ width, height, draw }) => {
  let canvas = useRef();


  return (
    <canvas style={{ border: "1px solid white" }}
      ref={canvas}
      width={width}
      height={height}
    />
  );
}



const Canvas = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const pixelRatio = window.devicePixelRatio;
  const ref = useRef(null);
  const canvas = useRef(null);

  // responsive width and height
  useEffect(() => {
    setWidth(ref.current.clientWidth);
    setHeight(ref.current.clientHeight);
  }, []);

  useLayoutEffect(() => {
    const ctx = canvas.current.getContext('2d');

    // some canvas stuff..
    ctx.fillStyle = "tomato";
    ctx.strokeStyle = "tomato";

    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)

    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.closePath();

    ctx.stroke()

    ctx.strokeRect(0, 0, width, height);
    ctx.fillRect(width / 2 - 10, height / 2 - 10, 20, 20);

  }, [width, height]);

  const displayWidth = Math.floor(pixelRatio * width);
  const displayHeight = Math.floor(pixelRatio * height);
  const style = { width, height };

  return (
    <div style={{ width: '100%', height: '100%', border: "1px solid white" }} ref={ref}>
      <canvas
        ref={canvas}
        width={displayWidth}
        height={displayHeight}
        style={style}
      />
    </div>
  );
}
