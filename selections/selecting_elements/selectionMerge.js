const circle1 = d3.selectAll('#svg1 circle');
const circle2 = d3.selectAll('#svg2 circle');

// console.log(circle1);
// console.log(circle2);

const odd1 = circle1.select(function(d, i, n) {
    if(i % 2 === 0) {
        this.style.fill = 'indianred';
        return this;
    } else {
        return null;
    }
});

// console.log(odd1);

const even1 = circle1.select(function(d, i, n) {
    if(i % 2 !== 0) {
        this.style.fill = 'green';
        return this;
    } else {
        return null;
    }
});

// console.log(even1);

const merged = odd1.merge(even1);

// console.log(merged);

const mergedAll = circle1.merge(circle2);

// console.log(mergedAll);

const odd2 = circle2.select(function(d, i, n) {
    if(i % 2 === 0) {
        this.style.fill = 'dodgerblue';
        return this;
    } else {
        return null;
    }
});

// console.log(odd2);

const even2 = circle2.select(function(d, i, n) {
    if(i % 2 !== 0) {
        this.style.fill = 'plum';
        return this;
    } else {
        return null;
    }
});

// console.log(even2);

const mergedAlt = even1.merge(odd2);

console.log(mergedAlt);
