// Data from Google Trends on D3.js search for Jan 2020 to March 2020
// Not sure about the units
// -----
const DATA = [64, 71, 21, 62, 62, 83, 41, 40, 60, 60, 49, 38, 84];
let START_DATE = new Date(2020, 0, 5);
const END_DATE = new Date(2020, 2, 29);

const SVG = d3.select('svg');
const SVG_WIDTH = SVG.node().clientWidth;
const SVG_HEIGHT = SVG.node().clientHeight;
const BUFFER = 25;

// Domains & Ranges
const colourDomain = [Math.round(d3.mean(DATA))];
const colourRange = ['#AED6F1', '#2874A6'];

const xDomain = [new Date(START_DATE.setDate(START_DATE.getDate() - 7)), new Date(END_DATE.setDate(END_DATE.getDate() + 7))];
const xRange = [BUFFER, SVG_WIDTH - BUFFER];

const yDomain = [Math.max(...DATA), 0];
const yRange = [BUFFER, SVG_HEIGHT - BUFFER];

// Scales
const colourScale = d3.scaleThreshold().domain(colourDomain).range(colourRange);
const yAxisScale = d3.scaleLinear().domain(yDomain).range(yRange);
const xAxisScale = d3.scaleTime().domain(xDomain).range(xRange);

// Y Axis
const yAxis = d3.axisLeft(yAxisScale)
    .tickSizeOuter(0)
    .tickSizeInner(3)
    .ticks(12);

const yAxisG = SVG.append('g').attr('id', 'yAxisG');

yAxis(yAxisG);

yAxisG.attr('transform', `translate(${BUFFER},0)`);

// X Axis
const xAxis = d3.axisBottom(xAxisScale)
    .tickSizeOuter(0)
    .tickSizeInner(3)
    .ticks(DATA.length, "%m/%d")
    .tickPadding(8);

const xAxisG = SVG.append('g').attr('id', 'xAxisG');

xAxis(xAxisG);

xAxisG.attr('transform', `translate(0,${SVG_HEIGHT - BUFFER})`);

// Bars
const endDate = new Date(2020, 2, 29);
const scaleDiff = xAxisScale(END_DATE) - xAxisScale(endDate);
const maxBarWidth = Math.floor(scaleDiff) - 2;

DATA.forEach((count) => SVG.append('g').attr('class', 'pair').data([count]));

const pairG = d3.selectAll('.pair');

pairG.each((d, i, n) => 
    d3.select(n[i])
        .selectAll('rect')
        .data(d => [d])
        .join('rect')
        .attr('width', maxBarWidth)
        .attr('height', () => SVG_HEIGHT - BUFFER - yAxisScale(d) - 1)
        .attr('x', () => xAxisScale(new Date(START_DATE.setDate(START_DATE.getDate() + 7))) - maxBarWidth / 2)
        .attr('y', () => yAxisScale(d))
        .attr('rx', '2')
        .attr('ry', '2')
        .style('fill', d => colourScale(d))
);

// RESET START DATE TO BEGIN
START_DATE = new Date(2019, 11, 29);

pairG.each((d, i, n) =>
    d3.select(n[i])
        .selectAll('text')
        .data(d => [d])
        .join('text')
        .text(d => d)
        .attr('x', () => xAxisScale(new Date(START_DATE.setDate(START_DATE.getDate() + 7))))
        .attr('y', () => yAxisScale(d) - 5)
        .style('fill', 'gray')
        .style('text-anchor', 'middle')
        .style('font-size', '12')
        .style('font-weight', '600')
);

document.querySelector('#note p').innerHTML = `Note: Y-Axis is the count | X-Axis is the week | Average search count for the period was: <b>${Math.round(d3.mean(DATA))}</b>`;
document.querySelector('#below').style.backgroundColor = colourScale(56);
document.querySelector('#above').style.backgroundColor = colourScale(57);
