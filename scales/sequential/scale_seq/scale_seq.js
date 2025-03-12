// d3.scaleSequential()

const seqScale = d3.scaleSequential();

// default domain [0,1]
// map cont numeric input domain to a cont output range
// both domain and range has exactly 2 elements
// usually a range is not specified but an interpolater is specified
// if range is specified then it will be converted to an interpolater using the default d3.interpolate
// invert and interpolate methods dont work on sequential scales!

// console.log(seqScale.domain()); // [0, 1]
// console.log(seqScale.range()); // [0, 1]
// console.log(seqScale(4)); // 4

seqScale.domain([1, 10]);
seqScale.range([11, 20]);
// console.log(seqScale(0)); // 10


seqScale.interpolator(d3.interpolateRainbow);

// console.log(seqScale.domain()); // [0, 1]
// console.log(seqScale.range()); // ['rgb(110, 64, 170)', 'rgb(110, 64, 170)']
console.log(seqScale(4)); // rgb(255, 140, 56)

// Other seq scales:
// d3.scaleSequentialLog()
// d3.scaleSequentialPow()
// d3.scaleSequentialQuantile()

