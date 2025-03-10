import { fordData } from './ford.js';

const numberFormatter = new Intl.NumberFormat();
const allYears = fordData.map(({ year }) => year);
const uniqueYears = [...new Set(allYears)];
const yearlyData = [];
const colours = ['DarkSeaGreen', 'DodgerBlue'];
const colours2 = ['#38ACEC', '#5CB3FF', '#79BAEC'];
const defaultTitle = 'Click on a year bar for more details';
const quartersP = d3.select('#quarters p');
const vehiclesP = d3.select('#vehicles p');
const totalSales = (data) => data.truck + data.suv + data.car;

// Store statistics
uniqueYears.forEach(year => {
    const getSum = (data) => data.year === year ? totalSales(data) : 0;
    const reducer = (acc, data) => acc + getSum(data);
    const sum = fordData.reduce(reducer, 0);
    yearlyData.push(sum);
});

const resetCharts = () => {
    document.querySelector('#years svg').innerHTML = '';
    document.querySelector('#quarters svg').innerHTML = '';
    document.querySelector('#vehicles svg').innerHTML = '';
    quartersP.text(defaultTitle);
    quartersP.text(null);
}

const generateStats = () => {
    // Reset function call
    resetCharts();

    // Add title
    d3.select('#years p').text('Number of Vehicles');

    // Store selections
    const yearsSvg = d3.select('#years svg').selectAll('rect');

    // Store years div height
    const svgHeight = (selector) => document.querySelector(`${selector} svg`).clientHeight;

    const scaledHeight = (sf, selector) => svgHeight(selector) / sf;

    // Re-usable methods
    const getIthDivHeight = (i, sf, selector) => scaledHeight(sf, selector) * (i + 1);

    // Create bar chart
    yearsSvg.data(yearlyData)
        .join('rect')
        .attr('x', 0)
        .attr('y', (_d, i) => getIthDivHeight(i, 4, '#years'))
        .attr('height', () => svgHeight('#years') / 4 - 5)
        .attr('width', (d) => d / 10000)
        .attr('id', (_d, i) => `${uniqueYears[i]}`)
        .style('fill', (_d, i) => colours[i])
        .style('cursor', 'pointer');

    // Insert text for year bars
    yearsSvg.data(yearlyData)
        .join('text')
        .attr('x', d => d / 10000 + 10)
        .attr('y', (d, i) => (getIthDivHeight(i, 4, '#years') + scaledHeight(4, '#years') / 2))
        .text((d, i) => `${uniqueYears[i]}: ${numberFormatter.format(d)}`)
        .style('font-size', '12')
        .style('font-weight', '500')
        .style('fill', 'gray');

    // Status message for quarter bars
    quartersP.text(defaultTitle);

    const barChartClickHandler = function (e, d) {
        // Add title
        quartersP.text(`${this.id}: Quarterly Break-Up`);

        const quarterlyData = fordData.filter(d => e.target.id === d.year.toString());
        const quartersSvg = d3.select('#quarters svg');

        // Create bar chart
        quartersSvg.selectAll('rect')
            .data(quarterlyData)
            .join('rect')
            .attr('x', '0')
            .attr('y', (_d, i) => getIthDivHeight(i, 6, '#quarters'))
            .attr('height', () => scaledHeight(6, '#quarters') - 5)
            .attr('width', d => totalSales(d) / 1500)
            .attr('id', d => d.quarter)
            .style('fill', 'skyblue')
            .style('cursor', 'pointer');

        // Create bar chart labels
        quartersSvg.selectAll('text')
            .data(quarterlyData)
            .join('text')
            .attr('x', d => totalSales(d) / 1500 + 10)
            .attr('y', (_d, i) => getIthDivHeight(i, 6, '#quarters') + scaledHeight(6, '#quarters') / 2)
            .text(d => `${d.quarter}: ${numberFormatter.format(totalSales(d))}`)
            .style('font-size', '12')
            .style('font-weight', '500')
            .style('fill', 'gray');


        // Status message for vehicle type break-down
        vehiclesP.text('Hover on a quarter bar for vehicle types');

        const vehiclesSvg = d3.select('#vehicles svg');

        // Define mouse enter event
        const onMouseEnter = function (_e, d) {
            const dataLabels = ['truck', 'suv', 'car'];
            const data = dataLabels.map(x => d[x]);

            vehiclesP.text(`${d.quarter} ${d.year} : Vehicle type break up`);

            vehiclesSvg.selectAll('rect')
                .data(data)
                .join('rect')
                .attr('width', d => d / 1000)
                .attr('height', () => scaledHeight(5, '#vehicles') - 5)
                .attr('x', '0')
                .attr('y', (_d, i) => getIthDivHeight(i, 5, '#vehicles'))
                .attr('fill', (_d, i) => colours2[i]);

            vehiclesSvg.selectAll('text')
                .data(data)
                .join('text')
                .attr('x', d => d / 1000 + 10)
                .attr('y', (_d, i) => getIthDivHeight(i, 5, '#vehicles') + scaledHeight(5, '#vehicles') / 2)
                .text((d, i) => `${dataLabels[i].toUpperCase()}: ${numberFormatter.format(d)}`)
                .style('font-size', '12')
                .style('font-weight', '500')
                .style('fill', 'gray');
        }

        // Define mouse out event
        const onMouseOut = () => vehiclesSvg.selectAll('*').remove();

        // Add events
        quartersSvg.selectAll('rect').on('mouseenter', onMouseEnter);
        quartersSvg.selectAll('text').on('mouseenter', onMouseEnter);
        quartersSvg.on('mouseout', onMouseOut);
    }

    // Create quarterly chart
    d3.select('#years').selectAll('rect').on('click', barChartClickHandler);
}

// Add click listener to the 'generate' button
d3.select('#gen-info').on('click', generateStats);
