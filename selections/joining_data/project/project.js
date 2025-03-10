import { PlanetData as planetData } from './planets.js';

// Create a number formater
const numberFormatter = new Intl.NumberFormat();

// Store elements
const diameter = d3.select('#diameter svg');
const density = d3.select('#density svg');
const btn = document.querySelector('#btn');

// Set the SVG dimensions
diameter.attr('width', '100%').attr('height', '350');
density.attr('width', '100%').attr('height', '350');

let orderAsc = true;

const getOrderDirection = () => orderAsc ? 'ASCENDING' : 'DESCENDING';

// Definition for generating diameter chart
const genDiameterChart = () => {
    let cxValue = 0;
    let prevRadius = 0;

    // Define sort function
    const sortFn = (a, b) => orderAsc
        ? a.diameter - b.diameter
        : b.diameter - a.diameter;

    // Define function calculating CX value of circles
    const getCX = (d, i, n) => {
        if (i > 0) {
            prevRadius = Number(d3.select(n[i - 1]).attr('r'));
        }
        cxValue += prevRadius + d.diameter / 1000;
        return (75 * (i + 1)) + cxValue;
    }

    // Define function for calculating X and Y values of text labels
    const getX = (_d, i) => document.querySelectorAll('svg circle')[i].getAttribute('cx');
    const getY = (_d, i) => i % 2 === 0 ? '330' : '15';

    // Define function for calculating the text labels
    const getLabelText = (d) => `${d.name}: ${numberFormatter.format(d.diameter)} km`;

    // Add title to diameter
    d3.select('#diameter p')
        .text(`Diameter of the planets in kilometers, sorted in ${getOrderDirection()} order`)
        .attr('class', 'text');

    // Bind data to circles and apply attributes
    diameter.selectAll('circle')
        .data(planetData, d => d.name)
        .join('circle')
        .sort(sortFn)
        .attr('r', d => d.diameter / 1000)
        .attr('cy', '150')
        .attr('cx', getCX)
        .style('fill', d => d.colour);

    // Bind data to text labels and apply attributes
    diameter.selectAll('text')
        .data(planetData, d => d.name)
        .join('text')
        .sort(sortFn)
        .attr('x', getX)
        .attr('y', getY)
        .text(getLabelText)
        .style('text-anchor', 'middle')
        .style('fill', 'rgb(63,63,63)')
        .style('font-size', '13')
        .style('font-weight', 'bold');
}

// Definition for generating density chart
const genDensityChart = () => {
    // Define sort function
    const sortFn = (a, b) => orderAsc
        ? a.density - b.density
        : b.density - a.density;

    // Add title to density
    d3.select('#density p')
        .text(`Density of the planets in kilogram per meter cube, sorted in ${getOrderDirection()} order`)
        .attr('class', 'text');

    // Define function for calculating X and Y values of text labels
    const getX = d => d.density / 10 + 20;
    const getY = (_d, i) => (i * 40) + 20;

    // Define function for calculating the text labels
    const getLabelText = d => (`${d.name}: ${numberFormatter.format(d.density)} kg/m3`);

    // Bind data to circles and apply attributes
    density.selectAll('rect')
        .data(planetData, (d) => d.name)
        .join('rect')
        .sort(sortFn)
        .attr('width', d => d.density / 10)
        .attr('height', '30')
        .attr('y', (_d, i) => i * 40)
        .attr('x', '10')
        .style('fill', d => d.colour);

    // Bind data to text labels and apply attributes
    density.selectAll('text')
        .data(planetData, (d) => d.name)
        .join('text')
        .sort(sortFn)
        .attr('x', getX)
        .attr('y', getY)
        .text(getLabelText)
        .style('text-anchor', 'start')
        .style('fill', 'rgb(63,63,63)')
        .style('font-size', '13')
        .style('font-weight', 'bold');
}

// Definition for setting the sort message paragraph
const setMsg = (message = '') => document.getElementById('msg').innerText = message;

// Definition for button click method
const onButtonClick = () => {
    setMsg(`${getOrderDirection()} ORDER SELECTED`);
    setTimeout(setMsg, 1500);
    genDiameterChart();
    genDensityChart();
    orderAsc = !orderAsc;
}

// Bind click event to button
btn.addEventListener('click', onButtonClick);
