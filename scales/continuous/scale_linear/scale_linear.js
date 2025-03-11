/* Scale Linear */

const xScale1 = d3.scaleLinear([0, 100], [0, 25]);
// console.log(xScale1(80)); // 20

const xScale2 = d3.scaleLinear().domain([50, 100]);
// console.log(xScale2(70)); // 0.4

const xScale3 = d3.scaleLinear().domain([20, 80]).range([30, 50]);
// console.log(xScale3(81)); // 50.3333

const svg = d3.select('svg');
const svgWidth = svg.attr('width');
svg.selectAll('rect')
    .data([81])
    .join('rect')
    .attr('width', d => xScale3(d))
    .attr('height', 20)
    .attr('x', 0)
    .attr('y', 0);

/* Domain & Range */
const xScale4 = d3.scaleLinear().domain([20, 80]).range([0, svgWidth]);
svg.selectAll('rect')
    .data([81])
    .join('rect')
    .attr('width', d => xScale4(d))
    .attr('height', 20)
    .attr('x', 0)
    .attr('y', 0);

const xScale5 = d3.scaleLinear().domain([20, 80, 140]).range([0, 150, svgWidth]);

svg.selectAll('rect')
    .data([140])
    .join('rect')
    .attr('width', d => xScale5(d))
    .attr('height', 20)
    .attr('x', 0)
    .attr('y', 0);

const xScale6 = d3.scaleLinear().domain([20, 80, 140]).range(['red', 'green', 'blue']);

svg.selectAll('rect')
    .data([100])
    .join('rect')
    .attr('width', d => xScale5(d))
    .attr('height', 20)
    .attr('x', 0)
    .attr('y', 0)
    .style('fill', d => xScale6(d));


/* Invert */
const invert = xScale5.invert(300);
// console.log(invert);

/* Range Round */
const x1Scale = d3.scaleLinear().domain([10, 100]).rangeRound([40, 50]);
// console.log(x1Scale(10));   // 40
// console.log(x1Scale(10.5)); // 40

const x1Scale2 = d3.scaleLinear().domain([10, 100]).range([40, 50]);
// console.log(x1Scale2(10));   // 40
// console.log(x1Scale2(10.5)); // 40.0555

/* Clamp */
const xScale7 = d3.scaleLinear().domain([20, 40, 60]).range([0, 150, svgWidth]);
// console.log(xScale7(10)); // -75

xScale7.clamp(true);
// console.log(xScale7(10)); // 0

/* Unknown */
// console.log(xScale7(undefined)); // Undefined
xScale7.unknown('Error!');
// console.log(xScale7(undefined)); // Error!

/* Interpolate */
// RGB of rect goes from (0, 85, 85) to (0, 124, 120)
xScale6.interpolate(d3.interpolateHcl);

svg.selectAll('rect')
    .data([100])
    .join('rect')
    .attr('width', d => xScale5(d))
    .attr('height', 20)
    .attr('x', 0)
    .attr('y', 0)
    .style('fill', d => xScale6(d));

/* Ticks */
const ticks1 = xScale7.ticks();
// console.log(ticks1); // [20, 25, ... 55, 60]

const ticks2 = xScale7.ticks(5);
// console.log(ticks2); // [20, 30, 40, 50, 60]

const num = 6;
const xTicks = xScale7.ticks(num);
const xTickFormat = xScale7.tickFormat(num, '+');
const map = xTicks.map(xTickFormat);

// console.log(map); // ["+20", "+25", "+30", "+35", "+40", "+45", "+50", "+55", "+60"]

// d3.tickFormat(start, stop, count, ~specifier);
const d3TickFormat = d3.tickFormat(-12, 12, num, '-');

// console.log(d3TickFormat(-6.5)); // -7

const map2 = xTicks.map(d3TickFormat);

// console.log(map2); // ["2e+1", "3e+1", "3e+1", "4e+1", "4e+1", "5e+1", "5e+1", "6e+1", "6e+1"]

/* Nice */
const x2Scale = d3.scaleLinear()
    .domain([1.256, 7.345])
    .range([20, 40])

x2Scale.nice();

// console.log(x2Scale.ticks()); // [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5]

