// d3.difference(iterable, ...others)
const difference = d3.difference([0, 1, 2, 3, 4], [1], [3]);        // console.log(difference);     // [0, 2, 4]

// d3.union(...iterables)
const union = d3.union([1, 3, 5], [0, 1, 2, 4]);                    // console.log(union);          // [1, 3, 5, 0, 2, 4]

// d3.intersection(...iterables)
const intersection = d3.intersection([1, 3, 5], [0, 1, 2, 4]);      // console.log(intersection);   // [1]

// d3.superset(a, b)
const superset = d3.superset([0, 1, 2, 3], [1, 3]);                 // console.log(superset);       // true

// d3.subset(a, b)
const subset = d3.subset([1, 3], [0, 1, 2, 3]);                     // console.log(subset);         // true

// d3.disjoint(a, b)
const disjoint = d3.disjoint([1, 2], [7, 8, 9]);                    // console.log(disjoint);       // true
