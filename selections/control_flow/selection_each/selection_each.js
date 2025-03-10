const data1 = [10, 20, 30];
const data2 = [30, 60, 90, 120];

const svg = d3.select('svg');

svg.attr('width', '300').attr('height', '300');

const updateBars = (d, i, n) => {
    const element = d3.select(n[i]);
    element.attr('x', 5 + 35 * i)
        .attr('y', d)
        .attr('width', '30')
        .attr('height', d)
        .style('fill', `rgb(${d * 2}, ${d * 3}, ${d * 2.5})`);
}

let rects = svg.selectAll('rect');
rects = rects.data(data1).join('rect').each(updateBars);
rects = rects.data(data2).join('rect').each(updateBars);
