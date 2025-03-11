// d3.scaleIdentity()

const scaleIdentity = d3.scaleIdentity();

// console.log(scaleIdentity(7)); // 7
// console.log(scaleIdentity.domain()); // [0, 1]
// console.log(scaleIdentity.range()); // [0, 1]

// changing either .domain() or .range() updates the other
scaleIdentity.domain([17, 64]);

// console.log(scaleIdentity.domain()); // [17, 64] 
// console.log(scaleIdentity.range()); // [17, 64]


