// This module provides sequential, diverging and categorical color schemes
const data = [...Array(20).keys()].map(i => i + 1);

// Create 20 rect elements (upper row)
const allRect1 = d3.select('svg')
    .append('g')
    .attr('id', 'rect1')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d, i) => (i * 30))
    .attr('y', '0')
    .attr('width', '29')
    .attr('height', '90');

// Create 20 rect elements (lower row)
const allRect2 = d3.select('svg')
    .append('g')
    .attr('id', 'rect2')
    .selectAll('rect')
    .data(data)
    .join('rect')
    .attr('x', (d, i) => (i * 30))
    .attr('y', '100')
    .attr('width', '29')
    .attr('height', '90');

// Categorical Colour Schemes
allRect1.style('fill', (d, i) => d3.schemeCategory10[i]);
allRect2.style('fill', (d, i) => d3.schemeTableau10[i]);

allRect1.style('fill', (d, i) => d3.schemeAccent[i]);
allRect1.style('fill', (d, i) => d3.schemeDark2[i]);
allRect1.style('fill', (d, i) => d3.schemePaired[i]);

allRect1.style('fill', (d, i) => d3.schemePastel1[i]);
allRect2.style('fill', (d, i) => d3.schemePastel2[i]);

allRect2.style('fill', (d, i) => d3.schemeSet1[i]);
allRect2.style('fill', (d, i) => d3.schemeSet2[i]);
allRect2.style('fill', (d, i) => d3.schemeSet3[i]);

// Diverging Colour Schemes
allRect1.style('fill', (d, i) => d3.interpolateBrBG((i + 1) / 20));
allRect1.style('fill', (d, i) => d3.interpolatePRGn((i + 1) / 20));

allRect2.style('fill', (d, i) => d3.schemeBrBG[3][(i % 3)]);
allRect2.style('fill', (d, i) => d3.schemeBrBG[7][(i % 7)]);
allRect2.style('fill', (d, i) => d3.schemeBrBG[11][(i % 11)]);

allRect2.style('fill', (d, i) => d3.schemePRGn[3][(i % 3)]);
allRect2.style('fill', (d, i) => d3.schemePRGn[7][(i % 7)]);
allRect2.style('fill', (d, i) => d3.schemePRGn[11][(i % 11)]);


// Other 2-Tone-Combos

// d3.interpolatePiYG(t)
// d3.schemePiYG[k]
// ---
// d3.interpolatePuOr(t)
// d3.schemePuOr[k]
// ---
// d3.interpolateRdBu(t)
// d3.schemeRdBu[k]
// ---
// d3.interpolateRdGy(t)
// d3.schemeRdGy[k]
// ---
// d3.interpolatePuOr(t)
// d3.schemePuOr[k]
// ---

allRect1.style('fill', (d, i) => d3.interpolateRdYlBu((i + 1) / 20));
allRect1.style('fill', (d, i) => d3.interpolateRdYlGn((i + 1) / 20));
allRect1.style('fill', (d, i) => d3.interpolateSpectral((i + 1) / 20));

allRect2.style('fill', (d, i) => d3.schemeRdYlBu[3][(i % 3)]);
allRect2.style('fill', (d, i) => d3.schemeRdYlBu[7][(i % 7)]);
allRect2.style('fill', (d, i) => d3.schemeRdYlBu[11][(i % 11)]);

allRect2.style('fill', (d, i) => d3.schemeRdYlGn[3][(i % 3)]);
allRect2.style('fill', (d, i) => d3.schemeRdYlGn[7][(i % 7)]);
allRect2.style('fill', (d, i) => d3.schemeRdYlGn[11][(i % 11)]);

allRect2.style('fill', (d, i) => d3.schemeSpectral[3][(i % 3)]);
allRect2.style('fill', (d, i) => d3.schemeSpectral[7][(i % 7)]);
allRect2.style('fill', (d, i) => d3.schemeSpectral[11][(i % 11)]);


// Sequential (Single Hue)
allRect1.style('fill', (d, i) => d3.interpolateBlues((i + 1) / 20));
allRect2.style('fill', (d, i) => d3.schemeBlues[3][(i % 3)]);
allRect2.style('fill', (d, i) => d3.schemeBlues[6][(i % 6)]);
allRect2.style('fill', (d, i) => d3.schemeBlues[9][(i % 9)]);

