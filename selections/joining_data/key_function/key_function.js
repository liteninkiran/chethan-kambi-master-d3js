const data1 = [10, 15, 20];
const data2 = [10, 20];
const svg = d3.select('svg');

let circles = svg.selectAll('circle')
    .data(data1, d => d.toString())
    .join('circle')
    .attr('cx', (d, i) => d + i * 30)
    .attr('cy', '100')
    .attr('r', d => d);

console.log(circles);

circles = svg.selectAll('circle')
    .data(data2, d => d.toString())
    .join('circle')
    .attr('cx', (d, i) => d + i * 30)
    .attr('cy', '100')
    .attr('r', d => d);

console.log(circles);

