// A transition is a selection-like interface for animating changes to the DOM.
// Instead of applying changes instantaneously, transitions smoothly interpolate
// the DOM from its current state to the desired target state over a given duration.

const SVG_WIDTH = document.querySelector('svg').clientWidth;
const SVG_HEIGHT = document.querySelector('svg').clientHeight;

const rectData = [...Array(13).keys()].map(i => (i + 1) * 10);

const allRect = d3.select('svg')
    .selectAll('rect')
    .data(rectData)
    .join('rect')
    .attr('x', (d, i) => (i * SVG_WIDTH / rectData.length))
    .attr('y', d => SVG_HEIGHT - d * 3)
    .attr('width', SVG_WIDTH / rectData.length - 2)
    .attr('rx', '5')
    .attr('ry', '5')

// CREATE A TRANSITION ON RECT ELEMENTS

// There are 2 ways to set transitions
// 1. using the selection.transition(), followed by other transition methods
//    (delay, ease and duration)
// 2. create a transition object using d3.transition(), followed by other 
//    transition methods and then call the transition() method on the selection 
//    and then pass the transition object into the transition() method

// Just duration is enough to see the transitions
// If delay needed then delay --> duration
// If duartion and ease needed then ease --> duration
// If all three needed then delay --> ease --> duration

let justDuration = () => allRect
    .transition()
    .duration(2000)
    .attr('height', d => d * 3)
    .transition()
    .duration(2000)
    .style('fill', 'pink');

let durationAndDelay = () => allRect
    .transition()
    .delay(1000)
    .duration(2000)
    .attr('height', d => d * 3)
    .transition()
    .delay(1000)
    .duration(2000)
    .style('fill', 'salmon');

let durationAndEase = () => allRect
    .transition()
    .ease(d3.easeBounce)
    .duration(2000)
    .attr('height', d => d * 3)
    .transition()
    .ease(d3.easeBounce)
    .duration(5000)
    .style('fill', 'crimson');

let theFullMonty = () => allRect
    .transition()
    .delay(1000)
    .ease(d3.easeBounce)
    .duration(2000)
    .attr('height', d => d * 3)
    .transition()
    .delay(1000)
    .ease(d3.easeBounce)
    .duration(5000)
    .style('fill', 'slategrey');

// Process A

// 1. Just duration
// justDuration();

// 2. Duration and delay
// durationAndDelay();

// 3. Duration and ease
// durationAndEase();

// 4. All 3
// theFullMonty();

justDuration = () => {
    const trans = d3.transition().duration(2000);
    allRect.transition(trans)
        .attr('height', d => d * 3)
        .attr('fill', 'khaki');
}

durationAndDelay = () => {
    const trans = d3.transition()
        .delay(1000)
        .duration(2000);
    allRect.transition(trans)
        .attr('height', d => d * 3)
        .style('fill', 'khaki');
}

durationAndEase = () => {
    const trans = d3.transition()
        .ease(d3.easeExp)
        .duration(2000);
    allRect.transition(trans)
        .attr('height', d => d * 3)
        .style('fill', 'khaki');
}

theFullMonty = () => {
    const trans = d3.transition()
        .delay(1000)
        .ease(d3.easeCircleIn)
        .duration(2000);
    allRect
        .transition(trans)
        .attr('height', d => d * 3)
        .style('fill', 'khaki');
}

// Process B

// 1. Just duration
// justDuration();

// 2. Duration and delay
// durationAndDelay();

// 3. Duration and ease
// durationAndEase();

// 4. All 3
// theFullMonty();

// To control elements individually
allRect.each((d, i, n) => {
    d3.select(n[i])
        .transition()
        .delay(i * d)
        .duration(i * d)
        .attr('height', d => d * 3)
        .transition()
        .delay(i * d)
        .duration(i * d)
        .style('fill', d3.interpolateBlues((i + 1) / rectData.length))
});
