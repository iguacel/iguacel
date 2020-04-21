import React from "react";

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
        ref={(node) => (this.canvas = node)}
        width={width}
        height={height}
      />
    );
  }
}

export default Canvas;
