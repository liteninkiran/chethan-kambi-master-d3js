// d3.arc()
// pie chart or donut chart

const props = {
    startAngle: 0,
    endAngle: Math.PI * 2,
    innerRadius: 50,
    outerRadius: 100,
}

const d3Arc = d3.arc();
const arcGen = d3Arc(props);

d3.select('svg')
    .append('g', 'path1')
    .selectAll('path')
    .data([arcGen])
    .join('path')
    .attr('d', d => d);

const data = [
    {
        startAngle: 0,
        endAngle: Math.PI / 2,
        innerRadius: 50,
        outerRadius: 100,
    },
    {
        startAngle: Math.PI / 2,
        endAngle: Math.PI,
        innerRadius: 50,
        outerRadius: 100,
    },
    {
        startAngle: Math.PI,
        endAngle: Math.PI * 1.5,
        innerRadius: 50,
        outerRadius: 100,
    },
    {
        startAngle: Math.PI * 1.5,
        endAngle: Math.PI * 2,
        innerRadius: 50,
        outerRadius: 100,
    },
];

const path = d3.select('svg')
    .append('g')
    .attr('id', 'path2')
    .attr('transform', 'translate(200,200)');

path.append('circle')
    .attr('cx', '0')
    .attr('cy', '0')
    .attr('r', '3');

path.selectAll('path')
    .data(data)
    .join('path')
    .attr('d', d3Arc
        .innerRadius(d => d.innerRadius)
        .outerRadius(d => d.outerRadius)
        .startAngle(d => d.startAngle)
        .endAngle(d => d.endAngle)
        .padAngle(0.03)
        .padRadius(100)
    )
    .style('fill', (_d, i) => d3.schemeTableau10[i]);

data.forEach((arc) => {
    let [x, y] = d3Arc.centroid({
        innerRadius: arc.innerRadius,
        outerRadius: arc.outerRadius,
        startAngle: arc.startAngle,
        endAngle: arc.endAngle
    });
    path.append('text')
        .text(Math.round(arc.startAngle))
        .attr('x', x)
        .attr('y', y)
        .style('text-anchor', 'middle');
});
