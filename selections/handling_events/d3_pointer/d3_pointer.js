const svg = d3.select('svg');

// Without target
svg.on('click', (e, _d) => {
    const pointer = d3.pointer(e);
    console.log(`SVG click... X:${pointer[0]} Y:${pointer[1]}`);
});

const circle = svg.select('circle');

// With target
circle.on('click', (e, _d) => {
    const pointer = d3.pointer(e, 'svg');
    console.log(`Circle click... X:${pointer[0]} Y:${pointer[1]}`);
});
