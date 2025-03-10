const svg = d3.select('svg');
const click = 'click';
const svgClickHandler = (e, d) => svg.style('fill', 'pink');
const svgClickAndMouseOverHandler = (e, d) => svg.style('fill', e.type === 'click' ? 'green' : 'blue');
const svgMouseUpHandler = (e, d) => console.log(e, d);
const rectClickHandler = (e, d) => console.log(e, d);

svg.on(click, svgClickHandler);

// console.log(svg.on(click));

svg.on(click, null);

// console.log(svg.on(click));

svg.on(`${click} mousemove`, svgClickAndMouseOverHandler);

// console.log(svg.on(click));

svg.on('mouseup', svgMouseUpHandler);

svg.on('click', svgClickHandler);

// Remove all listeners
svg.on('.', null);

svg.selectAll('rect').on('click.1 click.2', rectClickHandler);

