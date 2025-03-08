const movies = [
    {
        id: 1,
        name: 'Avengers: Endgame',
        contentRating: '12A',
        duration: 181,
        starRating: 8.4,
        votes: 747374,
        gross: 858,
    },
    {
        id: 2,
        name: 'The Lion King',
        contentRating: 'PG',
        duration: 118,
        starRating: 6.9,
        votes: 198014,
        gross: 544,
    },
    {
        id: 3,
        name: 'Star Wars: The Rise of Skywalker',
        contentRating: '12A',
        duration: 141,
        starRating: 6.6,
        votes: 343828,
        gross: 515,
    },
    {
        id: 4,
        name: 'Frozen 2',
        contentRating: 'U',
        duration: 103,
        starRating: 6.9,
        votes: 120859,
        gross: 477,
    },
    {
        id: 5,
        name: 'Toy Story 4',
        contentRating: 'U',
        duration: 100,
        starRating: 7.8,
        votes: 187391,
        gross: 434,
    },
    {
        id: 6,
        name: 'Captain Marvel',
        contentRating: '12A',
        duration: 123,
        starRating: 6.9,
        votes: 420459,
        gross: 427,
    },
    {
        id: 7,
        name: 'Spider-Man: Far From Home',
        contentRating: '12A',
        duration: 129,
        starRating: 7.5,
        votes: 301963,
        gross: 391,
    },
    {
        id: 8,
        name: 'Aladdin',
        contentRating: 'U',
        duration: 128,
        starRating: 7.0,
        votes: 213479,
        gross: 356,
    },
    {
        id: 9,
        name: 'Joker',
        contentRating: '15',
        duration: 122,
        starRating: 8.5,
        votes: 840556,
        gross: 335,
    },
    {
        id: 10,
        name: 'Jumanji: The Next Level',
        contentRating: 'PG',
        duration: 123,
        starRating: 6.7,
        votes: 163288,
        gross: 317,
    },
];

const colours = [
    {
        id: 1,
        name: 'Blue',
        hex: '#4698BC',
        rgb: {
            red: 70,
            green: 152,
            blue: 188,
        },
    },
    {
        id: 2,
        name: 'Green',
        hex: '#6BBB5D',
        rgb: {
            red: 107,
            green: 187,
            blue: 93,
        },
    },
    {
        id: 3,
        name: 'Orange',
        hex: '#E18731',
        rgb: {
            red: 225,
            green: 135,
            blue: 49,
        },
    },
    {
        id: 4,
        name: 'Purple',
        hex: '#A86CC5',
        rgb: {
            red: 168,
            green: 108,
            blue: 197,
        },
    },
    {
        id: 5,
        name: 'Pink',
        hex: '#DF5D99',
        rgb: {
            red: 223,
            green: 93,
            blue: 153,
        },
    },
    {
        id: 6,
        name: 'Teal',
        hex: '#48AA9F',
        rgb: {
            red: 72,
            green: 170,
            blue: 159,
        },
    },
    {
        id: 7,
        name: 'Salmon',
        hex: '#EE7447',
        rgb: {
            red: 238,
            green: 116,
            blue: 71,
        },
    },
    {
        id: 8,
        name: 'Light Blue',
        hex: '#8BC8D3',
        rgb: {
            red: 139,
            green: 200,
            blue: 211,
        },
    },
    {
        id: 9,
        name: 'Light Green',
        hex: '#BCDE85',
        rgb: {
            red: 188,
            green: 222,
            blue: 133,
        },
    },
    {
        id: 10,
        name: 'Light Orange',
        hex: '#F5AC91',
        rgb: {
            red: 245,
            green: 172,
            blue: 145,
        },
    },
    {
        id: 11,
        name: 'Light Purple',
        hex: '#B4ACE3',
        rgb: {
            red: 180,
            green: 172,
            blue: 227,
        },
    },
    {
        id: 12,
        name: 'Light Pink',
        hex: '#DEA1D1',
        rgb: {
            red: 222,
            green: 161,
            blue: 209,
        },
    },
    {
        id: 13,
        name: 'Light Teal',
        hex: '#96D1B4',
        rgb: {
            red: 150,
            green: 209,
            blue: 180,
        },
    },
    {
        id: 14,
        name: 'Light Salmon',
        hex: '#F4A3A0',
        rgb: {
            red: 244,
            green: 163,
            blue: 160,
        },
    },

];

