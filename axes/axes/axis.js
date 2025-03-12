const svg = d3.select('svg');

svg.attr('width', 500).attr('height', 500).style('background-color', 'pink');

const SVG_WIDTH = svg.node().clientWidth;
const SVG_HEIGHT = svg.node().clientHeight;
const PADDING = 25;
const data = [23, 36, 67, 55, 49];

// Create a linear scale
const domain = [0, Math.max(...data)];
const range = [PADDING, SVG_HEIGHT - PADDING];
const dataScale = d3.scaleLinear()
    .domain(domain)
    .range(range);

// Create & render the left y-axis
const yAxisLeft = d3.axisLeft(dataScale);
const yAxisLeftG = svg.append('g').attr('id', 'yAxisLeftG');
yAxisLeft(yAxisLeftG);

// Shift right to show the ticks
yAxisLeftG.attr('transform', `translate(${PADDING}, 0)`);

// Create & render the right y-axis
const yAxisRight = d3.axisRight(dataScale);
const yAxisRightG = svg.append('g').attr('id', 'yAxisRightG');
yAxisRight(yAxisRightG);

// Shift to RHS of svg
yAxisRightG.attr('transform', `translate(${SVG_WIDTH - PADDING}, 0)`);

// Create top x-axis
const xAxisTop = d3.axisTop(dataScale);
const xAxisTopG = svg.append('g').attr('id', 'xAxisTopG');
xAxisTop(xAxisTopG);

// Shift down to show the ticks
xAxisTopG.attr('transform', `translate(0, ${PADDING})`);

// Create bottom x-axis
const xAxisBottom = d3.axisBottom(dataScale);
const xAxisBottomG = svg.append('g').attr('id', 'xAxisBottomG');
xAxisBottom(xAxisBottomG);

// Shift down to bottom
xAxisBottomG.attr('transform', `translate(0, ${SVG_HEIGHT - PADDING})`);

// Set tick marks on left y-axis
yAxisLeft.ticks(6);
yAxisLeft(yAxisLeftG);

// Set tick marks on bottom x-axis
xAxisBottom.ticks(4, '%');
xAxisBottom(xAxisBottomG);

// Set tick arguments on left y-axis
yAxisLeft.tickArguments([4]);
yAxisLeft(yAxisLeftG);

// Set tick arguments on bottom x-axis
xAxisBottom.tickArguments([6, '%']);
xAxisBottom(xAxisBottomG);

// Set tick format on bottom x-axis
xAxisBottom.tickFormat(d3.format(",.0"));
xAxisBottom(xAxisBottomG);

// Tick padding
yAxisLeft.tickPadding(10);
yAxisLeft(yAxisLeftG);

// Inner tick size (in middle of axis)
yAxisRight.tickSizeInner(10);
yAxisRight(yAxisRightG);

// Outer tick size (at the end of the axis)
xAxisBottom.tickSizeOuter(10);
xAxisBottom(xAxisBottomG);

// Tick size (both innner/outer)
yAxisLeft.tickSize(3);
yAxisLeft(yAxisLeftG);
