const {
  parseInput,
  convertFromString,
  convertToString,
  nextGeneration,
  measure,
  question1
} = require('./12');
const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./12.input.txt');

const EXAMPLE_LINES = `initial state: #..#.#..##......###...###

...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`.split('\n');

it('parseInput', () => {
  const [init, rules] = parseInput(EXAMPLE_LINES);
  expect(init).toBe('#..#.#..##......###...###');
  expect(rules).toEqual([
    ['...##', '#'],
    ['..#..', '#'],
    ['.#...', '#'],
    ['.#.#.', '#'],
    ['.#.##', '#'],
    ['.##..', '#'],
    ['.####', '#'],
    ['#.#.#', '#'],
    ['#.###', '#'],
    ['##.#.', '#'],
    ['##.##', '#'],
    ['###..', '#'],
    ['###.#', '#'],
    ['####.', '#']
  ]);
});

it('convertFromString', () => {
  expect(convertFromString('###.#', -2)).toEqual(new Set([-2, -1, 0, 2]));
  expect(convertFromString('#..#.#..##......###...###', 0)).toEqual(
    new Set([0, 3, 5, 8, 9, 16, 17, 18, 22, 23, 24])
  );
});

xit('convertToString', () => {
  expect(convertToString(new Set([-2, -1, 0, 2]))).toBe('###.#');
  expect(
    convertToString(new Set([0, 3, 5, 8, 9, 16, 17, 18, 22, 23, 24]))
  ).toBe('#..#.#..##......###...###');
});

xit('nextGeneration', () => {
  x;
  expect(
    nextGeneration('#..#.#..##......###...###', [
      ['...##', '#'],
      ['..#..', '#'],
      ['.#...', '#'],
      ['.#.#.', '#'],
      ['.#.##', '#'],
      ['.##..', '#'],
      ['.####', '#'],
      ['#.#.#', '#'],
      ['#.###', '#'],
      ['##.#.', '#'],
      ['##.##', '#'],
      ['###..', '#'],
      ['###.#', '#'],
      ['####.', '#']
    ])
  ).toBe('.#...#....#.....#..#..#..#.'); // returns . before and after
});

xit('measure', () => {
  expect(measure('..#..', 0)).toBe(2);
  expect(measure('.#..', 0)).toBe(1);
  expect(measure('#...#', 2)).toBe(0);
});

it('question 1 example', () => {
  const [init, rules] = parseInput(EXAMPLE_LINES);
  const sum = question1(init, rules);
  expect(sum).toBe(325);
});

it('question 1', () => {
  const [init, rules] = parseInput(LINES);
  const sum = question1(init, rules);
  expect(sum).toBe(3793);
});

fit('question 2', () => {
  const [init, rules] = parseInput(EXAMPLE_LINES);
  const sum = question1(init, rules, 50000000000);
  expect(sum).toBe(325);
});
