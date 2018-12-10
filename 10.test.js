const { parseLine } = require('./10');

it('parseLine', () => {
  expect(parseLine('position=< 9,  1> velocity=< 0,  2>')).toEqual([
    [9, 1],
    [0, 2]
  ]);
});