// Properties
const cols = 2;
const rows = Math.ceil(movies.length / cols);
const div = document.getElementById('movielist');
const divWidth = (div.clientWidth / cols - 10);
const divHeight = (div.clientHeight - ((rows - 1) * 10)) / rows;
const divWidthPx = divWidth.toString() + 'px';
const divHeightPx = divHeight.toString() + 'px';
const numberFormatter = new Intl.NumberFormat();
const movieListSelector = '#movielist';
const movieListDivSelector = `${movieListSelector} div`;
const submitSelector = '#choicesubmit input[type=submit]';
const ratings = ['U', 'PG', '12A', '15'];

// Methods
const getColour = (i) => `rgb(
    ${colours[i].rgb.red},
    ${colours[i].rgb.green},
    ${colours[i].rgb.blue}
)`;
const createMovieDiv = () => d3.select('#movielist')
    .append('div')
    .style('width', divWidthPx)
    .style('height', divHeightPx)
    .style('line-height', divHeightPx)
    .attr('class', 'movieselect');
const setUpMovieDiv = (movie) => {
    movie.colour = getColour(movie.id);
    createMovieDiv();
}
const setMovieDivText = (_d, i, n) => n[i].innerText = movies[i].name;
const searchMovie = (name) => movies.find((movie) => movie.name === name);
const getMoviePostHtml = (movie) => `
    <h2>${movie.name.toUpperCase()}</h2>
    <p>Rating: <span>${movie.contentRating}</span></p>
    <p>Duration: <span>${movie.duration} minutes</span></p>
    <p>Star Rating: <span>${movie.starRating}</span></p>
    <p>Total Votes: <span>${numberFormatter.format(movie.votes)}</span></p>
    <p>Gross Collection: <span>$${(movie.gross)}M</span></p>
`;
const movieListClickHandler = (e) => d3.select('#moviepost')
    .html(getMoviePostHtml(searchMovie(e.target.innerText)));
const getIdFromLabel = (label) => `#cb${label.toLowerCase()}`;
const getCheckboxByLabel = (label) => d3.select(getIdFromLabel(label));
const getCheckedPropertyByLabel = (label) => getCheckboxByLabel(label).property('checked');
const setChoiceMap = (map, label) => map.set(label, getCheckedPropertyByLabel(label));

