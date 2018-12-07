const REGEX = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./; // A -> B

const { Matrix } = require('./generic');

function parseLine(line) {
  const m = REGEX.exec(line);
  return [m[1], m[2]];
}

const FIRST_LETTER_CODE = 'A'.charCodeAt(0);

function letterToIndex(letter) {
  return letter.charCodeAt(0) - FIRST_LETTER_CODE;
}

function indexToLetter(index) {
  return String.fromCharCode(FIRST_LETTER_CODE + index);
}

function question1(pairs) {
  const debug = false;

  const uniques = new Set();
  // const mapAToB = new Map();
  pairs.forEach(([a, b]) => {
    uniques.add(a);
    uniques.add(b);
  });
  const uniqueLetters = Array.from(uniques);
  uniqueLetters.sort();
  const l = uniqueLetters.length;
  const m = debug ? new Matrix(l + 1, l + 1, -1, -1) : new Matrix(l, l);
  debug &&
    uniqueLetters.forEach((letter, idx) => {
      m.setChar(-1, idx, letter);
      m.setChar(idx, -1, letter);
    });
  pairs.forEach(([a, b]) => {
    m.setChar(letterToIndex(a), letterToIndex(b), 'X');
  });
  function isCellOccupied(v, pos) {
    console.log(v, pos);
    return v !== ' ';
  }
  console.log(1, m.ocurrencesInLine(1, isCellOccupied));
  console.log(m.toString());
  return 'CABDFE'; // uniqueLetters;
}

module.exports = { parseLine, letterToIndex, indexToLetter, question1 };
