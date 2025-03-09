const svg = d3.select('svg');
const data1 = [10, 20, 30];
const data2 = [5, 10, 20, 30];
const data3 = [30, 50];
const data4 = ['blue', 'red'];
let circles = svg.selectAll('circle');
circles = circles.data(data1)
    .join('circle')
    .attr('cx', () => 50)
    .attr('cy', (d, i, n) => 50 + d + i * 50)
    .attr('r', (d, i, n) => d);

circles = circles.data(data2)
    .join('circle')
    .attr('cx', () => 50)
    .attr('cy', (d, i, n) => 50 + d + i * 50)
    .attr('r', (d, i, n) => d);

circles = circles.data(data3)
    .join('circle')
    .attr('cx', () => 50)
    .attr('cy', (d, i, n) => 50 + d + i * 50)
    .attr('r', (d, i, n) => d);

circles = circles.data(data4).join(
    enter => console.log(enter),
    update => update.style('fill', d => d),
    exit => console.log(exit),
);

console.log(circles);
