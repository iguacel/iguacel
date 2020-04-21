import React, { useEffect, useContext, useCallback, useRef } from "react";
import useEventListener from "../hooks/useEventListener";
import useSmallSize from "../hooks/useSmallSize";
import ThemeContext from "../context/ThemeContext";

export default () => {
  const size = useSmallSize();
  const canvas = useRef(null);
  const requestRef = useRef();
  const { dark } = useContext(ThemeContext);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animationLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }); // Make sure the effect runs only once

  // Ball
  const ballRadius = 10;
  let dx = 4;
  let dy = -4;
  let x = size / 2;
  let y = size - 200;

  // Paddle
  let paddleHeight = 20;
  let paddleWidth = 75;
  let paddleX = size / 2;
  let paddleY = 100;

  // Controls
  let rightPressed = false;
  let leftPressed = false;

  // Bricks
  let brickRowCount = 4;
  let brickColumnCount = 4;
  let brickWidth = 75;
  let brickHeight = 20;
  let brickPadding = 10;
  let brickOffsetTop = 100;
  let brickOffsetLeft =
    size / 2 -
    ((brickWidth + brickPadding) * brickColumnCount) / 2 +
    brickPadding / 2;

  // State
  let score = 0;
  let lives = 3;

  // Handlers
  const handleKeyDown = useCallback(({ keyCode }) => {
    if (keyCode === 39) {
      rightPressed = true;
    } else if (keyCode === 37) {
      leftPressed = true;
    }
  }, []);

  const handleKeyUp = useCallback(({ keyCode }) => {
    if (keyCode === 39) {
      rightPressed = false;
    } else if (keyCode === 37) {
      leftPressed = false;
    }
  }, []);

  function handleMouse({ clientX }) {
    let relativeX = clientX - canvas.current.offsetLeft;
    if (relativeX > 0 && relativeX < size) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  // Add event listener using our hook
  useEventListener("keydown", handleKeyDown);
  useEventListener("keyup", handleKeyUp);
  useEventListener("mousemove", handleMouse);

  function collisionDetection() {
    for (c = 0; c < brickColumnCount; c++) {
      for (r = 0; r < brickRowCount; r++) {
        let b = bricks[c][r];
        if (b.status === 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            score++;
            if (score === brickRowCount * brickColumnCount) {
              console.log("YOU WIN");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function drawScore(ctx) {
    ctx.font = "bold 30px Inter";
    ctx.fillStyle = colors.main;
    ctx.fillText(score, 35, 40);
  }
  function drawLives(ctx) {
    ctx.fillText(lives, size - 65, 40);
  }

  // Colors
  const colors = {
    main: dark ? "RGBA(228, 230, 234, 1.00)" : "RGBA(62, 62, 62, 1.00)",
  };

  let bricks = [];
  for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  const drawBall = (ctx) => {
    ctx.beginPath();
    ctx.fillStyle = colors.main;
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  };

  const drawPaddle = (ctx) => {
    ctx.beginPath();
    ctx.rect(paddleX, size - paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = colors.main;
    ctx.fill();
    ctx.closePath();
  };

  const drawBricks = (ctx) => {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
          let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fillStyle = colors.main;
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  };

  // DRAW
  const animationLoop = () => {
    const ctx = canvas.current.getContext("2d");

    // Scale
    const ratio = window.devicePixelRatio || 1;

    canvas.current.width = size * ratio;
    canvas.current.height = size * ratio;

    canvas.current.style.width = `${size}px`;
    canvas.current.style.height = `${size}px`;

    ctx.scale(ratio, ratio);


    ctx.clearRect(0, 0, size, size); // clear canvas

    drawBall(ctx);
    drawPaddle(ctx);
    drawBricks(ctx);
    collisionDetection();
    drawScore(ctx);
    drawLives(ctx);

    // Mov
    x += dx;
    y += dy;

    if (x + dx > size - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }
    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy + paddleY > size - ballRadius) {
      // Paddle
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        lives--;
        if (!lives) {
          console.log("GAME OVER");
          document.location.reload();
        } else {
          x = size / 2;
          y = size / 2;
          dx = 3;
          dy = -3;
          paddleX = (size - paddleWidth) / 2;
        }
      }
    }

    if (rightPressed && paddleX < size - paddleWidth) {
      paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
      paddleX -= 7;
    }

    // console.log(y > size - paddleY)

    // Loop
    requestRef.current = requestAnimationFrame(animationLoop);
  };

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
      <canvas
        style={{
          size: "100%",
          border: `${paddleHeight}px solid ${colors.main}`,
        }}
        ref={canvas}
        width={size}
        height={size}
      />
    </div>
  );
};
