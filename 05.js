const { clonedArrayWithoutIndices } = require('./generic');

const LOWER_CASE_REGEX = /[a-z]/;

function isLowerCase(char) {
  return LOWER_CASE_REGEX.test(char);
}

function tokenize(s) {
  return s.split('').map((char) => ({
    kind: char.toLowerCase(),
    polarity: isLowerCase(char)
  }));
}

function untokenize(polymer) {
  return polymer
    .map((el) => (el.polarity ? el.kind : el.kind.toUpperCase()))
    .join('');
}

function doTokensReact(a, b) {
  if (!a || !b) {
    return false;
  }
  return a.kind === b.kind && a.polarity !== b.polarity;
}

function doReactions(polymer_) {
  let polymer = polymer_;
  let index = 0;
  let l = polymer.length;
  while (index - 1 < l) {
    let a = polymer[index];
    let b = polymer[index + 1];
    if (doTokensReact(a, b)) {
      polymer = clonedArrayWithoutIndices(polymer, index, 2);
      l -= 2;
      index = Math.max(0, index - 1);
    } else {
      ++index;
    }
  }
  return polymer;
}

function getUniqueTokenKinds(polymer) {
  const kinds = new Set();
  polymer.forEach((t) => {
    kinds.add(t.kind);
  });
  return Array.from(kinds);
}

function removeTokensOfKind(polymer, kind) {
  return polymer.filter((t) => {
    return t.kind !== kind;
  });
}

function question1(polymerS) {
  const polymer = tokenize(polymerS);
  return untokenize(doReactions(polymer)).length;
}

function question2(polymerS) {
  const polymer = tokenize(polymerS);
  const kinds = getUniqueTokenKinds(polymer);
  // console.log('kinds', kinds);
  let minLength = Number.MAX_SAFE_INTEGER;
  kinds.forEach((kind) => {
    const polymerWoKind = removeTokensOfKind(polymer, kind);
    const reducedPolymer = doReactions(polymerWoKind);
    const len = reducedPolymer.length;
    // console.log(kind, len);
    if (len < minLength) {
      minLength = len;
    }
  });
  return minLength;
}

(function answerQuestions() {
  // return;

  const { fileAsLines } = require('./generic');
  const POLYMER_STRING = fileAsLines('./05.input.txt')[0];

  console.time('all');

  console.time('1');
  const len = question1(POLYMER_STRING);
  console.log(1, len);
  console.timeEnd('1');

  console.time('2');
  const minLength = question2(POLYMER_STRING);
  console.log(2, minLength);
  console.timeEnd('2');

  console.timeEnd('all');
})();

module.exports = {
  isLowerCase,
  tokenize,
  untokenize,
  doTokensReact,
  doReactions,
  getUniqueTokenKinds,
  removeTokensOfKind,
  question1,
  question2
};
