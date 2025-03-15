// x = angle and y = radius
// .x() and .y() functions become the .angle() and .radius() accessor functions; x value has to be in radians
// .angle() returns the angle in radians, with 0 at -y (12 o’clock)
// .radius() returns the radius: the distance from the origin ⟨0,0⟩
// Radial lines are always positioned relative to ⟨0,0⟩; we need to use transform
// .curve() - default is d3.curveLinear, Note that curveMonotoneX or curveMonotoneY are not recommended for radial lines

const svg = d3.select('svg');

const drawCentrePoint = () => svg.append('circle')
    .attr('cx', '200')
    .attr('cy', '200')
    .attr('r', '5');

const drawLine1 = () => {
    const radialLine = d3.lineRadial();

    const data1 = [
        [0, 50],
        [46, 50],
        [80, 150],
        [150, 110],
        [210, 170],
        [270, 90],
        [320, 180],
        [360, 50],
    ];

    const radialPathData = radialLine(data1);
    
    const g1 = d3.select('svg')
        .append('g')
        .attr('id', 'chart1')
        .attr('transform', 'translate(200, 200)');
    
    g1.selectAll('path')
        .data([radialPathData])
        .join('path')
        .attr('d', d => d)
        .style('fill', 'none')
        .style('stroke', 'black');
}

const drawLine2 = () => {
    const data2 = [
        [0, 50],
        [30, 100],
        [60, 150],
        [90, 80],
        [120, 40],
        [150, 110],
        [180, 70],
        [210, 170],
        [240, 120],
        [270, 90],
        [300, 150],
        [330, 200],
        [360, 50],
    ];
    
    const g2 = d3.select('svg')
        .append('g')
        .attr('id', 'chart2')
        .attr('transform', 'translate(200, 200)');
    
    g2.selectAll('path')
        .data([data2])
        .join('path')
        .attr('d', d3.lineRadial()
            .angle(d => d[0] * (Math.PI / 180))
            .curve(d3.curveLinear)
            // .curve(d3.curveNatural)
        )
        .style('fill', 'none')
        .style('stroke', 'dodgerblue')
        .style('stroke-width', '2');
}

drawCentrePoint();
// drawLine1();
drawLine2();

