const circles = d3.selectAll('circle');
// console.log(circles);

const oddCircles = circles.filter(':nth-child(odd)');
// console.log(oddCircles);

const evenCircles = circles.filter(':nth-child(even)');
// console.log(evenCircles);

const oddCirclesByClass = circles.filter('.odd');
// console.log(oddCirclesByClass);

const evenCirclesByClass = circles.filter('.even');
// console.log(evenCirclesByClass);


const filterFn = function (d, i, n) {
    // console.log('d:', d);
    // console.log('n:', n);
    // console.log('i:', i);
    // console.log('n[i]:', n[i]);
    // console.log('---------------------');
    i % 2 === 0
        ? this.style.fill = 'orange'
        : this.style.fill = 'dodgerblue';
    return i % 2 === 0 ? this : undefined;
}

const filtered = circles.filter(filterFn);

console.log(filtered);
