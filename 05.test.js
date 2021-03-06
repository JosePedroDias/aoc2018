const {
  isLowerCase,
  tokenize,
  untokenize,
  doTokensReact,
  doReactions,
  getUniqueTokenKinds,
  removeTokensOfKind,
  question1,
  question2
} = require('./05');
const { fileAsLines } = require('./generic');

const POLYMER_STRING = fileAsLines('./05.input.txt')[0];

// HELPERS

function reducePolymerString(polymerS) {
  const polymer = tokenize(polymerS);
  return untokenize(doReactions(polymer));
}

function removeTokensFromString(polymerS, kind) {
  return untokenize(removeTokensOfKind(tokenize(polymerS), kind));
}

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
  const len = question1(POLYMER_STRING);
  expect(len).toEqual(9386);
});

it('getUniqueTokenKinds', () => {
  expect(getUniqueTokenKinds(tokenize('abBc'))).toEqual(['a', 'b', 'c']);
});

it('removeTokensOfKind', () => {
  expect(removeTokensFromString('abBc', 'b')).toBe('ac');

  expect(removeTokensFromString('dabAcCaCBAcCcaDA', 'a')).toBe('dbcCCBcCcD');
  expect(removeTokensFromString('dabAcCaCBAcCcaDA', 'b')).toBe(
    'daAcCaCAcCcaDA'
  );
  expect(removeTokensFromString('dabAcCaCBAcCcaDA', 'c')).toBe('dabAaBAaDA');
  expect(removeTokensFromString('dabAcCaCBAcCcaDA', 'd')).toBe(
    'abAcCaCBAcCcaA'
  );
});

it('examples 2', () => {
  expect(reducePolymerString('dbcCCBcCcD')).toBe('dbCBcD');
  expect(reducePolymerString('daAcCaCAcCcaDA')).toBe('daCAcaDA');
  expect(reducePolymerString('dabAaBAaDA')).toBe('daDA');
  expect(reducePolymerString('abAcCaCBAcCcaA')).toBe('abCBAc');
});

it('question 2', () => {
  const minLength = question2(POLYMER_STRING);
  expect(minLength).toEqual(4876);
});
