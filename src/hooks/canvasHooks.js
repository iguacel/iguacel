import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  useCallback
} from "react";

/**
 *
 */

export const useWindowDimensions = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dimensions]);

  return dimensions;
};

const useAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  const frameRef = useRef();
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = useCallback(() => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;
    cb();
  }, [callbackRef]);

  useLayoutEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, [loop]);
};

export const useCanvas = dimensions => {
  const canvasRef = useRef();
  const renderCanvas = canvasRef => <canvas ref={canvasRef} />;
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.position = "absolute";
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.zIndex = -1;
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;
  }, [dimensions, canvasRef, tick]);
  useAnimationFrame(() => setTick(tick + 1));

  return [renderCanvas, canvasRef, tick];
};

export const useCanvasProgram = (canvasRef, program) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    program(ctx);
  });
};
