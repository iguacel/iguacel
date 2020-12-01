import chroma from "chroma-js";

export const palette = [
  "#ec4977",
  "#ff8464",
  "#ffbe6b",
  "#fcf594",
  "#8cedad",
  "#00d6de",
  "#0cb4f5",
];

export const palette2 = [
  "#7F3C8D",
  "#11A579",
  "#3969AC",
  "#F2B701",
  "#E73F74",
  "#80BA5A",
  "#E68310",
  "#008695",
  "#CF1C90",
  "#f97b72",
  "#4b4b8f",
];

export const palette3 = [
  "#a6cee3",
  "#1f78b4",
  "#b2df8a",
  "#33a02c",
  "#fb9a99",
  "#e31a1c",
  "#fdbf6f",
  "#ff7f00",
  "#cab2d6",
];

export const palette4 = ["#1b1f3a", "#53354a", "#a64942", "#ff7844"];
export const palette4b = ["#212121", "#323232", "#0d7377", "#14ffec"];

export const palette4c = [
  "#5e1a77",
  "#842e70",
  "#a3456b",
  "#be5e69",
  "#d5796a",
  "#e8966e",
  "#f6b577",
  "#fdd686",
  "#faf99d",
];

export const palette4d = [
  "#2b1e31",
  "#39354d",
  "#464e63",
  "#546875",
  "#638485",
  "#74a191",
  "#87be98",
  "#9fdc9a",
  "#bef992",
];

export const palette4dlight = [
  "#75657b",
  "#7d7590",
  "#82879f",
  "#849ba8",
  "#88afaa",
  "#8fc2a8",
  "#9bd5a2",
  "#aae79b",
  "#bef992",
];

export const palette5 = [
  "#80E0BA",
  "#F3CBBC",
  "#F2D54E",
  "#B398F0",
  "#D98F00",
  "#5598CE",
];

export const palette6 = [
  "#1b1f3a",
  "#442d42",
  "#6e3a45",
  "#994643",
  "#be5843",
  "#da7141",
  "#f08f3b",
  "#fcb12e",
  "#ffd700",
];

export const palette6Order = [
  "#f08f3b",
  "#1b1f3a",
  "#fcb12e",
  "#442d42",
  "#da7141",

  "#6e3a45",
  "#ffd700",

  "#be5843",
];

export const paletteOriginal = [
  "#88BE5A",
  "#51AA56",
  "#E77F3D",
  "#603812",
  "#479078",
  "#A64D5C",
  "#C1272C",
  "#E5584F",
  "#AC42A6",
  "#EFBF36",
  "#477BBC",
  "#E98482",
  "#EBA23E",
  "#9D7649",
  "#B0A595",
  "#544E4B",
];

export const tertiary = [
  chroma("#90103F").brighten(2).hex(),
  chroma("#511849").brighten(2).hex(),
  chroma("#3D3D6B").brighten(1).hex(),
  "#427B9B",
  "#5FBAAD",
  "#61C785",
  "#ADD45B",
  "#EDDD53",
  "#EFC309",
  "#E88C20",
  "#E45536",
  "#C71138",
];

export const colors = {
  bg: {
    dark: "#1A1B1E",
    light: "#FFFFFF",
  },
  highlight: {
    dark: "white",
    light: "#2C2E35",
  },
  lines: {
    dark: "#544E4B",
    light: "#B0A595",
  },
  r: "#E2170D",
  g: "#50A18A",
  b: "#65BCD6",
  y: "#ECAC05",
  na: "#E2170D",
  sa: "#29574F",
  eu: "blue",
  af: "#780235",
  as: "#E2170D",
  oc: "green",
  intensity: {
    r: 0.2,
    g: 0.4,
    b: 0.6,
    y: 0.8,
  },
};

export const tertiaryDark = tertiary.map((x) => {
  return chroma(x).darken(0.5).hex();
});

// console.log(tertiaryDark);

export const tertiaryLight = tertiary.map((x) => {
  return chroma(x).brighten(2).hex();
});

export const palette6Light = tertiary.map((x) => {
  return chroma(x).darken(0.4).hex();
});

// console.log(tertiaryDark, tertiaryLight);
