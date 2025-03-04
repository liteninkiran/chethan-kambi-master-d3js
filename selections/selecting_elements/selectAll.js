const h1 = d3.selectAll('h1');
const h1Alt = d3.select('h1');
// console.log(h1, h1Alt);

const circles = d3.selectAll('circle');
// console.log(circles);

const rects = d3.selectAll('rect');
// console.log(rects);

const svgs = d3.selectAll('svg');
// console.log(svgs);

const svgsAlt = d3.selectAll('.svg-area');
// console.log(svgsAlt);

const circlesAlt = svgsAlt.selectAll('circle');
// console.log(circlesAlt);

const circle = svgsAlt.select('circle');
// console.log(circle);

for(let elem of circle) {
    // console.log(elem);
}

for(let elem of circlesAlt) {
    // console.log(elem);
}

svgsAlt.select(function (d, i, n) {
    console.log('d:', d);
    console.log('n:', n);
    console.log('i:', i);
    console.log('n[i]:', n[i]);
    console.log('---------------------');
});
