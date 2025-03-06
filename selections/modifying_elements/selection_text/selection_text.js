const text1 = d3.select('text')

// console.log(text1.text()); // Blank | empty string

text1.text('Text 1');

// console.log(text1.text()); // Text 1

text1.text(null);

// console.log(text1.text()); // Blank | empty string

const texts = d3.selectAll('text');

texts.text('D3 is awesome!');
text1.text('Text 1');

// console.log(texts.text()); // Text 1

const getText = (_d, i, _n) => `This is a text on line ${i + 1} with index at n[${i}]`;
texts.text(getText);
