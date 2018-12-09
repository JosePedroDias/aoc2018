const { parseLine, cellsToFill, question1, question2 } = require('./03');

const { fileAsLines } = require('./generic');

const LINES = fileAsLines('./03.input.txt');

const EXAMPLE_LINES = `#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2`.split('\n');

it('parseLine', () => {
  expect(parseLine('#123 @ 3,2: 5x4')).toEqual([123, 3, 2, 5, 4]);
});

it('cellsToFill', () => {
  expect(cellsToFill(3, 2, 5, 4)).toEqual([
    '3,2',
    '4,2',
    '5,2',
    '6,2',
    '7,2',
    '3,3',
    '4,3',
    '5,3',
    '6,3',
    '7,3',
    '3,4',
    '4,4',
    '5,4',
    '6,4',
    '7,4',
    '3,5',
    '4,5',
    '5,5',
    '6,5',
    '7,5'
  ]);
});

it('question 1 example', () => {
  const events = EXAMPLE_LINES.map(parseLine);
  const answer = question1(events);
  expect(answer).toBe(4);
});

it('question 1', () => {
  const events = LINES.map(parseLine);
  const answer = question1(events);
  expect(answer).toBe(109716);
});

it('question 2 example', () => {
  const events = EXAMPLE_LINES.map(parseLine);
  const answer = question2(events);
  expect(answer).toEqual([3]);
});

it('question 2', () => {
  const events = LINES.map(parseLine);
  const answer = question2(events);
  expect(answer).toEqual([124]);
});
