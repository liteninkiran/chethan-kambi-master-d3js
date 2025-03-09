const circles = d3.selectAll('circle');
const data = [15, 15, 15];
const circlesData = circles.data(data);
const exit = circlesData.exit();

exit.remove();

circles.attr('r', d => d);
