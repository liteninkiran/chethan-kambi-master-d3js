const h1Ele = d3.select('h1');
console.log(h1Ele.classed('gray')); // returns false

// To set the class, we can use either:
//  • attr('class', 'gray') ...OR...
//  • classed('gray', true);

h1Ele.classed('gray', true);
console.log(h1Ele.classed('gray')); // returns true

// Find all lines
const lines = d3.selectAll('line');

// Set a class on all lines
lines.classed('gray', true);

console.log(lines.classed('gray')); // returns true

// Remove class on all lines (the class attribute remains but has no value)
lines.classed('gray', false);

// Remove the class attribute from the elements entirely
lines.attr('class', null);

// Add classes
lines.classed('stroke-width stroke-opacity', true);

// Conditionally add classes
lines.classed('stroke-dasharray', (_d, i, _n) => i % 2 === 0);
