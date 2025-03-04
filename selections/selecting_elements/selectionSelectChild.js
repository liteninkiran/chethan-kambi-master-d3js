const firstSvg = d3.select('svg');
const secondSvg = d3.select('svg:nth-of-type(2)');
const allSvg = d3.selectAll('svg');

const firstChildCircle = firstSvg.selectChild();
// console.log(firstChildCircle);

const secondChildCircle = firstSvg.selectChild(':nth-child(2)');
// console.log(secondChildCircle);

const firstChildRect = secondSvg.selectChild();
// console.log(firstChildRect);

const secondChildRect = secondSvg.selectChild(':nth-child(2)');
// console.log(secondChildRect);

const firstChild = allSvg.selectChild();
// console.log(firstChild);

const secondChild = allSvg.selectChild(':nth-of-type(2)');
// console.log(secondChild);

const childFunction = function(c, i, cn) {
    console.log('c:', c);
    console.log('i:', i);
    console.log('cn:', cn);
    console.log('---------------');
};

const child = firstSvg.selectChild(childFunction);
const allChild = allSvg.selectChild(childFunction);
