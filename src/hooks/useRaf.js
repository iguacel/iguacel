import React, { useRef, useEffect } from 'react';

export default (onFrame) => {
  const requestRef = useRef();
  const startTimeRef = useRef();
  const callback = (time) => {
    if (!startTimeRef.current)
      startTimeRef.current = time;
    const progress = time - startTimeRef.current;
    onFrame(progress);
    requestRef.current = requestAnimationFrame(callback);
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(callback);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
}