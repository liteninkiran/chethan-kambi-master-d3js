import { penguinData as penguins } from './penguinData.js';
import { aaplData as aapl } from './aaplData.js';

/**
 * Group: group(iterable, ...keys)
 * 
 * https://d3js.org/d3-array/group#group
 * 
 * Groups the specified iterable of values into an InternMap from key to array 
 * of value. If more than one key is specified, a nested InternMap is returned.
 * 
 * Elements are returned in the order of the first instance of each key. To 
 * get the elements, use the get() method.
 * 
 */

let species = d3.group(penguins, (penguin) => penguin.species);         // console.log(species);                // InternMap(3)
const speciesSex = d3.group(penguins, (d) => d.species, (d) => d.sex);  // console.log(speciesSex);             // InternMap(3)
let adelie = species.get("Adelie");                                     // console.log(adelie);                 // Array(152)
let adelieFemale = speciesSex.get("Adelie").get("FEMALE");              // console.log(adelieFemale);           // Array(73)

/**
 * Groups: groups(iterable, ...keys)
 * 
 * https://d3js.org/d3-array/group#groups
 * 
 * Equivalent to group, but returns an array of [key, value] entries instead of a 
 * map. If more than one key is specified, each value will be a nested array of 
 * [key, value] entries. Elements are returned in the order of the first instance 
 * of each key.
 * 
 */

species = d3.groups(penguins, (d) => d.species);                        // console.log(species);                // Array(3)

/**
 * Rollup: rollup(iterable, reduce, ...keys)
 * 
 * https://d3js.org/d3-array/group#rollup
 * 
 * Groups and reduces the specified iterable of values into an InternMap from key 
 * to reduced value. For example, to group and count the penguins sample dataset 
 * by species field. If more than one key is specified, a nested InternMap is 
 * returned.
 * 
 * Elements are returned in the order of the first instance of each key. To get
 * the elements, use the get() method.
 * 
 */

const speciesCount = d3.rollup(
    penguins, 
    (D) => D.length, 
    (d) => d.species
);                                                                      // console.log(speciesCount);           // InternMap(3)

const speciesSexCount = d3.rollup(
    penguins,
    (D) => D.length, 
    (d) => d.species, 
    (d) => d.sex
);                                                                      // console.log(speciesSexCount);        // InternMap(3)

adelie = speciesCount.get("Adelie")                                     // console.log(adelie);                 // 152
adelieFemale = speciesSexCount.get("Adelie").get("FEMALE")              // console.log(adelieFemale);           // 73

/**
 * Rollups: rollups(iterable, reduce, ...keys)
 * 
 * https://d3js.org/d3-array/group#rollups
 * 
 * Equivalent to rollup, but returns an array of [key, value] entries instead of 
 * a map. If more than one key is specified, each value will be a nested array of 
 * [key, value] entries. Elements are returned in the order of the first instance 
 * of each key.
 * 
 */

const speciesCounts = d3.rollups(
    penguins, 
    (D) => D.length, 
    (d) => d.species
);                                                                      // console.log(speciesCounts);          // InternMap(3)

/**
 * Index: index(iterable, ...keys)
 * 
 * https://d3js.org/d3-array/group#index
 * 
 * Uses rollup with a reducer that extracts the first element from each group, 
 * and throws an error if the group has more than one element. For example,
 * index the "aapl same dataset" by date. You can then quickly retrieve a value 
 * by date. 
 * 
 */

const myDate = new Date('2013-12-31');
const aaplDate = d3.index(aapl, (d) => new Date(d.Date));               // console.log(aaplDate);               // InternMap(1260)
const aaplDateGet = aaplDate.get(myDate).Close;                         // console.log(aaplDateGet);            // 80.145714

/**
 * Indexes: indexes(iterable, ...keys)
 * 
 * https://d3js.org/d3-array/group#index
 * 
 * Like index, but returns an array of [key, value] entries instead of a map. 
 * This probably isn’t useful for anything, but is included for symmetry with 
 * groups and rollups.
 * 
 */
