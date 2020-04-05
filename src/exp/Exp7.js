import React, { useEffect, useRef, useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import useDimensions from "react-use-dimensions";
import { distance, random } from "../utils/utils";
import { resolveCollision } from "../utils/util-elastic-collision";

export default () => {
  // Refs
  const [ref, { width, height }] = useDimensions();
  const { dark } = useContext(ThemeContext);

  const canvas = useRef(null);
  const canvas2 = useRef(null);
  const requestRef = useRef();

  // Globals
  let particles = [];
  let radius = 6;
  let n = 200;

  const colors = {
    sick: dark ? "RGBA(245, 190, 28, 1.00)" : "RGBA(226, 80, 59, 1.00)",
    well: "gray",
    foreground: dark ? "RGBA(255, 255, 255, 1.00)" : "RGBA(26, 27, 30, 1.00)",
    background: dark ? "" : "RGBA(228, 230, 234, 0.7)",
  };

  // Effect
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animation);
    return () => cancelAnimationFrame(requestRef.current);
  });

  // Objects
  function Particle(x, y, radius, state) {
    this.x = x;
    this.y = y;
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    };
    this.radius = radius;
    this.mass = 1;
    this.state = state;
    this.color = "gray";

    this.draw = function (ctx) {
      ctx.beginPath(ctx);
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = colors[this.state];
      ctx.fill();
      ctx.closePath();
    };

    this.update = function (ctx, particles) {
      this.draw(ctx);

      // Collision
      for (let i = 0; i < particles.length; i++) {
        if (this === particles[i]) continue;

        // Collision
        if (
          distance(this.x, this.y, particles[i].x, particles[i].y) -
          radius * 2 <
          0
        ) {
          resolveCollision(this, particles[i]);

          // State change
          if (this.state === "sick" || particles[i].state === "sick") {
            this.state = "sick";
            particles[i].state = "sick";
          }
        }
      }

      // Wall x
      if (this.x - this.radius <= 0 || this.x + this.radius >= width) {
        this.velocity.x = -this.velocity.x;
      }

      // Wall y
      if (this.y - this.radius <= 0 || this.y + this.radius >= height) {
        this.velocity.y = -this.velocity.y;
      }

      this.x += this.velocity.x;
      this.y += this.velocity.y;
    };
  }

  // Init
  for (let i = 0; i < n; i++) {
    let x = random(radius, width - radius);
    let y = random(radius, height - radius);

    if (particles.length >= 1) {
      for (var j = 0; j < particles.length; j++) {
        if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0) {
          x = random(radius, width - radius);
          y = random(radius, height - radius);
        }
      }
    }

    particles.push(
      new Particle(
        i === 0 ? width / 2 : x,
        i === 0 ? height / 2 : y,
        radius,
        i === 0 ? "sick" : "well"
      )
    );
  }

  // Animation loop
  const animation = () => {
    let ctx = canvas.current.getContext("2d");
    let ctx2 = canvas2.current.getContext("2d");

    // SIMULATION
    ctx.clearRect(0, 0, width, height); // clear canvas
    ctx2.clearRect(0, 0, width, 100); // clear canvas

    particles.forEach(particle => particle.update(ctx, particles));

    // TEXT
    const sick = particles.filter(particle => particle.state === "sick").length;
    const well = n - sick;

    ctx2.font = "20px Inter";
    ctx2.fillStyle = "white";
    ctx2.textAlign = "left";

    // CLAVE
    ctx2.beginPath(ctx);
    ctx2.arc(35, 42, 8, 0, Math.PI * 2);
    ctx2.fillStyle = colors.sick;
    ctx2.fill();

    ctx.restore();

    ctx2.fillStyle = colors.foreground;

    ctx2.beginPath(ctx);
    ctx2.arc(35, 73, 8, 0, Math.PI * 2);
    ctx2.fillStyle = colors.well;
    ctx2.fill();

    ctx.restore();

    ctx2.fillStyle = colors.foreground;

    ctx2.fillText(`Sick: ${sick}`, 55, 50);
    ctx2.fillText(`Well: ${well}`, 55, 80);

    // End text
    requestRef.current = requestAnimationFrame(animation);
  };

  return (
    <div style={{
      width: "100%",
    }}>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "60vh",
          borderBottom: `1px solid ${colors.foreground}`,
        }}
      >
        <canvas ref={canvas} width={width} height={height} />

        <canvas ref={canvas2} width={width} height={"150px"} />
      </div>
    </div>
  );
};
