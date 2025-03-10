const circle1 = d3.select('svg circle');

circle1.on('radius', function (e, d) {
    d3.select(this).attr('r', e.detail);
});

circle1.dispatch('radius', {
    detail: '20',
    cancelable: true,
    bubbles: true,
});

const circles = d3.select('svg:nth-of-type(2)').selectAll('circle');

circles.on('colour', function (e) {
    d3.select(this).style('fill', e.detail);
});

const randomColour = () => Math.random() * 255;
const getRgb = () => `rgb(${randomColour()}, ${randomColour()}, ${randomColour()})`;

circles.dispatch('colour', (d, i, n) => ({ detail: getRgb() }));