const updateContentRating = (selectedMovies) => {
    d3.select('#cont').html(null);
    const uniqueSet = new Set();
    const counts = [0, 0, 0, 0];
    const updateCounts = (movie) => {
        if (movie.contentRating === 'U') {
            counts[0] += 1;
        } else if (movie.contentRating === 'PG') {
            counts[1] += 1;
        } else if (movie.contentRating === '12A') {
            counts[2] += 1;
        } else if (movie.contentRating === '15') {
            counts[3] += 1;
        }
    }
    const getHtml = (count, rating) => `
        <h2>${count}</h2>
        <p>"${rating}" rating movie(s) selected</p>
    `;

    movies.forEach((movie) => uniqueSet.add(movie.contentRating));
    uniqueSet.forEach(() => d3.select('#cont').append('div'));
    selectedMovies.forEach(updateCounts);
    const selectorParts = ['#cont div:nth-child(', 0, ')'];

    let div;

    ratings.forEach((rating, index) => {
        selectorParts[1] = index + 1;
        div = d3.select(selectorParts.join(''));
        div.html(getHtml(counts[index], rating));
    });
}
const updateLegend = (selectedMovies) => {
    const legend = d3.select('#legend');
    legend.html(null);
    selectedMovies.forEach((movie) => {
        const div = legend.append('div');
        div.append('div')
            .style('width', '15px')
            .style('height', '15px')
            .style('background-color', movie.colour);
        div.append('p').text(`${movie.name}`);
    });
}
const updateBarChart = (selectedMovies, selector, prop, title) => {
    // Find chart area
    const chartArea = d3.select(selector);

    // Find width of chart area
    const maxWidth = chartArea._groups[0][0].clientWidth;

    // Find maximum property value
    const maxVal = Math.max(...selectedMovies.map(movie => movie[prop]));

    // Define a buffer for max width
    const buffer = 50;

    // Definition for creating horizontal bars
    const appendRect = (movie) => chartArea.append('rect')
        .attr('width', `${movie[prop] / maxVal * maxWidth - buffer}`)
        .attr('height', '20')
        .attr('x', '0')
        .attr('y', `${movie.index * 25 + 25}`)
        .style('fill', `${movie.colour}`);

    // Definition for creating data values next to bars
    const appendText = (movie) => chartArea.append('text')
        .text(`${movie[prop]}`)
        .attr('x', `${movie[prop] / maxVal * maxWidth - buffer + 5}`)
        .attr('y', `${movie.index * 25 + 40}`)
        .style('font-size', '14')
        .style('fill', 'rgb(63,63,63)');

    // Remove existing visuals/title
    chartArea.selectAll('text').remove();
    chartArea.selectAll('rect').remove();

    // Create bar chart
    selectedMovies.forEach((movie) => {
        appendRect(movie);
        appendText(movie);
    });

    // Add a title
    chartArea.insert('text', 'rect')
        .text(title)
        .attr('x', '0')
        .attr('y', '15')
        .style('font-size', '16')
        .style('font-weight', '600')
        .style('fill', 'rgb(63, 63, 63)');
}
const updateVotes = (selectedMovies) => {
    // Find votes SVG
    const votes = d3.select('#votes')

    // Clear the voting area
    votes.selectAll('text').remove();
    votes.selectAll('circle').remove();
  
    let cxValue = 0;
    let xValue = 0;

    const scaleFactor = 20000;
    const cy = 150;
    const xOffset = (movie) => 60 + movie.votes / scaleFactor;
    const yOffset = (movie) => cy - 10 - movie.votes / scaleFactor;

    // Definition for creating circles
    const appendCircle = (movie) => votes.append('circle')
        .attr('r', `${movie.votes / scaleFactor}`)
        .attr('cx', cxValue += xOffset(movie))
        .attr('cy', cy)
        .style('fill', `${movie.colour}`);
    
    // Definition for creating data values next to circles
    const appendText = (movie) => votes.append('text')
        .text(`${numberFormatter.format(movie.votes)}`)
        .attr('text-anchor', 'middle')
        .attr('x', xValue += xOffset(movie))
        .attr('y', yOffset(movie))
        .style('font-size', '14')
        .style('fill', 'rgb(63,63,63)');

    // Create bubble chart
    selectedMovies.forEach((movie) => {
        appendCircle(movie);
        appendText(movie);
    });

    // Add a title
    votes.insert('text', 'circle')
      .text('Number of Votes')
      .attr('x', '0')
      .attr('y', '15')
      .style('font-size', '16')
      .style('font-weight', '600')
      .style('fill', 'rgb(63,63,63)');
}
const getRatingsMap = () => {
    const map = new Map();
    ratings.forEach(rating => setChoiceMap(map, rating));
    return map;
}
const submitClickHandler = (e) => {
    e.preventDefault();
    const map = getRatingsMap();
    const mapArray = [...map];
    const filteredArray = mapArray.filter(([_k, v]) => v === true);
    const hasSelection = filteredArray.length > 0;
    document.getElementById('feedback').innerText = hasSelection ? '' : 'Select at least one';

    if (hasSelection) {
        const selectedRatings = Array.from((new Map(filteredArray)).keys());
        const selectedMovies = movies.filter(movie => selectedRatings.includes(movie.contentRating));

        let index = 0;
        selectedMovies.forEach((movie) => movie.index = index++);

        updateContentRating(selectedMovies);
        updateLegend(selectedMovies);
        updateBarChart(selectedMovies, '#gross', 'gross', 'Gross collections in USD Million');
        updateBarChart(selectedMovies, '#dura', 'duration', 'Duration in Minutes');
        updateVotes(selectedMovies);
    }
}

// Create movie <div> elements
movies.forEach(setUpMovieDiv);

// Set movie names
d3.selectAll(movieListDivSelector).select(setMovieDivText);

// Add click event to movie list
document.querySelector(movieListSelector).addEventListener('click', movieListClickHandler);

// Add click event to submit button
document.querySelector(submitSelector).addEventListener('click', submitClickHandler);
