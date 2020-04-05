import React, { useEffect, useState, useRef } from "react";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";

let dpr = window.devicePixelRatio || 1;

export default () => {
  const [ref, { width, height }] = useMeasure({
    polyfill: ResizeObserver,
  });
  const [hovered, setHover] = useState(false);
  const [xy, setXY] = useState([0, 0]);

  const canvas = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }); // Make sure the effect runs only once

  // Globals
  let mov = 1;

  let margin = { top: 200, right: 0, bottom: 60, left: 0 };

  const colors = {};

  class Obj {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
    }
    draw(ctx) {
      ctx.beginPath(ctx);
      ctx.rect(this.x, this.y, this.size, this.size);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
    update(ctx) {
      this.draw(ctx);
      // if () {
      //   this.animate(ctx);
      // }
    }
    animate(ctx) {
      // Call draw
      this.draw(ctx);
    }
  }

  // INIT
  let objects = [];

  const init = () => {
    // Objects
    new Array(2).fill().forEach((_, i) => {
      let size = 20;
      let x = width / 2;
      let y = height / 2;
      let color = "gold";
      objects.push(new Obj(x, y, size, color));
    });
  };

  // console.log(objects);

  init();

  // DRAW
  const animationLoop = () => {
    var ctx = canvas.current.getContext("2d");

    ctx.clearRect(0, 0, width, height); // clear canvas

    ctx.beginPath(ctx);
    ctx.rect(0, 0, width / 2, height / 2);
    ctx.fillStyle = "gold";
    ctx.fill();
    ctx.closePath();



    objects.forEach((x) => x.update(ctx));

    // Mov
    mov++;
    // Loop
    requestRef.current = requestAnimationFrame(animationLoop);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={({ clientX, clientY }) => setXY([clientX, clientY])}
      onClick={() => console.log("click")}
      style={{
        width: "100%",
        height: "100vh",
        margin: "0 auto",
        cursor: "pointer"
      }}
    >
      <canvas
        ref={canvas}
        width={width * dpr}
        height={height * dpr}
      />
    </div>
  );
};
