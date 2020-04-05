import { scaleBand, scaleLinear } from "@vx/scale"

const bandScale = scaleBand({
  rangeRound: [-100, 100],
  domain: [0, 1, 2, 3, 4, 5, 6, 7, 8],
  padding: 0
});

const xScale = scaleLinear()
  .domain([0, 100]) // unit: ???
  .range([0, width - (margin.left + margin.right)]) // unit: pixels

const yScale = scaleLinear()
  .domain([0, 100]) // unit: ???
  .range([0, height - (margin.top + margin.bottom)]) // unit: pixels