const { parseLine, question1 } = require('./07');

const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./07.input.txt');

const EXAMPLE_LINES = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`.split('\n');

it('parse file', () => {
  expect(EXAMPLE_LINES.map(parseLine)).toEqual([
    ['C', 'A'],
    ['C', 'F'],
    ['A', 'B'],
    ['A', 'D'],
    ['B', 'E'],
    ['D', 'E'],
    ['F', 'E']
  ]);
});

it('question 1 ex', () => {
  const input = EXAMPLE_LINES.map(parseLine);
  expect(question1(input)).toBe('CABDFE');
});
