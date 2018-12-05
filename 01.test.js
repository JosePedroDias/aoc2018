const { f1, f2 } = require('./01');
const { fileAsLines } = require('./generic');

const CHANGES = fileAsLines('./01.input.txt').map((l) => parseInt(l, 10));

/*
0, [1, -2, 3, 1] => 3
0, [1, 1, 1] => 3
0, [1, 1, -2] => 0
0, [-1, -2, -3] => -6
*/

it('ex 1.1', () => {
  expect(f1(0, [1, -2, 3, 1])).toBe(3);
});

it('ex 1.2', () => {
  expect(f1(0, [1, 1, 1])).toBe(3);
});

it('ex 1.3', () => {
  expect(f1(0, [1, 1, -2])).toBe(0);
});

it('ex 1.4', () => {
  expect(f1(0, [-1, -2, -3])).toBe(-6);
});

/*
https://adventofcode.com/2018/day/1/input -> 01.input.txt
*/

it('question 1', () => {
  expect(f1(0, CHANGES)).toBe(437);
});

/*
0, [1, -2, 3, 1] => 2
0, [1, -1] => 0
0, [3, 3, 4, -2, -4] => 10
0, [-6, 3, 8, 5, -6] => 5
0, [7, 7, -2, -7, -4] => 14
*/

it('ex 2.1', () => {
  expect(f2(0, [1, -2, 3, 1])).toBe(2);
});

xit('ex 2.2', () => {
  expect(f2(0, [1, -1])).toBe(0);
});

it('ex 2.3', () => {
  expect(f2(0, [3, 3, 4, -2, -4])).toBe(10);
});

it('ex 2.4', () => {
  expect(f2(0, [-6, 3, 8, 5, -6])).toBe(5);
});

it('ex 1.5', () => {
  expect(f2(0, [7, 7, -2, -7, -4])).toBe(14);
});

it('question 2', () => {
  expect(f2(0, CHANGES)).toBe(0);
});
