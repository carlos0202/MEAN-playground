const d3 = require('d3-time');

var start = new Date(2021, 02, 01);
var end = new Date(2021, 03, 01);

var result = d3.timeDay.count(start, end);

console.log(result);