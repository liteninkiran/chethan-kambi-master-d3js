const firstSvg = d3.select('svg');
const secondSvg = d3.select('svg:nth-of-type(2)');
const allSvg = d3.selectAll('svg');

const firstSvgChildren = firstSvg.selectChildren();
// console.log(firstSvgChildren);

const secondSvgChildren = secondSvg.selectChildren();
// console.log(secondSvgChildren);

const allSvgChildren = allSvg.selectChildren();
// console.log(allSvgChildren);

const childrenFn = function(c, i, cn) {
    // console.log('c:', c);
    // console.log('i:', i);
    // console.log('cn:', cn);
    // console.log('---------------');
    return true;
}

const filtered = firstSvg.selectChildren(childrenFn);
// console.log(filtered);

const allFiltered = allSvg.selectChildren(childrenFn);
console.log(allFiltered);
