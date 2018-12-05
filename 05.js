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
      index = 0;
    } else {
      ++index;
    }
  }
  return polymer;
}

module.exports = {
  isLowerCase,
  tokenize,
  untokenize,
  doTokensReact,
  doReactions
};
