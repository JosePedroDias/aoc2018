const { parseInput, printScreen, nextStep } = require('./13');
const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./13.input.txt');

const EXAMPLE_LINES = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `.split('\n');

it('parseInput', () => {
  // console.log(EXAMPLE_LINES.join('\n'));
  expect(parseInput(EXAMPLE_LINES)).toEqual({
    dimensions: [13, 6],
    circuits: [[0, 0, 4, 4], [7, 1, 12, 4], [2, 2, 9, 5]],
    intersections: [[4, 2], [7, 2], [2, 4], [9, 4]],
    cars: [[2, 0, 0], [9, 3, 3]]
  });
});

it('printScreen', () => {
  const st = {
    dimensions: [13, 6],
    circuits: [[0, 0, 4, 4], [7, 1, 12, 4], [2, 2, 9, 5]],
    intersections: [[4, 2], [7, 2], [2, 4], [9, 4]],
    cars: [[2, 0, 0], [9, 3, 3]]
  };
  expect(printScreen(st)).toEqual(EXAMPLE_LINES.join('\n'));
});

it('nextStep', () => {});
