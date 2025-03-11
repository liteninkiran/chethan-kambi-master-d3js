import { companyData, chartMetaData } from './companyData.js';

// Number formatter
const nf = new Intl.NumberFormat();

// Methods to show company details
const showCompanyDetails = (company) => {
    showCompanyGeneralInfo(company);
    showCompanySocialInfo(company);
}
const showCompanyGeneralInfo = (company) => {
    showCompanyGeneralItem('#company', 'Company', company.name);
    showCompanyGeneralItem('#revenue', 'Revenue (INR Mn)', nf.format(company.revenue));
    showCompanyGeneralItem('#marketcap', 'Market Cap (INR Mn)', nf.format(company.marketCap));
    showCompanyGeneralItem('#employees', 'Employees', nf.format(company.employees));
    showCompanyGeneralItem('#salesgrowth', 'Sales Growth (3-year)', company.salesGrowth);
}
const showCompanySocialInfo = (company) => {
    showCompanySocialItem('#fb', 'Facebook', company.fb);
    showCompanySocialItem('#tw', 'Twitter', company.tw);
    showCompanySocialItem('#li', 'Facebook', company.li);
}
const showCompanySocialItem = (selector, text, value) => {
    d3.select(`${selector} h2`).node().innerText = text;
    d3.select(`${selector} p`).node().innerText = nf.format(value);
}
const showCompanyGeneralItem = (selector, text, value) => {
    d3.select(selector).html(`${text}: <span>${value}</span>`);
}

// Find company div
const companyListDiv = d3.select('#list');

// Callback for appending a company
const appendCompanies = (company) => {
    const div = companyListDiv.append('div');
    div.append('h3').text(company.name).attr('class', company.code);
    div.append('input').attr('class', company.code).attr('type', 'checkbox');
}

// Append all companies
companyData.forEach(appendCompanies);

// Define the on-click method for company list
const companyOnClick = (event) => {
    const companyCode = event.target.className;
    const company = companyData.find(company => company.code === companyCode);
    showCompanyDetails(company);
}

// Select companies
const list = companyListDiv.selectAll('h3');

// Bind on-click method
list.on('click', companyOnClick);

// Set up the SVGs
const svgs = d3.select('#charts')
    .selectAll('div .chartarea')
    .append('svg')
    .attr('width', '500')
    .attr('height', '450')
    .attr('viewBox', '0 -450 500 450');

const svg = d3.select('svg');

// Get SVG dimensions
const SVGWIDTH = svg.attr('width');
const SVGHEIGHT = svg.attr('height');

// Track the checkboxes
const listCheck = companyListDiv.selectAll('input');

// console.log(listCheck);

const companyOnCheck = (e) => {
    // Define new array for selected companies
    const checkedCompanies = [];

    // Define method for storing selected companies
    const storeCompanyIfSelected = (_d, i, n) => {
        if (d3.select(n[i]).property('checked')) {
            checkedCompanies.push(companyData[i]);
        }
    }

    // Store selected companies
    listCheck.each(storeCompanyIfSelected);

    // Update charts
    chartMetaData.forEach(data => updateChart(
        checkedCompanies,
        data.selector,
        data.title,
        data.param,
        data.factor
    ));
}

listCheck.on('click', companyOnCheck);

const updateChart = (companies, selector, title, param, factor) => {
    if (companies.length === 0) {
        resetTitle(selector);
        resetChart(selector);
        resetChartText(selector);
    } else {
        setTitle(selector, title);
        setVerticalBars(selector, companies, factor, param);
        setVerticalBarText(selector, companies, param);
    }
}

// Set title
const setTitle = (sel, title) => d3.select(sel).select('.charttitle').text(title);

// Reset title
const resetTitle = (sel) => d3.select(sel).select('.charttitle').html(null);

// Reset chart
const resetChart = (sel) => d3.select(sel).select('svg').selectAll('rect').remove();

// Reset chart text
const resetChartText = (sel) => d3.select(sel).select('svg').selectAll('text').remove();

// Set vertical bars
const setVerticalBars = (sel, companies, factor, parameter) =>
    d3.select(sel)
        .select('svg')
        .selectAll('rect')
        .data(companies)
        .join('rect')
        .each((d, i, n) => d3.select(n[i])
            .attr('x', (SVGWIDTH / (2 * companies.length + 1)) * (2 * i + 1))
            .attr('y', -d[parameter] / (SVGHEIGHT * factor))
            .attr('width', SVGWIDTH / (2 * companies.length + 1))
            .attr('height', (d[parameter] / (SVGHEIGHT * factor)))
            .style('fill', d.color)
            .attr('rx', '5')
            .attr('ry', '5')
        );

// Set vertical bar text
const setVerticalBarText = (sel, companies, parameter) =>
    d3.select(sel)
        .select('svg')
        .selectAll('text')
        .data(companies)
        .join('text')
        .each((_d, i, n) => d3.select(n[i])
            .attr('x', (SVGWIDTH / (2 * companies.length + 1)) * (2 * i + 1) - 10)
            .attr('y', '0')
            .text(d => d.code.toUpperCase() + ' | ' + d[parameter].toLocaleString())
            .style('fill', 'darkslategray')
            .style('text-anchor', 'end')
            .style('font-size', '12')
            .style('font-weight', '500')
            .style('writing-mode', 'tb')
        );
