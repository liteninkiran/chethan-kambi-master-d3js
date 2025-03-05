// Find the first SVG
const svg1 = d3.select('svg');

// Store dimensions of SVG
const svg1Width = svg1.attr('width');
const svg1Height = svg1.attr('height');

// No classes on the SVG, so this will return null
const svg1Class = svg1.attr('class');

// Create a class on the SVG
svg1.attr('class', 'svg1');

// Select child objects
const children = svg1.selectChildren().attr('class', 'myCircle');

// Over-writes the class, does not append
svg1.selectChildren().attr('class', 'newCircle');
svg1.selectChildren().attr('class', 'myCircle');


// Find the second SVG
const svg2 = d3.select('svg:nth-of-type(2)');

// Select all the circles in SVG 2
const svg2Circles = svg2.selectAll('circle');

// Change colour of second circles
svg2Circles.attr('style', 'fill: peachpuff');

const randomColour = () => Math.random() * 255;
const getRgb = () => `rgb(${randomColour()}, ${randomColour()}, ${randomColour()})`;
const getStyle = () => `fill: ${getRgb()}`;

svg2Circles.attr('style', (_d, _i, _n) => getStyle());
