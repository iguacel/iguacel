// return first while bool is true
export const getColor = (bool, colors = ["white", "#282828"]) => {
  console.log(bool)
  if (colors.dark && colors.light) {
    return bool ? colors.dark : colors.light;
  }
  if (colors[0] && colors[1]) {
    return bool ? colors[0] : colors[1];
  }
}

export const palette = {
  foregroundColor: {
    dark: "white",
    light: "#282828",
  },
  red: {
    dark: "orange",
    light: '#cc7b32',
  }
}


// These are from d3-scale.
// "Viridis",
// "Inferno",
// "Magma",
// "Plasma",
// "Warm",
// "Cool",
// "Rainbow",
// "CubehelixDefault"


// These are from d3-scale-chromatic
// "Blues",
// "Greens",
// "Greys",
// "Oranges",
// "Purples",
// "Reds",
// "BuGn",
// "BuPu",
// "GnBu",
// "OrRd",
// "PuBuGn",
// "PuBu",
// "PuRd",
// "RdPu",
// "YlGnBu",
// "YlGn",
// "YlOrBr",
// "YlOrRd"

