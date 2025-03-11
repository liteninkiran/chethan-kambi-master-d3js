const svg = d3.select('svg');

console.log(svg);
// to convert to DOM related syntax
console.log(svg.node());
// node is usually used for one element
console.log(svg.selectAll('rect'));
// to convert to DOM related syntax
console.log(svg.selectAll('rect').nodes());
