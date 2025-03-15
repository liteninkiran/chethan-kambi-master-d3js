d3.csv('data.csv', d => {
    return {
        industry: d.Industry,
        percentage: Number(d.Percentage)
    }
}).then(data => {
    const SVG_WIDTH = d3.select('#chart svg').node().clientWidth;
    const SVG_HEIGHT = d3.select('#chart svg').node().clientHeight;
    const CUMSUM = d3.cumsum(data, d => d.percentage);
    const SUM = d3.sum(data, d => d.percentage);

    data.forEach((obj, index) => {
        obj.startAngle = index == 0
            ? 0
            : (CUMSUM[index - 1] / SUM * Math.PI * 2);
        obj.endAngle = CUMSUM[index] / SUM * Math.PI * 2;
        obj.innerRadius = SVG_WIDTH / 2 * 0.1;
        obj.outerRadius = SVG_WIDTH / 2 * 0.85;
        obj.id = index;
    });

    const DOUNT_G = d3.select('#chart svg')
        .append('g')
        .attr('id', 'donutG')
        .attr('transform', `translate(${SVG_WIDTH / 2},${SVG_HEIGHT / 2})`);

    d3.select('#donutG')
        .selectAll('path')
        .data(data)
        .join('path')
        .attr('d', d3.arc()
            .innerRadius(d => d.innerRadius)
            .outerRadius(d => d.outerRadius)
            .startAngle(d => d.startAngle)
            .endAngle(d => d.endAngle)
            .padAngle(0.01)
            .cornerRadius(5)
        )
        .style('fill', (d, i) => d3.schemeTableau10[i]);

    data.forEach((obj, index) => {
        let [x, y] = d3.arc().centroid({
            innerRadius: obj.outerRadius + 20,
            outerRadius: obj.outerRadius + 20,
            startAngle: obj.startAngle,
            endAngle: obj.endAngle
        });
        DOUNT_G.append('text')
            .text(obj.percentage)
            .attr('x', x)
            .attr('y', y)
            .style('text-anchor', 'middle')
            .style('font-size', '10')
            .style('fill', d3.schemeTableau10[index])
    });

    DOUNT_G.selectAll('path').style('cursor', 'pointer');

    DOUNT_G.selectAll('path')
        .on('mouseover', (e, d) => {
            document.querySelector('#output h2').innerText = `${d.industry} - ${d.percentage}%`;
            document.querySelector('#output h2').style.color = `${d3.schemeTableau10[d.id]}`;
        });
});
