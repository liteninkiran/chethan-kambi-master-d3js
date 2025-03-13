import { SALES_DATA as data, ABBR } from './data.js';

// Store width and height of svg elements in row 1 and row 2
const SVG_W_R1 = document.querySelector('#row1 svg').clientWidth;
const SVG_H_R1 = document.querySelector('#row1 svg').clientHeight;
const SVG_W_R2 = document.querySelector('#row2 svg').clientWidth;
const SVG_H_R2 = document.querySelector('#row2 svg').clientHeight;

// Buffer area around the svg
const BUFFER = 25;
const DATA_LENGTH = data.length;

// SVG references
const STAT_SVG = d3.select('#statistics svg');
const ITER_SVG = d3.select('#iterations svg');
const SEAR_SVG = d3.select('#search svg');
const TRAN_SVG = d3.select('#transformations svg');
const SETS_SVG = d3.select('#sets svg');

// Linear scale helper function
const linearScaleHelper = (d1, d2, r1, r2) =>
    d3.scaleLinear()
        .domain([d1, d2])
        .range([r1, r2]);

// Axis creation helper function
const axisHelper = (type, ticks, scale) => {
    let axis;
    if (type === 'left') axis = d3.axisLeft(scale);
    if (type === 'right') axis = d3.axisRight(scale);
    if (type === 'top') axis = d3.axisTop(scale);
    if (type === 'bottom') axis = d3.axisBottom(scale);
    axis.ticks(ticks);
    return axis;
}

// Axis group creation helper function
const groupHelper = (context, id, x, y) =>
    context.append('g')
        .attr('id', id)
        .attr('transform', `translate(${x}, ${y})`);

const minOrMaxHelper = (obj, status, rStatus) => {
    let value, valueKey;
    for (const key in obj) {
        if (Number.isInteger(obj[key])) {
            value = status === 'min'
                ? d3.min([obj[key], value])
                : d3.max([obj[key], value]);
        }
        valueKey = obj[key] === value ? key : valueKey;
    }
    return rStatus === 0
        ? value
        : rStatus === 1
            ? valueKey
            : { [valueKey]: value }
}

// Category colour scale
const catColourScale = d3.scaleOrdinal()
    .domain([...Object.keys(data[0])])
    .range(d3.schemePastel1);

// Transition
const T1 = d3.transition().duration(2500);

/**
 * Statistics Chart
 * 
 *  -> Find max values
 *  -> Define the x-axis
 *  -> Define the y-axis
 *  -> Create more helper functions
 *  -> Render the bars 
 */

// Find max values
const maxVals = data.map(d => minOrMaxHelper(d, 'max', 0));

// Define the x-axis
const STAT_X_AXIS_SCALE = linearScaleHelper(0, d3.max(maxVals), BUFFER, SVG_W_R1 - BUFFER);
const STAT_X_AXIS = axisHelper('bottom', 4, STAT_X_AXIS_SCALE);
const STAT_X_AXIS_G = groupHelper(STAT_SVG, 'statXAxis', 0, SVG_H_R1 - BUFFER);
STAT_X_AXIS(STAT_X_AXIS_G);

// Define the y-axis
const STAT_Y_AXIS_SCALE = linearScaleHelper(0, DATA_LENGTH - 1, BUFFER, SVG_H_R1 - BUFFER);
const STAT_Y_AXIS = axisHelper('left', 0, STAT_Y_AXIS_SCALE);
const STAT_Y_AXIS_G = groupHelper(STAT_SVG, 'statYAxis', BUFFER, 0);
STAT_Y_AXIS(STAT_Y_AXIS_G);

// Create more helper functions
const MAX_HEIGHT = (SVG_H_R1 - 2 * BUFFER) / DATA_LENGTH;
const r1 = (offset) => BUFFER + offset ? MAX_HEIGHT / 2 : 0;
const r2 = (sf) => SVG_H_R1 - BUFFER - MAX_HEIGHT / sf;
const offset = (i) => i === 0 ? 0 : MAX_HEIGHT / 2 - 2;
const minOrMax = (i) => i === 0 ? 'min' : 'max';
const linearScaleBars = linearScaleHelper(0, DATA_LENGTH - 1, r1(false), r2(1));
const linearScaleText = linearScaleHelper(0, DATA_LENGTH - 1, r1(true), r2(2));
const minMax = (i, index) => minOrMaxHelper(data[index], minOrMax(i), 1);
const getStatsBarHeight = (i, index) => linearScaleBars(index) + offset(i);
const getStatsBarColour = (i, index) => catColourScale(minMax(i, index));
const getStatsTextHeight = (index) => linearScaleText(index);
const groupName = (index, sel = false) => `${sel ? '#' : ''}stat${index}`;
const g = (index) => d3.select(groupName(index, true));
const getStatsData = (index) => [
    minOrMaxHelper(data[index], 'min', 0),
    minOrMaxHelper(data[index], 'max', 0),
];
const createStatsGroups = (_obj, index) => STAT_SVG.append('g').attr('id', groupName(index));
const createStatsBars = (_obj, index) =>
    g(index)
        .selectAll('rect')
        .data(getStatsData(index))
        .join('rect')
        .attr('height', MAX_HEIGHT / 2 - 2)
        .attr('x', BUFFER + 2)
        .attr('y', (_d, i) => getStatsBarHeight(i, index))
        .style('fill', (_d, i) => getStatsBarColour(i, index))
        .attr('rx', '3')
        .attr('ry', '3');
