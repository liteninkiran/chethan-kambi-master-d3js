const svg = d3.select('svg');

svg.attr('width', '300').attr('height', '100');

const circles = svg.selectAll('circle')
    .data([20, 20, 20])
    .join('circle')
    .attr('cx', (d, i) => d + i * 40)
    .attr('cy', '50')
    .attr('r', d => d);

for(const el of circles) {
    console.log(el);
}

const circles2 = [...circles];

console.log(circles, circles2);
