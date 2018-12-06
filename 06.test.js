const { parseLine, manhattanDist, nearestToPos } = require('./06');

const { fileAsLines } = require('./generic');

//const LINES = fileAsLines('./06.input.txt');

const EXAMPLE_LINES = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`.split('\n');

it('parseLine', () => {
  const items = EXAMPLE_LINES.map(parseLine);
  // console.log(items);
});

it('manhattanDist', () => {
  expect(manhattanDist([2, 3], [3, 1])).toBe(3);
  expect(manhattanDist([-1, -1], [-3, -1])).toBe(2);
  expect(manhattanDist([50, 30], [50, 30])).toBe(0);
});

it('nearestToPos', () => {
  const positions = EXAMPLE_LINES.map(parseLine);
  expect(nearestToPos([1, 0], positions, manhattanDist)).toBe(0);
  expect(nearestToPos([4, 0], positions, manhattanDist)).toBe(undefined);
  expect(nearestToPos([5, 0], positions, manhattanDist)).toBe(2);
});
