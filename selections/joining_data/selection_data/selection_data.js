const circles1 = d3.selectAll('#svg1 circle');
const rad1 = [10, 20, 30];
const data1 = circles1.data(rad1);

data1.select((d, i, n) => {
    // console.log(n[i]);
});

data1.attr('r', d => d);


const circles2 = d3.selectAll('#svg2 circle');
const rad2 = [36, 12, 57];
const data2 = circles2.data(rad2);

data2.attr('r', d => d);

const colours = ['red', 'green', 'blue'];

const data3 = circles2.data(colours);

circles2.style('fill', d => d);

const circles = d3.selectAll('svg').selectAll('circle');

circles.data(rad1);

circles.attr('r', d => d);

const data = circles2.data((d, i, n) => {
    // console.log(d, i, n);
    return [20, 30, 40];
});

console.log(data.data());
