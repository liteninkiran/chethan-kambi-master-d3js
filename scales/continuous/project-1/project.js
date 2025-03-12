const button = document.querySelector('button');

const buttonOnClick = () => {
    let cost = document.querySelector('#cost').value;
    let rate = document.querySelector('#rate').value;
    let yearlyValue = [];

    cost = Number(cost);
    rate = Number(rate);

    const nf = new Intl.NumberFormat();
    const svg = d3.select('svg');
    const SVG_WIDTH = svg.node().clientWidth;
    const SVG_HEIGHT = svg.node().clientHeight;
    const getScale = (e, d, r) => d3.scalePow().exponent(e).domain(d).range(r);
    const exponent = `${1 - rate / 100}`;
    const domain = [`${cost}`, 0];
    const powerScale = getScale(exponent, domain, [SVG_WIDTH, 0]);
    const colourScale = getScale(exponent, domain, ['green', 'pink']);
    const h = () => SVG_HEIGHT / yearlyValue.length;

    while (cost > 1000) {
        cost = Math.pow(cost, 1 - (rate / 100));
        yearlyValue.push(Math.round(cost));
    }

    svg.selectAll('rect')
        .data(yearlyValue)
        .join('rect')
        .attr('width', d => powerScale(d))
        .attr('height', h() - 5)
        .attr('x', '0')
        .attr('y', (_d, i) => i * h() + 2)
        .style('fill', d => colourScale(d));

    svg.selectAll('text')
        .data(yearlyValue)
        .join('text')
        .text((d, i) => `At the end of year ${i + 1}: £${nf.format(d)}`)
        .attr('x', d => powerScale(d) + 10)
        .attr('y', (_d, i) => i * h() + h() / 2)
        .style('fill', d => colourScale(d))
        .style('font-size', '12')
        .style('font-weight', '500');
}

button.addEventListener('click', buttonOnClick);
