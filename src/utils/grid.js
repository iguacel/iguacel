export const makeGrid = n =>
  new Array(n * n).fill(0).map((d, i) => ({
    id: i,
    isEven: i % 2 === 0,
    x: i % n,
    y: Math.floor(i / n),
    row: (i % n),
    col: Math.floor(i / n)
  }));

