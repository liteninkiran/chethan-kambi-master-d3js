const h1 = d3.select('h1');
// console.log(h1);

const circleSvg = d3.select('#circles');
// console.log(circleSvg);

const rectSvg = d3.select('#rects');
// console.log(rectSvg);

const circle = d3.select('circle');
// console.log(circle);

const rect = rectSvg.select('rect');
// console.log(rect);

rectSvg.select((_d, i, n) => {
    console.log(n[i]);
});

rectSvg.select(function (_d, i, n) {
    console.log(this, n[i]);
});
