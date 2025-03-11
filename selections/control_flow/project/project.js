import { fruitData } from './fruitData.js';

// Set up the SVG
const svg = d3.select('#chart')
const svgWidth = svg.node().clientWidth;
const svgHeight = svg.node().clientHeight;
svg.attr('viewBox', `0 ${-svgHeight} ${svgWidth} ${svgHeight}`);

// Set up the chart
svg.selectAll('g')
    .data(fruitData)
    .join('g');

const groups = d3.selectAll('#chart g');

groups.each((d, i, n) => {
    const stack = (gElem, split) => {
        let height = 0;
        gElem.selectAll('rect')
          .data(split)
          .join('rect')
          .attr('width', svgWidth / 21)
          .attr('height', d => d * 5)
          .attr('x', svgWidth / 21 + (i * (2 * svgWidth / 21)))
          .attr('y', (_d, i) => (height += split[i]) * -5)
          .attr('rx', '10')
          .attr('ry', '10')
          .style('fill', (_d, i) => i == 0 ? 'skyblue' : i == 1 ? 'sandybrown' : 'palegreen');
    
        gElem.append('text')
          .data([fruitData[i]])
          .join('text')
          .attr('x', svgWidth / 21 + (i * (2 * svgWidth / 21)) - 15)
          .attr('y', '-250')
          .style('writing-mode', 'tb')
          .style('text-anchor', 'middle')
          .text(d => `${d.name} (${d.carbs}, ${d.fats}, ${d.protein})`)
          .style('fill', 'lightgoldenrodyellow')
          .style('font-weight', '500');
    }
    const gElement = d3.select(n[i]);
    gElement.call(stack, [d.carbs, d.fats, d.protein]);
});

