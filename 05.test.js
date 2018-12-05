const {
  isLowerCase,
  tokenize,
  untokenize,
  doTokensReact,
  doReactions
} = require('./05');
const { fileAsLines } = require('./generic');

const POLYMER_STRING = fileAsLines('./05.input.txt')[0];

it('isLowerCase', () => {
  expect(isLowerCase('a')).toBe(true);
  expect(isLowerCase('A')).toBe(false);
});

it('tokenize', () => {
  expect(tokenize('aABd')).toEqual([
    { kind: 'a', polarity: true },
    { kind: 'a', polarity: false },
    { kind: 'b', polarity: false },
    { kind: 'd', polarity: true }
  ]);
});

it('untokenize', () => {
  expect(
    untokenize([
      { kind: 'a', polarity: true },
      { kind: 'a', polarity: false },
      { kind: 'b', polarity: false },
      { kind: 'd', polarity: true }
    ])
  ).toEqual('aABd');
});

it('doTokensReact', () => {
  expect(
    doTokensReact({ kind: 'a', polarity: true }, { kind: 'a', polarity: false })
  ).toBe(true);

  expect(
    doTokensReact({ kind: 'b', polarity: false }, { kind: 'b', polarity: true })
  ).toBe(true);

  expect(
    doTokensReact({ kind: 'a', polarity: false }, { kind: 'b', polarity: true })
  ).toBe(false);

  expect(
    doTokensReact(
      { kind: 'a', polarity: false },
      { kind: 'b', polarity: false }
    )
  ).toBe(false);
});

it('doReactions', () => {
  const polymer = tokenize('dabAcCaCBAcCcaDA');
  expect(untokenize(doReactions(polymer))).toEqual('dabCBAcaDA');
});

it('question 1', () => {
  // console.log(POLYMER_STRING);
  const polymer = tokenize(POLYMER_STRING);
  const reducedPolymerString = untokenize(doReactions(polymer));
  // console.log(reducedPolymerString);
  // console.log(`${POLYMER_STRING.length} => ${reducedPolymerString.length}`);
  expect(reducedPolymerString.length).toEqual(9386); // 50000 => 9386
});