const animateStatsRects = (_obj, index) =>
    g(index)
        .selectAll('rect')
        .transition(T1)
        .attr('width', d => STAT_X_AXIS_SCALE(d) - BUFFER);
const createStatsLabels = (_obj, index) =>
    g(index)
        .selectAll('text')
        .data([data[index].region])
        .join('text')
        .text(d => d[0])
        .attr('x', '1')
        .attr('y', getStatsTextHeight(index))
        .style('fill', 'gray')
        .style('font-size', '11');

// Render the bars
data.forEach(createStatsGroups);
data.forEach(createStatsBars);
data.forEach(animateStatsRects);
data.forEach(createStatsLabels);

/**
 * Iterations Chart
 */

// Define the x-axis
const ITER_X_AXIS_G = groupHelper(ITER_SVG, 'iterXAxis', 0, SVG_H_R1 - BUFFER);
STAT_X_AXIS(ITER_X_AXIS_G);

// Define the y-axis
const ITER_Y_AXIS_G = groupHelper(ITER_SVG, 'iterYAxis', BUFFER, 0);
STAT_Y_AXIS(ITER_Y_AXIS_G);

// Create more helper functions
const meanAndMapHelper = (obj) => {
    let value = [], newObj = {}, i = 0;
    for (const key in obj) {
        if (Number.isInteger(obj[key])) {
            value.push(obj[key]);
        }
    }
    let meanOutput = d3.map(value, d => d >= d3.mean(value));

    for (const key in obj) {
        if (Number.isInteger(obj[key])) {
            if (meanOutput[i]) {
                newObj[key] = obj[key];
            }
            i++;
        }
    }
    return Object.entries(newObj);
}
const createIterGroups = (_obj, index) => ITER_SVG.append('g').attr('id', `iter${index}`)
const createIterBars = (obj, index) =>
    d3.select(`#iter${index}`)
        .selectAll('rect')
        .data(meanAndMapHelper(obj))
        .join('rect')
        .attr('height', MAX_HEIGHT / 4 - 2)
        .attr('x', BUFFER + 2)
        .attr('y', (_d, i) => linearScaleHelper(0, DATA_LENGTH - 1, BUFFER, SVG_H_R1 - BUFFER - MAX_HEIGHT)(index) + (MAX_HEIGHT / 4 - 2) * i)
        .style('fill', (_d, i) => catColourScale(meanAndMapHelper(data[index])[i][0]))
        .attr('rx', '3')
        .attr('ry', '3');
const animateIterRects = (_obj, index) =>
    d3.select(`#iter${index}`)
        .selectAll('rect')
        .transition(T1)
        .attr('width', d => STAT_X_AXIS_SCALE(d[1]) - BUFFER);
const createIterLabels = (_obj, index) =>
    d3.select(`#iter${index}`)
        .selectAll('text')
        .data([data[index].region])
        .join('text')
        .text(d => d[0])
        .attr('x', '1')
        .attr('y', linearScaleHelper(0, DATA_LENGTH - 1, BUFFER + MAX_HEIGHT / 2, SVG_H_R1 - BUFFER - MAX_HEIGHT / 2)(index))
        .style('fill', 'gray')
        .style('font-size', '11');

// Render the bars
data.forEach(createIterGroups);
data.forEach(createIterBars);
data.forEach(animateIterRects);
data.forEach(createIterLabels);

/**
 * Search Chart
 */
let entries = [];

data.forEach((obj, index) => {
    for (const key in obj) {
        if (Number.isInteger(obj[key])) {
            entries.push([index, key, obj[key]])
        }
    }
});

