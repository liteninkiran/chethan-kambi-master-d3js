// d3.scaleTime()

const scaleTime = d3.scaleTime();

// console.log(scaleTime.domain()); // [Sat Jan 01 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sun Jan 02 2000 00:00:00 GMT+0000 (Greenwich Mean Time)]
// console.log(scaleTime.range()); // [0, 1]
// console.log(scaleTime(new Date(2000, 0, 2, 11, 46, 27))); // 1.4905902777777

let myDate = new Date();

// console.log(myDate); // Wed Mar 12 2025 10:59:24 GMT+0000 (Greenwich Mean Time)

// Date(y, m, d, h, m, s, ms) months are zero indexed
myDate = new Date(2000, 0, 2, 11, 46, 27, 1234);

// console.log(myDate); // Sun Jan 02 2000 11:46:28 GMT+0000 (Greenwich Mean Time)

const startDate = new Date(2000, 0, 1);
const endDate = new Date(2000, 0, 31);

scaleTime.domain([startDate, endDate]);
scaleTime.range([1, 31]);

// console.log(scaleTime.domain()); // [Sat Jan 01 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Mon Jan 31 2000 00:00:00 GMT+0000 (Greenwich Mean Time)]
// console.log(scaleTime.range()); // [1, 31]
// console.log(scaleTime(startDate)); // 1
// console.log(scaleTime.invert(26)); // Wed Jan 26 2000 00:00:00 GMT+0000 (Greenwich Mean Time)

const newTimeScale = scaleTime.copy();
newTimeScale.rangeRound([1, 10]);
// console.log(newTimeScale(new Date(2000, 0, 21))); // 7

scaleTime.clamp(true);
// console.log(scaleTime(new Date(2000, 1, 21))); // 31

scaleTime.clamp(false);
// console.log(scaleTime(new Date(2000, 1, 21))); // 52

const colour = d3.scaleTime()
    .domain([startDate, endDate])
    .range(['yellow', 'green'])
    .interpolate(d3.interpolateHcl);

// console.log(colour(endDate)); // rgb(0, 128, 0)
// console.log(colour(new Date(2000, 0, 10))); // rgb(180, 218, 0)

let ticks = scaleTime.ticks();
// console.log(ticks); // [Sat Jan 01 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Mon Jan 03 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Wed Jan 05 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Fri Jan 07 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sun Jan 09 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Tue Jan 11 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Thu Jan 13 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sat Jan 15 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Mon Jan 17 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Wed Jan 19 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Fri Jan 21 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sun Jan 23 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Tue Jan 25 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Thu Jan 27 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sat Jan 29 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Mon Jan 31 2000 00:00:00 GMT+0000 (Greenwich Mean Time)]


const ticks2 = scaleTime.ticks(d3.timeDay.every(5));
// console.log(ticks2); // [Sat Jan 01 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Thu Jan 06 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Tue Jan 11 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sun Jan 16 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Fri Jan 21 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Wed Jan 26 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Mon Jan 31 2000 00:00:00 GMT+0000 (Greenwich Mean Time)]

ticks = scaleTime.ticks(5);
let tickFormat = scaleTime.tickFormat(5, '%b %d');
let map = ticks.map(tickFormat);
// console.log(map); // ['Jan 02', 'Jan 09', 'Jan 16', 'Jan 23', 'Jan 30']

const interval = d3.timeDay.every(7);
ticks = scaleTime.ticks(interval);
tickFormat = scaleTime.tickFormat(interval, '%b %d');
map = ticks.map(tickFormat);
// console.log(map); // ['Jan 01', 'Jan 08', 'Jan 15', 'Jan 22', 'Jan 29']

// console.log(scaleTime.nice().ticks()); // [Sat Jan 01 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Mon Jan 03 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Wed Jan 05 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Fri Jan 07 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sun Jan 09 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Tue Jan 11 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Thu Jan 13 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sat Jan 15 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Mon Jan 17 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Wed Jan 19 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Fri Jan 21 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sun Jan 23 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Tue Jan 25 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Thu Jan 27 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Sat Jan 29 2000 00:00:00 GMT+0000 (Greenwich Mean Time), Mon Jan 31 2000 00:00:00 GMT+0000 (Greenwich Mean Time)]


