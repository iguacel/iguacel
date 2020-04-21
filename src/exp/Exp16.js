import React, { useRef, useEffect } from "react";

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
      <Kanvas
        width={WIDTH}
        height={HEIGHT}
        draw={(canvas, ctx) => {
          ctx.fillStyle = "tomato";
          ctx.strokeStyle = "tomato";
          ctx.strokeRect(0, 0, WIDTH, HEIGHT);
          ctx.fillRect(WIDTH / 2 - 10, HEIGHT / 2 - 10, 20, 20);
        }}
      />
    </div>
  );
};

const Kanvas = ({ width, height, draw }) => {
  let canvasRef = useRef();

  const scale = (canvas, ctx) => {
    console.log(canvas);

    const ratio = window.devicePixelRatio || 1;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(ratio, ratio);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    scale(canvas, ctx);
    draw(canvas, ctx);
  })

  return (
    <canvas style={{ border: "1px solid white" }}
      ref={canvasRef}
      width={width}
      height={height}
    />
  );
}



class Canvas extends React.Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext("2d");

    this.scale();
    this.props.draw(this.canvas, this.ctx);
  }

  scale = () => {
    console.log(this.canvas);

    const ratio = window.devicePixelRatio || 1;

    this.canvas.width = this.props.width * ratio;
    this.canvas.height = this.props.height * ratio;

    this.canvas.style.width = `${this.props.width}px`;
    this.canvas.style.height = `${this.props.height}px`;

    this.ctx.scale(ratio, ratio);
  };

  render() {
    const { width, height } = this.props;

    return (
      <canvas
        ref={node => this.canvas = node}
        width={width}
        height={height}
      />
    );
  }
}
