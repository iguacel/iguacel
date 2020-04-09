// http://www.petecorey.com/blog/2019/08/19/animating-a-canvas-with-react-hooks/

// https://developpaper.com/on-the-solution-of-canvas-drawing-fuzzy-problem/

export const getPixelRatio = context => {
  var backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

  return (window.devicePixelRatio || 1) / backingStore;
};