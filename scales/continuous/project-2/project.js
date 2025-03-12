const svg = d3.select('#chart svg');

const SVG_WIDTH = svg.node().clientWidth;
const SVG_HEIGHT = svg.node().clientHeight;
const DATA = [66, 67, 64, 63, 62, 60, 57, 68, 70, 69, 63, 57];
const DATA_LENGTH = DATA.length;

svg.attr('viewBox', `0 -${SVG_HEIGHT} ${SVG_WIDTH} ${SVG_HEIGHT}`);

const COLOUR_SCALE =
    d3.scaleLinear()
        .domain([Math.min(...DATA), Math.max(...DATA)])
        .range(['skyblue', 'orange']);

const X_TIME_SCALE =
    d3.scaleTime()
        .domain([new Date(2019, 0), new Date(2019, `${DATA_LENGTH - 1}`)])
        .range([30, SVG_WIDTH - 30]);

const Y_SCALE =
    d3.scaleLinear()
        .domain([Math.min(...DATA), Math.max(...DATA)])
        .range([50, SVG_HEIGHT - 50]);

svg.selectAll('cicrle')
    .data(DATA)
    .join('circle')
    .attr('cx', (d, i) => X_TIME_SCALE(new Date(2019, i)))
    .attr('cy', d => -Y_SCALE(d))
    .attr('r', d => d / 5)
    .attr('fill', d => COLOUR_SCALE(d));

const monthNames = X_TIME_SCALE.ticks(12).map(X_TIME_SCALE.tickFormat(12, '%b'));

svg.selectAll('text')
    .data(DATA)
    .join('text')
    .text((d, i) => `${monthNames[i]}`)
    .attr('x', (d, i) => X_TIME_SCALE(new Date(2019, i)))
    .attr('y', 15 - SVG_HEIGHT)
    .attr('fill', d => COLOUR_SCALE(d))
    .style('text-anchor', 'middle')
    .style('font-size', '13')
    .style('font-weight', '500');