// Define the x-axis
const SEAR_X_AXIS_SCALE = linearScaleHelper(0, entries.length - 1, BUFFER, SVG_W_R2 - BUFFER);
const SEAR_X_AXIS = axisHelper('bottom', 0, SEAR_X_AXIS_SCALE);
const SEAR_X_AXIS_G = groupHelper(SEAR_SVG, 'searXAxis', 0, SVG_W_R2 - BUFFER);
SEAR_X_AXIS(SEAR_X_AXIS_G);

// Define the y-axis
const SEAR_Y_AXIS_SCALE = linearScaleHelper(d3.max(maxVals), 0, BUFFER, SVG_H_R2 - BUFFER);
const SEAR_Y_AXIS = axisHelper('left', 4, SEAR_Y_AXIS_SCALE);
SEAR_Y_AXIS.ticks(4, "~s").tickPadding(0).tickSize(1);
const SEAR_Y_AXIS_G = groupHelper(SEAR_SVG, 'searYAxis', BUFFER, 0);
SEAR_Y_AXIS(SEAR_Y_AXIS_G);

// Render circles
SEAR_SVG.selectAll('circle')
    .data(d3.sort(entries, (a, b) => d3.ascending(a[2], b[2])))
    .join('circle')
    .attr('cx', (_d, i) => SEAR_X_AXIS_SCALE(i))
    .attr('cy', d => SEAR_Y_AXIS_SCALE(d[2]))
    .style('fill', d => catColourScale(d[1]));

// Transition on circles
SEAR_SVG.selectAll('circle')
    .each((_d, i, n) => {
        d3.select(n[i])
            .transition()
            .delay(100 * (i + 1))
            .duration(500)
            .attr('r', '6')
    })

// Text on x-axis
SEAR_SVG.append('g')
    .attr('id', 'regions')
    .selectAll('text')
    .data(d3.sort(entries, (a, b) => d3.ascending(a[2], b[2])))
    .join('text')
    .text(d => {
        if (d[0] == 0) return 'N'
        if (d[0] == 1) return 'E'
        if (d[0] == 2) return 'S'
        if (d[0] == 3) return 'W'
    })
    .attr('x', (d, i) => SEAR_X_AXIS_SCALE(i) - 3)
    .attr('y', SVG_H_R2 - 5)
    .style('fill', 'gray')
    .style('font-size', '10')
    .style('font-weight', '500')

/**
 * Transformations
 */

const grouped = d3.groups(entries, d => d[0]);
const groupedWidth = (SVG_W_R2 - 2 * BUFFER) / grouped.length;

// Define the y-axis
let sum = 0;
d3.max(grouped)[1].forEach(d => sum = sum + d[2]);
const TRAN_Y_AXIS_SCALE = linearScaleHelper(sum, 0, BUFFER, SVG_H_R2 - BUFFER);
const TRAN_Y_AXIS = axisHelper('left', 4, TRAN_Y_AXIS_SCALE);
TRAN_Y_AXIS.ticks(4, "~s").tickPadding(0).tickSize(1);
const TRAN_Y_AXIS_G = groupHelper(TRAN_SVG, 'tranYAxis', BUFFER, 0);
TRAN_Y_AXIS(TRAN_Y_AXIS_G);

// Define the x-axis
const TRAN_X_AXIS_SCALE = linearScaleHelper(0, grouped.length - 1, BUFFER, SVG_W_R2 - BUFFER);
const TRAN_X_AXIS = axisHelper('bottom', 0, TRAN_X_AXIS_SCALE);
const TRAN_X_AXIS_G = groupHelper(TRAN_SVG, 'tranXAxis', 0, SVG_W_R2 - BUFFER);
SEAR_X_AXIS(TRAN_X_AXIS_G);

const groupedHelper = (region) => {
    let eachRegion = [];
    region[1].forEach(d => eachRegion.push([d[2]]));
    return d3.sum(d3.merge(eachRegion));
}
TRAN_SVG.selectAll('rect')
    .data(grouped)
    .join('rect')
    .attr('x', (_d, i) => linearScaleHelper(0, grouped.length - 1, BUFFER, SVG_W_R2 - BUFFER - groupedWidth)(i) + 5)
    .attr('y', (d) => linearScaleHelper(sum, 0, BUFFER, SVG_H_R2 - 2 * BUFFER)(groupedHelper(d)))
    .attr('width', groupedWidth - 5)
    .attr('rx', '3')
    .attr('ry', '3')
    .style('fill', (d, i) => d3.schemePastel1[i + 5]);

