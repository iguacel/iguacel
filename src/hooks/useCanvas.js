import { useRef, useEffect } from "react";

import drawSpirograph from "../utils/spiro";

// Hook
function useCanvas(draw, context = "2d") {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext(context);
    let animationFrameId = requestAnimationFrame(renderFrame);

    function renderFrame() {
      animationFrameId = requestAnimationFrame(renderFrame);

      ctx.strokeStyle = "lime";

      drawSpirograph(ctx, 500 / 2, 500 / 2, 90, 40, 21);
      drawSpirograph(ctx, 500 / 2, 500 / 2, 16, 16, 12);

      draw(ctx);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [context, draw]);

  return canvasRef;
}

export default useCanvas;
