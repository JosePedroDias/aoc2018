const { parseLine } = require('./06');

const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./06.input.txt');

it('parseLine', () => {
  const items = LINES.map(parseLine);
  console.log(items);
});
