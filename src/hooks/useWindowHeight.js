import { useState, useEffect } from 'react';
import isTouchDevice from "../utils/isTouchDevice";

const initialHeight = window.innerHeight <= 450 ? window.innerWidth : window.innerHeight;

export default () => {
  // SUBSCRIBE TO WINDOW HEIGHT
  // use some state
  const [height, setHeight] = useState(isTouchDevice() ? initialHeight : window.innerHeight);

  useEffect(() => {
    // handle function
    const handleResize = () => {
      if (!isTouchDevice()) {
        setHeight(window.innerHeight);
      } else {
        setHeight(initialHeight);
      }
    };
    // add listener
    window.addEventListener('resize', handleResize);

    // clean up phase
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return height;
}