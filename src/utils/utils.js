// ARRAY
// Returns an array with n elements where each is equal to its index
// https://observablehq.com/@makio135/utilities

export const array = n => new Array(n).fill(0).map((d, i) => i);


// Shuffle
export const shuffle = arr => {
  let tmpArray = [...arr]; // create a copy of original array
  for (let i = tmpArray.length - 1; i; i--) {
    let randomIndex = randomInt(i + 1);
    [tmpArray[i], tmpArray[randomIndex]] = [tmpArray[randomIndex], tmpArray[i]]; // swap
  }
  return tmpArray;
};

// RANDOM

export const randomInt = (a, b) => ~~random(a, b);

export const random = (a, b) => {
  if (!a && a !== 0) return Math.random();
  if (!b && b !== 0) return Math.random() * a;

  if (a > b) [a, b] = [b, a]; // swap values
  return a + Math.random() * (b - a);
};

export const randomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)]
}

// Random data
export const randomData = (n) => array(n).map((x, i) => {
  return { x: randomInt(0, 100), y: randomInt(0, 100) }
})

export const randomExp = (a, b, p = 2) => {
  if (!a && a !== 0) return Math.random() ** p
  if (!b && b !== 0) return (Math.random() ** p) * a

  if (a > b) [a, b] = [b, a] // swap values
  return a + (Math.random() ** p) * (b - a)
}

export const normalizeBetweenTwoRanges = (
  val,
  minVal,
  maxVal,
  newMin = 0,
  newMax = 1
) => {
  return newMin + ((val - minVal) * (newMax - newMin)) / (maxVal - minVal);
};

// Usage
// const res = normalizeBetweenTwoRanges(10, 0, 10, 0, 1);

export const clamp = (a, min, max) => (a < min ? min : a > max ? max : a);

export const lerp = (a, b, amount) => a + (b - a) * amount;

export const lerpPosition = (start, end, t) => {
  return {
    x: lerp(start.x, end.x, t),
    y: lerp(start.y, end.y, t)
  }
}

export const map = (n, a, b, c, d, clamped = false) =>
  clamped
    ? clamp(lerp(c, d, (n - a) / (b - a)), c, d)
    : lerp(c, d, (n - a) / (b - a));

// like lerp but for arrays
export const mix = (a, b, amount) =>
  a.length === b.length
    ? a.map((d, i) => lerp(a[i], b[i], amount))
    : "lengths not matching";

export const translate = (x, y, rotation) => `translate(${x}px, ${y}px) rotate(${rotation}deg)`

// Move first to last - (array) moveToEnd([1, 2, 3])
export const moveToEnd = ([first, ...rest]) => {
  return [...rest, first]
}

// Converts from degrees to radians.
export const degreesToRadians = (degrees) => {
  return degrees * Math.PI / 180;
}

// Converts from radians to degrees.
export const radiansToDegrees = (radians) => {
  return radians * 180 / Math.PI;
};

// DISTANCE
export const distance = (x1, y1, x2, y2) => {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}


// MATH
export const PI = Math.PI;
export const HALF_PI = Math.PI / 2;
export const TAU = Math.PI * 2;
export const QUARTER_PI = Math.PI / 4;
export const DEG_TO_RAD = Math.PI / 180;
export const RAD_TO_DEG = 180 / Math.PI;
export const goldenRatio = (1 + Math.sqrt(5)) / 2;


// FETCH
export const fetchJSON = async (uri) => {
  return await (await fetch(uri)).json();
};



// THREE

export const hexToRgbTree = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : null;
}