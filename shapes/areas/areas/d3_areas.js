// areas are just like lines except that the region under the line is covered 
// or filled. So there is a top line (just like the line chart)  but there is 
// also a bottom line, which usually runs along the x-axis. And the region 
// between the lines depicts some sort of measure or indication.

// d3.area(x(optional), y0(optional), y1(optional))

const areaGenerator = d3.area();

const data1 = [
    [0, 100],
    [200, 130],
    [240, 80],
];
const areaPathData = areaGenerator(data1);

const svg = d3.select('svg');

const drawArea = () => svg.append('g')
    .attr('id', 'group1')
    .selectAll('path')
    .data([areaPathData])
    .join('path')
    .attr('id', 'path1')
    .attr('d', areaPathData)
    .attr('fill', 'none')
    .attr('stroke', 'black');

const drawCurvedArea = () => svg.append('g')
    .attr('id', 'group2')
    .selectAll('path')
    .data([data1])
    .join('path')
    .attr('id', 'path2')
    .attr('d', d3.area(d => d[0] + 10, d => 10, d => d[1] + 10).curve(d3.curveBasis))
    .style('stroke', 'red')
    .style('stroke', 'blue')
    .style('fill', 'none');

const drawMirroredArea = () => svg.append('g')
    .attr('id', 'group3')
    .attr('transform', 'translate(0, 400)')
    .selectAll('path')
    .data([data1])
    .join('path')
    .attr('id', 'path2')
    .attr('d', d3.area(d => d[0] + 10, d => -10, d => -(d[1] + 10)))
    .style('stroke', 'green')
    .style('fill', 'none');

drawArea();
drawCurvedArea();
drawMirroredArea();
