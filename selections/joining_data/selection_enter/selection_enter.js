const svg = d3.select('svg');
const createCirle = (obj, cx, cy, r) =>
    obj.append('circle')
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', r);

const setup = () => {
    createCirle(svg, 150, 50, 40);
    createCirle(svg, 150, 150, 30);
}
const submitClickHandler = (e) => {
    // Get new data
    const data = [10, 20, 30, 40];

    // Update existing circles
    const circles = svg.selectAll('circle').data(data).attr('r', d => d);

    const el = svg._groups[0][0];

    // Create new circle(s)
    createCirle(
        circles.enter(),
        (d) => Math.random() * el.clientWidth - d,
        (d) => Math.random() * el.clientHeight - d,
        (d) => d
    );

    // Disable button
    document.getElementById('button').disabled = true;
}

setup();

// Add click event to submit button
document.querySelector('#button').addEventListener('click', submitClickHandler);
