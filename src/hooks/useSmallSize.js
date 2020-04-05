import { useState, useEffect } from 'react';

function useSmallSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return isClient ? window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth : undefined;
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default useSmallSize;