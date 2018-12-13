const { parseInput, question1 } = require('./12');
const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./12.input.txt');

// console.log('a');
const [init, rules] = parseInput(LINES);
// console.log('x');
const sum = question1(init, rules, 50000000000);
console.log('SUM:', sum);
