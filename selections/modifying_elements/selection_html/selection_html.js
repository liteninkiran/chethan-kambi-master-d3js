const heading = d3.select('h1');

console.log(heading.html());

heading.html('HTML');

console.log(heading.html());

const div = d3.select('#populate-me');
div.html('<h3>This is from D3!</h3>')

div.html(() => {
    let content = '';
    for (let i = 1; i <= 5; i++) {
        content += `<p>Paragraph with index: ${i}</p>`;
    }
    return content;
});
