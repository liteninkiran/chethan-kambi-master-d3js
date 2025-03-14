const svg = d3.select('#chart1 svg');
const filename = 'IBM_March_2020.csv';

const BUFFER = 35;
const WIDTH = document.querySelector('svg').clientWidth - BUFFER;
const HEIGHT = document.querySelector('svg').clientHeight - BUFFER;

const init = (d) => ({
    date: new Date(d.Date),
    close: Number(d.Close),
});

const drawAxisX = (data) => {
    const xScale = d3.scaleTime().domain([data[0].date, data[data.length - 1].date]).range([BUFFER, WIDTH]).nice();
    const xAxis = d3.axisBottom(xScale).ticks(15, '%d %b');
    const xAxisGroup = svg.append('g').attr('id', 'xAxis').attr('transform', `translate(0,${HEIGHT})`);
    xAxis(xAxisGroup);
    return xScale;
}

const drawAxisY = (data) => {
    const maxClose = d3.max(data, (d) => d.close);
    const yScale = d3.scaleLinear().domain([maxClose, maxClose / 2]).range([BUFFER, HEIGHT]).nice();
    const yAxis = d3.axisLeft(yScale).ticks(10, d3.format('$'))
    const yAxisGroup = svg.append('g').attr('id', 'yAxis').attr('transform', `translate(${BUFFER},0)`);
    yAxis(yAxisGroup);
    return yScale;
}

const getLine = (xScale, yScale) => d3.line()
    .x(d => xScale(d.date))
    .y(d => yScale(d.close))
    .curve(d3.curveMonotoneX);

const drawLine = (data, line) => svg.append('g')
    .attr('id', 'lineChart')
    .selectAll('path')
    .data([data])
    .join('path')
    .attr('d', line)
    .style('fill', 'none')
    .style('stroke-width', '1.5')
    .style('stroke', 'cornflowerblue')
    .node()
    .getTotalLength();

const animateLine = (pathLength) => d3.select('#lineChart path')
    .style('stroke-dasharray', pathLength)
    .style('stroke-dashoffset', pathLength)
    .transition()
    .duration(3000)
    .style('stroke-dashoffset', 0);

const addCircles = (data, xScale, yScale) => svg.append('g')
    .attr('id', 'lineChartDots')
    .selectAll('circle')
    .data(data)
    .join('circle')
    .attr('cx', d => xScale(d.date))
    .attr('cy', d => yScale(d.close))
    .style('fill', 'cornflowerblue');

const animateCircles = () =>
    d3.select('#lineChartDots')
        .selectAll('circle')
        .each((_d, i, n) => d3.select(n[i])
            .transition()
            .delay(100 * (i + 1))
            .duration(1000)
            .attr('r', '3')
        );

const getLabels = (data, xScale, yScale) => svg.append('g')
    .attr('id', 'lineChartText')
    .selectAll('text')
    .data(data)
    .join('text')
    .attr('x', d => xScale(d.date))
    .attr('y', d => yScale(d.close) - 10)
    .style('fill', (_d, i) => i === 0
        ? 'gray'
        : data[i].close - data[i - 1].close > 0
            ? 'seagreen'
            : 'tomato')
    .style('text-anchor', 'start')
    .style('font-size', '9')
    .style('font-weight', '600');

const animateLabels = () => d3.select('#lineChartText')
    .selectAll('text')
    .each((_d, i, n) => d3.select(n[i])
        .transition()
        .delay(100 * (i + 1))
        .duration(1000)
        .text(d => d3.format('.2f')(d.close))
    )
    .raise();

const drawChart = (data) => {
    // Axes
    const xScale = drawAxisX(data);
    const yScale = drawAxisY(data);

    // Line
    const pathLength = drawLine(data, getLine(xScale, yScale));
    animateLine(pathLength);

    // Circles
    addCircles(data, xScale, yScale);
    animateCircles();

    // Labels
    getLabels(data, xScale, yScale);
    animateLabels();
}

d3.csv(filename, init).then(drawChart);
