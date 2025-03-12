import { enrollmentData } from './data.js';

const nf = new Intl.NumberFormat();

const svg = d3.select('#chart svg');

const SVG_WIDTH = svg.node().clientWidth;
const SVG_HEIGHT = svg.node().clientHeight;

const years = Object.keys(enrollmentData);
const male = years.map((key) => enrollmentData[key].male);
const female = years.map((key) => enrollmentData[key].female);

// Colour Scale
const scaleColour = d3.scaleOrdinal()
    .domain(['female', 'male'])
    .range(['#F48FB1', '#90CAF9']);

// Y Scale
const scaleY = d3.scaleLinear()
    .domain([0, Math.max(...female, ...male)])
    .range([0, SVG_HEIGHT - 60]);

// X Scale
const scaleX = d3.scaleLinear()
    .domain([0, years.length - 1])
    .range([SVG_WIDTH / years.length, SVG_WIDTH]);

const getX = (i) => scaleX(i) - scaleX(0) / 2;

// Years Group
const yearsG = svg.append('g')
    .attr('id', 'years')
    .style('fill', 'gray')
    .style('font-weight', '600')
    .style('font-size', '14');

yearsG.selectAll('text')
    .data(years)
    .join('text')
    .text(d => d)
    .attr('x', (_d, i) => getX(i))
    .attr('y', SVG_HEIGHT - 8)
    .style('text-anchor', 'middle');

// Gender Group
const createGenderGroup = (gender) => {
    const g = svg.append('g').attr('id', gender);
    const isFemale = gender === 'female';
    const data = isFemale ? female : male;
    const rectOffset = isFemale ? -50 : 2;
    const textOffset = isFemale ? -25 : 27;
    const getY = (d) => SVG_HEIGHT - scaleY(d) - 25;

    // Create rect elements
    g.selectAll('rect')
        .data(data)
        .join('rect')
        .attr('width', '50')
        .attr('height', d => scaleY(d))
        .attr('x', (_d, i) => getX(i) + rectOffset)
        .attr('y', (d) => getY(d))
        .attr('rx', '5')
        .attr('ry', '5')
        .style('fill', () => scaleColour(gender));

    // Create text elements
    g.selectAll('text')
        .data(data)
        .join('text')
        .text((d) => nf.format(d))
        .attr('x', (_d, i) => getX(i) + textOffset)
        .attr('y', (d) => getY(d) - 5)
        .style('fill', () => scaleColour(gender))
        .style('font-size', '12')
        .style('font-weight', '500')
        .style('text-anchor', 'middle');
}

createGenderGroup('female');
createGenderGroup('male');

// Legend
const legend = document.getElementById('legend');
const p1 = legend.querySelector('p');
const p2 = legend.querySelector('p:nth-of-type(2)');
p1.style.color = scaleColour(p1.innerText);
p2.style.color = scaleColour(p2.innerText);
