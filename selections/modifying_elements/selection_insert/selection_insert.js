// Find the first SVG
const svg1 = d3.select('#svg1');

// Create a <text> element
const text1 = svg1.insert('text');

// Set value/attributes
text1.text('Inserted with the text() method')
    .attr('x', 5)
    .attr('y', 40);

// Create another <text> element
const text2 = svg1.insert('text', 'text')
    .text('Inserted with the text() method using the "before" selector')
    .attr('x', 5)
    .attr('y', 20);

// Create another <text> element
const text3 = svg1.insert('text')
    .text('Inserted with the text() method without using the "before" selector')
    .attr('x', 5)
    .attr('y', 60);

// Find the second SVG
const svg2 = d3.select('#svg2');

for (let i = 0; i < 2; i++) {
    svg2.insert(
        () => document.createElementNS('http://www.w3.org/2000/svg', 'text'),
        function () {
            return this.firstElementChild;
        }
    )
    .text(`${i}`)
    .attr('x', 5)
    .attr('y', `${i * 20 + 20}`);
}

