const data = [15, 25, 35];

const svg = d3.select('svg');

svg.attr('width', '300').attr('height', '300');

const getPreviousWidth = (d, i, n) => (5 + +n[i - 1].getAttribute('cx') + +n[i - 1].getAttribute('r') + d)

const updateCircles = (d, i, n) => {
    const element = d3.select(n[i]);
    element.attr('cx', i < 1 ? 5 + d : getPreviousWidth(d, i, n))
        .attr('cy', '50')
        .attr('r', d)
        .style('fill', `rgba(${d / 2}, ${d / 3}, ${d * 7}, 0.7)`);
}

const display = (sel, rad) => {
    sel.selectAll('circle')
        .data(rad)
        .join('circle')
        .each(updateCircles);
}

const circles = svg.call(display, data);