TRAN_SVG.selectAll('rect')
    .each((d, i, n) => {
        d3.select(n[i])
            .transition()
            .delay(200 * (i + 1))
            .duration(1500)
            .attr('height', (d, i) =>
                SVG_H_R2
                - BUFFER
                - 2
                - linearScaleHelper(sum, 0, BUFFER, SVG_H_R2 - 2 * BUFFER)(groupedHelper(d)))
    });

TRAN_SVG.append('g')
    .attr('id', 'region')
    .selectAll('text')
    .data(grouped)
    .join('text')
    .text((d, i) => {
        if (d[0] == 0) return 'North'
        if (d[0] == 1) return 'East'
        if (d[0] == 2) return 'South'
        if (d[0] == 3) return 'West'

    })
    .attr('x', (d, i) => linearScaleHelper(0, grouped.length - 1, BUFFER, SVG_W_R2 - BUFFER - groupedWidth)(i) + groupedWidth / 2)
    .attr('y', SVG_H_R2 - 5)
    .style('text-anchor', 'middle')
    .style('fill', 'gray')
    .style('font-size', '11')
    .style('font-weight', '500');

/**
 * Sets Chart
 */
let commonValue = 0;
let regionArray = [], allArray = [];
data.forEach((d, i) => {
    let region = Object.values(d);
    region.forEach(d => {
        if (Number.isInteger(d)) {
            regionArray.push(d);
        }
    })
    allArray.push(regionArray);
    regionArray = [];
})
commonValue = d3.intersection(...allArray);
let commonArray = [];
entries.forEach(d => {
    if (d[2] == Array.from(commonValue)) {
        commonArray.push(d);
    }
});

// Define the y-axis
const SETS_Y_AXIS_SCALE = linearScaleHelper(Array.from(commonValue), 0, BUFFER, SVG_H_R2 - BUFFER);
const SETS_Y_AXIS = axisHelper('left', 5, SETS_Y_AXIS_SCALE);
SETS_Y_AXIS.ticks(5, "~s").tickPadding(0).tickSize(1);
const SETS_Y_AXIS_G = groupHelper(SETS_SVG, 'setsYAxis', BUFFER, 0);
SETS_Y_AXIS(SETS_Y_AXIS_G);

// Define the x-axis
const SETS_X_AXIS_SCALE = linearScaleHelper(0, commonArray.length - 1, BUFFER, SVG_W_R2 - BUFFER);
const SETS_X_AXIS = axisHelper('bottom', 0, SETS_X_AXIS_SCALE);
const SETS_X_AXIS_G = groupHelper(SETS_SVG, 'setsXAxis', 0, SVG_W_R2 - BUFFER);
SETS_X_AXIS(SETS_X_AXIS_G);

SETS_SVG.selectAll('rect')
    .data(commonArray)
    .join('rect')
    .attr('x', (d, i) => linearScaleHelper(0, commonArray.length - 1, BUFFER, SVG_W_R2 - BUFFER - groupedWidth)(i) + 5)
    .attr('y', (d, i) => linearScaleHelper(Array.from(commonValue), 0, BUFFER, SVG_H_R2 - 2 * BUFFER)(d[2]))
    .attr('width', groupedWidth - 5)
    .attr('rx', '3')
    .attr('ry', '3')
    .style('fill', (d, i) => catColourScale(d[1]));

SETS_SVG.selectAll('rect')
    .each((_d, i, n) => {
        d3.select(n[i])
            .transition()
            .delay(200 * (i + 1))
            .duration(1500)
            .attr('height', (d, i) => SVG_H_R2 - BUFFER - 2 - linearScaleHelper(Array.from(commonValue), 0, BUFFER, SVG_H_R2 - 2 * BUFFER)(d[2]))
    });

SETS_SVG.append('g')
    .attr('id', 'common')
    .selectAll('text')
    .data(commonArray)
    .join('text')
    .text((d, i) => {
        if (d[0] == 0) return 'North'
        if (d[0] == 1) return 'East'
        if (d[0] == 2) return 'South'
        if (d[0] == 3) return 'West'
    })
    .attr('x', (_d, i) => linearScaleHelper(0, grouped.length - 1, BUFFER, SVG_W_R2 - BUFFER - groupedWidth)(i) + groupedWidth / 2)
    .attr('y', SVG_H_R2 - 5)
    .style('text-anchor', 'middle')
    .style('fill', 'gray')
    .style('font-size', '11')
    .style('font-weight', '500')

/**
 * Legend
 */

d3.select('#legend')
    .selectAll('p')
    .data(commonArray)
    .join('p')
    .text(d => ABBR.get(d[1]))
    .style('background-color', d => catColourScale(d[1]));

