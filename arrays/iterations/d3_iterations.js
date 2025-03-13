// Iterations include methods that help us work with any iterable including Arrays, Map, Set and Generators

// d3.every(iterable,test)
// Returns true if the given test function returns true for every value in the given iterable.
// This method returns as soon as test returns a non-truthy value or all values are iterated over.
let everyOutput;
everyOutput = d3.every([1, 2, 3], d => d > 0);                          // console.log(everyOutput); // true
everyOutput = d3.every([1, 2, 3], d => d > 3);                          // console.log(everyOutput); // false
everyOutput = d3.every(new Set([1, 2, 3]), d => d > 0);                 // console.log(everyOutput); // true
everyOutput = d3.every(new Set([1, 2, 3]), d => d > 3);                 // console.log(everyOutput); // false

// d3.some(iterable,test)
// Returns true if the given test function returns true for any value in the given iterable. This 
// method returns as soon as test returns a truthy value or all values are iterated over.
let someOutput;
someOutput = d3.some([1, 2, 3], d => d > 1);                            // console.log(someOutput); // true
someOutput = d3.some([1, 2, 3], d => d > 3);                            // console.log(someOutput); // false
someOutput = d3.some(new Set([1, 2, 3]), d => d > 1);                   // console.log(someOutput); // true
someOutput = d3.some(new Set([1, 2, 3]), d => d > 3);                   // console.log(someOutput); // false

// d3.filter(iterable,test)
// Returns a new array containing the values from iterable, in order, for which the given test 
// function returns true.
let filterOutput;
filterOutput = d3.filter([1, 2, 3], d => d > 1);                        // console.log(filterOutput); // [2, 3]
filterOutput = d3.filter([1, 2, 3], d => d > 3);                        // console.log(filterOutput); // []
filterOutput = d3.filter(new Set([1, 2, 3]), d => d > 1);               // console.log(filterOutput); // [2, 3]
filterOutput = d3.filter(new Set([1, 2, 3]), d => d > 3);               // console.log(filterOutput); // []

// d3.map(iterable,map)
// Returns a new array containing the mapped values from iterable, in order, as defined by given 
// mapper function.
let mapOutput;
mapOutput = d3.map([1, 2, 3], d => d > 1);                              // console.log(mapOutput); // [false, true, true]
mapOutput = d3.map([1, 2, 3], d => d > 3);                              // console.log(mapOutput); // [false, false, false]
mapOutput = d3.map(new Set([1, 2, 3]), d => d > 1);                     // console.log(mapOutput); // [false, true, true]
mapOutput = d3.map(new Set([1, 2, 3]), d => d > 3);                     // console.log(mapOutput); // [false, false, false]

// d3.reduce(iterable,reducer,initialValue(optional))
// Returns the reduced value defined by given reducer function, which is repeatedly invoked for each 
// value in iterable, being passed the current reduced value and the next value.
let reduceOutput;
reduceOutput = d3.reduce([1, 2, 3], (x, y) => x + y, 5);                // console.log(reduceOutput); // 11
reduceOutput = d3.reduce([1, 2, 3], (x, y) => x - y);                   // console.log(reduceOutput); // -4
reduceOutput = d3.reduce(new Set([1, 2, 3]), (x, y) => x + y, 5);       // console.log(reduceOutput); // 11
reduceOutput = d3.reduce(new Set([1, 2, 3]), (x, y) => x - y);          // console.log(reduceOutput); // -4

// d3.reverse(iterable)
// Returns an array containing the values in the given iterable in reverse order. Does not mutate the 
// given iterable.
let reverseOutput;
reverseOutput = d3.reverse([1, 2, 3]);                                  // console.log(reverseOutput); // [3, 2, 1]
reverseOutput = d3.reverse(new Set([1, 2, 3]));                         // console.log(reverseOutput); // [3, 2, 1]

// d3.sort(iterable,accessor)
// d3.sort(iterable,comparator)
// Returns an array containing the values in the given iterable in the sorted order defined by the 
// given comparator or accessor function. Defalut order is ascending.
let sortOutput;
sortOutput = d3.sort([3, 2, 1]);                                        // console.log(sortOutput); // [1, 2, 3]
sortOutput = d3.sort([3, 2, 1], d => d / 3);                            // console.log(sortOutput); // [1, 2, 3]
sortOutput = d3.sort([1, 2, 3], (x, y) => y - x);                       // console.log(sortOutput); // [3, 2, 1]
sortOutput = d3.sort(new Set([3, 2, 1]));                               // console.log(sortOutput); // [1, 2, 3]
sortOutput = d3.sort(new Set([3, 2, 1]), d => d / 3);                   // console.log(sortOutput); // [1, 2, 3]
sortOutput = d3.sort(new Set([1, 2, 3]), (x, y) => y - x);              // console.log(sortOutput); // [3, 2, 1]
