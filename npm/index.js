var start = new Date(2021, 00, 01);
var end = new Date(2021, 00, 18);

var milisecondsDay = 24 * 60 * 60 * 1000;

var result = (end - start) / milisecondsDay;

console.log(result);