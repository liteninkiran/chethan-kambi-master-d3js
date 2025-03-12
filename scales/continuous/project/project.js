import { populationDensity } from './data.js';

const nf = new Intl.NumberFormat();

const svg = d3.select('svg');

const SVG_WIDTH = svg.node().clientWidth;
const SVG_HEIGHT = svg.node().clientHeight;
const DATA_LENGTH = populationDensity.length;
const POP_DEN_MIN = 0;

const densityList = [];
populationDensity.forEach(country => densityList.push(country.density));
const POP_DEN_MAX = Math.max(...densityList);

const X_SCALE =
    d3.scaleLinear()
        .domain([POP_DEN_MIN, POP_DEN_MAX])
        .range([0, SVG_WIDTH]);

const COLOUR_SCALE =
    d3.scaleLinear()
        .domain([POP_DEN_MIN, POP_DEN_MAX])
        .range(['antiquewhite', 'tomato']);

const Y_SCALE =
    d3.scaleLinear()
        .domain([0, DATA_LENGTH - 1])
        .range([0, SVG_HEIGHT - 50]);

svg.selectAll('rect')
    .data(populationDensity)
    .join('rect')
    .attr('width', d => X_SCALE(d.density))
    .attr('height', SVG_HEIGHT / DATA_LENGTH - 5)
    .attr('x', '0')
    .attr('y', (d, i) => 5 + Y_SCALE(i))
    .attr('rx', '5')
    .attr('ry', '5')
    .attr('fill', d => COLOUR_SCALE(d.density));

svg.selectAll('text')
    .data(populationDensity)
    .join('text')
    .text(d => `${d.country}: ${nf.format(Math.round(d.density))}`)
    .attr('x', '10')
    .attr('y', (d, i) => (5 + Y_SCALE(i)) + 27)
    .style('fill', 'black')
    .style('text-anchor', 'start')
    .style('font-size', '12')
    .style('font-weight', '600')
    .style('letter-spacing', '0.5');

const submitOnClick = () => {
    const scaleInput = document.querySelector('#scaleinput');
    const scaleOutput = document.querySelector('#scaleoutput');
    const INPUT = scaleInput.value;
    if (INPUT >= 0 && INPUT <= 100) {
        scaleOutput.innerText = X_SCALE.invert(INPUT / 100 * SVG_WIDTH).toFixed(2);
    }
}

const submitButton = document.querySelector('#scalesubmit');
submitButton.addEventListener('click', submitOnClick);
