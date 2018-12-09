const { question1 } = require('./09');

const {} = require('./generic');

it('question 1', () => {
  expect(question1(10, 1618)).toBe(8317);
  expect(question1(13, 7999)).toBe(146373);
  expect(question1(17, 1104)).toBe(2764);
  expect(question1(21, 6111)).toBe(54718);
  expect(question1(30, 5807)).toBe(37305);
});
