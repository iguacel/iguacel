import { useState, useEffect } from 'react';

const useClientSize = () => {
   const [windowSize, setWindowSize] = useState({ width: document.body.clientWidth, height: window.innerHeight });

   useEffect(() => {
      window.addEventListener('resize', resizeHandler);
      return () => {
         window.removeEventListener('resize', resizeHandler);
      };
   });
   const resizeHandler = () => {
      setWindowSize({ width: document.body.clientWidth, height: window.innerHeight });
   };
   return windowSize;
};

export default useClientSize;