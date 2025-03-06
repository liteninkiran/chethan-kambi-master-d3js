const textDatumFn = function () {
    return this.innerText;
}

const circleDatumFn = function () {
    return d3.select(this).attr('r');
}

const textSortFn = (a, b) => b - a;
const circleSortFn = (a, b) => b - a;
const circleAttrFn = (_d, i) => 50 + (i * 80);

const text = d3.selectAll('p')
    .datum(textDatumFn)
    .sort(textSortFn);

const circles = d3.selectAll('circle')
    .datum(circleDatumFn)
    .sort(circleSortFn)
    .attr('cx', circleAttrFn);
