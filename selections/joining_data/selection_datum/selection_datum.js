const circles = d3.selectAll('circle');
const radius = 25;
const datum = circles.datum(radius);

// console.log(datum);
// console.log(circles.datum(null)); // __data__ does not show in the properties

circles.datum((d, i, n) => (i + 1) * 15);

console.log(datum);

circles.attr('r', d => d);
