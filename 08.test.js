const {
  tokenize,
  sumNums,
  countTreeTokens,
  traverseTree,
  parseNode,
  question1,
  question2
} = require('./08');

const { fileAsLines } = require('./generic');

const INPUT_TEXT = fileAsLines('./08.input.txt')[0];

const EXAMPLE_TEXT = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;

it('tokenize', () => {
  expect(tokenize('2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2')).toEqual([
    2,
    3,
    0,
    3,
    10,
    11,
    12,
    1,
    1,
    0,
    1,
    99,
    2,
    1,
    1,
    2
  ]);
});

it('sumNums', () => {
  expect(sumNums([1, 2, 3])).toBe(6);
});

it('countTreeTokens', () => {
  const n0 = {
    children: [{ children: [], metadata: [1, 2] }],
    metadata: [1, 2, 3]
  };
  expect(countTreeTokens(n0)).toBe(9); // ( 2 3 (2 2) )
});

xit('parseNode', () => {
  const tokens = tokenize(EXAMPLE_TEXT);
  const tree = parseNode(tokens, 0);
  console.log(tree);
});

it('traverseTree', () => {
  const tokens = tokenize(EXAMPLE_TEXT);
  const tree = parseNode(tokens, 0);
  const visits = [];
  function fn(node, d, b) {
    // console.log(`node ${d} ${b}:`);
    visits.push([d, b]);
  }
  traverseTree(tree, fn);
  expect(visits).toEqual([[0, 0], [1, 0], [1, 1], [2, 0]]);
});

it('question 1 example', () => {
  const tokens = tokenize(EXAMPLE_TEXT);
  const tree = parseNode(tokens, 0);
  expect(question1(tree)).toBe(138);
});

it('question 1', () => {
  const tokens = tokenize(INPUT_TEXT);
  const tree = parseNode(tokens, 0);
  expect(question1(tree)).toBe(47244);
});

it('question 2 example', () => {
  const tokens = tokenize(EXAMPLE_TEXT);
  const tree = parseNode(tokens, 0);
  expect(question2(tree)).toBe(66);
});

it('question 2', () => {
  const tokens = tokenize(INPUT_TEXT);
  const tree = parseNode(tokens, 0);
  expect(question2(tree)).toBe(17267);
});
