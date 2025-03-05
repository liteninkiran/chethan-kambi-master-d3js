const svg = d3.select('svg');

// Store the background colour, should be: rgba(0, 0, 0, 0)
const style = svg.style('background-color');

svg.attr('width', 300);
svg.attr('height', 300);

// To set the style, we can use either:
//  • attr('style', 'background-color: lightgrey;') ...OR...
//  • style('background-color', 'lightgrey');

svg.style('background-color', 'lightgrey');

// Remove style
svg.style('background-color', null);

// Store the ellipses
const ellipses = svg.selectChildren('ellipse');

// Set dimensions of each ellipse
ellipses.select(function (_d, i, _n) {
    d3.select(this)
        .attr('cx', `${i * 90 + 110}`)
        .attr('cy', `${i * 80 + 80}`)
        .attr('rx', `${i * 20 + 50}`)
        .attr('ry', `${i * 20 + 70}`);
});

// Change colour of ellipses
ellipses.style('fill', (_d, i, _n) => i === 0 ? 'red' : 'blue');
