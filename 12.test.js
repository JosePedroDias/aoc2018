const { parseInput, nextGeneration, measure, question1 } = require('./12');
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

it('nextGeneration', () => {
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

it('measure', () => {
  expect(measure('..#..', 0)).toBe(2);
  expect(measure('.#..', 0)).toBe(1);
  expect(measure('#...#', 2)).toBe(0);
});

it('question 1 example', () => {
  const [init, rules] = parseInput(EXAMPLE_LINES);
  const sum = question1(init, rules);
  expect(sum).toBe(325); // is returning 202
});

xit('question 1', () => {
  const [init, rules] = parseInput(LINES);
  const sum = question1(init, rules);
  expect(sum).toBe(0); // TODO calc after example works
});
