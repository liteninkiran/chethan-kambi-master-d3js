const svg = d3.select('svg');

// Without target
svg.on('click', (e, _d) => {
    const pointers = d3.pointers(e);
    console.log(pointers);
});

const rect = svg.select('rect');

// With target
rect.on('click', (e, _d) => {
    const pointers = d3.pointers(e, 'svg');
    console.log(pointers);
});
