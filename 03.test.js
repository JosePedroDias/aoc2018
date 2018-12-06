const { parseLine, calcExtension } = require('./03');

const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./03.input.txt');

const EXAMPLE_LINES = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`.split('\n');

it('parseLine', () => {
  expect(parseLine('#123 @ 3,2: 5x4')).toEqual([123, 3, 2, 5, 4]);
});

it('parseLines', () => {
  const evs = EXAMPLE_LINES.map(parseLine);
  console.log(evs);

  const ext = calcExtension(evs);
  console.log(ext);
  //expect(parseLine('#123 @ 3,2: 5x4')).toEqual([123, 3, 2, 5, 4]);
});
