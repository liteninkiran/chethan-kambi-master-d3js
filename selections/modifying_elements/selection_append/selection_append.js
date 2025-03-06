// Select the "title" div
const titleDiv = d3.select('#title');

// Create a <h1> element
const heading = titleDiv.append('h1').text('Append');

const rectsData = [
    {
        x: '10',
        y: '10',
        width: '50',
        height: '30',
    },
    {
        x: '10',
        y: '50',
        width: '50',
        height: '30',
    },
];

// Select the other div
const svgDiv = d3.select('#svg')

// Create SVG element
const svg = svgDiv.append('svg');

// Set width / height
svg.attr('width', '300').attr('height', '300');

rectsData.forEach((rectData) => {
    svg.append('rect')
        .attr('x', rectData.x)
        .attr('y', rectData.y)
        .attr('width', rectData.width)
        .attr('height', rectData.height);
});


