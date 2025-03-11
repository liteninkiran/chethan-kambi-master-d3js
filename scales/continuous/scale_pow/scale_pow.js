let powerScale = d3.scalePow();
let linearScale = d3.scaleLinear();

// console.log(powerScale(4)); // 4
// console.log(linearScale(4)); // 4

// .exponent()
powerScale.exponent(2);

// console.log(powerScale(4)); // 16
// console.log(linearScale(4)); // 4

// .domain() and .range()
powerScale.domain([2, 4]).range([9, 10]);
linearScale.domain([2, 4]).range([9, 10]);

// console.log(powerScale(2.1)); // 9.0341666
// console.log(linearScale(2.1)); // 9.05

// console.log(powerScale(3)); // 9.41666
// console.log(linearScale(3)); // 9.5

// .invert()
const invert = powerScale.invert(9.5);
// console.log(invert); // 3.162277...

// .rangeRound() and .copy()
const powerScaleCopy = powerScale.copy();
powerScaleCopy.rangeRound([11, 12]);
// console.log(powerScaleCopy(3)); // 11

// .clamp()
let hasClamp = powerScale.clamp();
// console.log(hasClamp); // false
// console.log(powerScale(1)); // 8.75

hasClamp = powerScale.clamp(true);
// console.log(powerScale(1)); // 9

// .unknown()
powerScale.unknown('No Power');
// console.log(powerScale(undefined)); // No Power

// .interpolate(interploate_variable)
const colourPow = d3.scalePow()
    .exponent(1.5)
    .domain([10, 20, 30])
    .range(['pink', 'green', 'yellow'])
    .interpolate(d3.interpolateHcl);

// console.log(colourPow(11)); // rgb(252, 181, 184)

const colourLinear = d3.scaleLinear()
    .domain([10, 20, 30])
    .range(['pink', 'green', 'yellow'])
    .interpolate(d3.interpolateHcl);

// console.log(colourLinear(11)); // rgb(251, 179, 180)


// .ticks(~count)
let ticks = powerScale.ticks();
// console.log(ticks); // [2, 2.2, 2.4...]

// .tickFormat(count, ~specifier)
ticks = powerScale.ticks(5);
const tickFormat = powerScale.tickFormat(5, '%');
const map = ticks.map(tickFormat);

// console.log(map); // ['200%', '250%', '300%', '350%', '400%']

// .nice()
let powerScale1 = d3.scalePow()
    .domain([2.345, 4.163])
    .range([2, 5]);

const normalTicks = powerScale1.ticks();
powerScale1.nice();
const niceTicks = powerScale1.ticks();

// console.log(normalTicks); // [2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4]
// console.log(niceTicks); // [2.2, 2.4, 2.6, 2.8, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.2]


const radius = [7, 8, 9];
const radPower = d3.scalePow().exponent(2);

d3.select('svg')
    .attr('width', 300)
    .attr('height', 300)
    .selectAll('circle')
    .data(radius)
    .join('circle')
    .attr('cx', 150)
    .attr('cy', 150)
    .attr('r', d => radPower(d))
    .style('fill-opacity', '50%');