// Other Single Hue

// d3.interpolateGreens(t)
// d3.schemeGreens[k]

// d3.interpolateGreys(t)
// d3.schemeGreys[k]

// d3.interpolateOranges(t)
// d3.schemeOranges[k]

// d3.interpolatePurples(t)
// d3.schemePurples[k]

// d3.interpolateReds(t)
// d3.schemeReds[k]

// Other 2 tone with t = 0 to 1 and k = 3 to 9
// d3.interpolateBuGn(t)
// d3.schemeBuGn[k]

// d3.interpolateBuPu(t)
// d3.schemeBuPu[k]

// d3.interpolateGnBu(t)
// d3.schemeGnBu[k]

// d3.interpolateOrRd(t)
// d3.schemeOrRd[k]

// d3.interpolatePuBu(t)
// d3.schemePuBu[k]

// d3.interpolatePuRd(t)
// d3.schemePuRd[k]

// d3.interpolateRdPu(t)
// d3.schemeRdPu[k]

// d3.interpolateYlGn
// d3.schemeYlGn[k]

// Other 3 tone with t = 0 to 1 and k = 3 to 9

// d3.interpolatePuBuGn(t)
// d3.schemePuBuGn[k]

// d3.interpolateYlGnBu(t)
// d3.schemeYlGnBu[k]

// d3.interpolateYlOrBr(t)
// d3.schemeYlOrBr[k]

// d3.interpolateYlOrRd(t)
// d3.schemeYlOrRd[k]



// Sequential (Multi Hue)
allRect1.style('fill', (d, i) => d3.interpolateTurbo((i + 1) / 20));
allRect2.style('fill', (d, i) => d3.interpolateViridis((i + 1) / 20));

// Others

// d3.interpolateInferno(t)
// d3.interpolateMagma(t)
// d3.interpolatePlasma(t)
// d3.interpolateCividis(t)
// d3.interpolateWarm(t)
// d3.interpolateCool(t)
// d3.interpolateCubehelixDefault(t)


// Cyclical
allRect1.style('fill', (d, i) => d3.interpolateRainbow((i + 1) / 20));
allRect2.style('fill', (d, i) => d3.interpolateSinebow((i + 1) / 20));


// Use of Colour Schemes on Scales
// Continuous - Linear Scale
let colour = d3.scaleLinear().domain([1, 20])
    .range([d3.interpolateOrRd(0), d3.interpolateOrRd(1)]);
allRect1.style('fill', d => colour(d));

// Sequential
colour = d3.scaleSequential().domain([1, 20])
    .range([d3.interpolatePlasma(0), d3.interpolatePlasma(1)]);
allRect2.style('fill', d => colour(d));

// Diverging
colour = d3.scaleDiverging().domain([1, 10, 20])
    .range([d3.interpolateCool(0), d3.interpolateCool(0.5), d3.interpolateCool(1)]);
allRect1.style('fill', d => colour(d));

// Quantize
colour = d3.scaleQuantize().domain([1, 20])
    .range([d3.interpolateWarm(0), d3.interpolateWarm(0.5), d3.interpolateWarm(1)]);
allRect2.style('fill', d => colour(d));

// Quantile
colour = d3.scaleQuantile()
    .domain([1, 5, 10, 15, 20])
    .range([d3.interpolatePlasma(0),
    d3.interpolatePlasma(0.25),
    d3.interpolatePlasma(0.5),
    d3.interpolatePlasma(0.75),
    d3.interpolatePlasma(1)]);
allRect1.style('fill', d => colour(d));

// Threshold
colour = d3.scaleThreshold()
    .domain([...data])
    .range([...d3.schemeCategory10, ...d3.schemeTableau10]);
allRect2.style('fill', d => colour(d));

// Ordinal
colour = d3.scaleOrdinal()
    .domain([1, 20])
    .range(d3.schemeDark2)
allRect1.style('fill', d => colour(d));

colour = d3.scaleOrdinal()
    .domain([1, 20])
    .range(d3.schemePastel2)
allRect2.style('fill', d => colour(d));
