const data = [
    [0, 30],
    [40, 90],
    [140, 120],
    [250, 70]
];
const lineGen = d3.line().curve(d3.curveCardinal);
const linePathData = lineGen(data);

d3.select('#chart1')
    .selectAll('path')
    .data([linePathData])
    .join('path')
    .attr('d', d => d)
    .style('stroke', 'blue')
    .style('fill', 'none')
    .style('stroke-width', '2');

const areaGen = d3.area().curve(d3.curveBasisOpen);
const areaPathData = areaGen(data);

d3.select('#chart2')
    .selectAll('path')
    .data([areaPathData])
    .join('path')
    .attr('d', d => d)
    .style('fill', 'red');

/*
d3.curveLinear (default)
d3.curveLinearClosed
d3.curveLinearOpen
d3.curveNatural
d3.curveStep
d3.curveStepAfter
d3.curveStepBefore
d3.curveBasis
d3.curveBasisClosed
d3.curveBasisOpen
d3.curveBundle
d3.curveCardinal
d3.curveCardinalOpen
d3.curveCardinalClosed
d3.curveMonotoneX
d3.curveMontoneY
*/
