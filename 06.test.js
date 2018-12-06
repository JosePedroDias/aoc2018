const {
  parseLine,
  manhattanDist,
  nearestToPos,
  findLimits,
  indicesBetweenLimits,
  computeMatrix,
  drawPositions,
  question1,
  letters,
  LETTERS,
  letters50
} = require('./06');

const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./06.input.txt');

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
  expect(nearestToPos([5, 0], positions, manhattanDist)).toBe(undefined);
  expect(nearestToPos([6, 0], positions, manhattanDist)).toBe(2);
});

it('findLimits', () => {
  const positions = EXAMPLE_LINES.map(parseLine);
  const limits = findLimits(positions);
  const candidateIndices = indicesBetweenLimits(positions, limits);
  expect(candidateIndices).toEqual([3, 4]);
});

it('example', () => {
  const positions = EXAMPLE_LINES.map(parseLine);
  const limits = findLimits(positions);
  const m = computeMatrix(positions, limits, letters);
  drawPositions(m, positions, LETTERS);
  const s = m.toString();
  expect(s).toBe(`Aaaa.ccc
aaddeccc
adddeccC
.dDdeecc
b.deEeec
Bb.eeee.
bb.eeeff
bb.eefff
bb.ffffF`);
});

it('question 1 ex', () => {
  const positions = EXAMPLE_LINES.map(parseLine);
  const answer = question1(positions, letters);
  expect(answer).toBe(17);
});

it('question 1', () => {
  const positions = LINES.map(parseLine);
  const answer = question1(positions, letters50);
  expect(answer).toBe(6763); // failed too high: 6763
});
