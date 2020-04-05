import { useState, useEffect } from 'react';

export default () => {
  // SUBSCRIBE TO WINDOW WIDTH
  // use some state
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    // handle function
    const handleResize = () => setWidth(window.innerWidth);
    // add listener
    window.addEventListener('resize', handleResize);
    // clean up phase
    return () => {
      window.removeEventListener('resize', handleResize)
    };
  });
  return width;
}