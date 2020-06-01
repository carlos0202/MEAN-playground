const sums = require('./sum');
const mults = require('./multiplications');
const os = require('os');

// sums
console.info(sums.addTwoPlusTwo());
console.info(sums.addTwoNums(17, 3));

// multiplications
console.info(mults.multiplyTwo(81, 9));

// nodejs module
console.info(os.release());