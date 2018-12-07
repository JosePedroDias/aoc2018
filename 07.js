const REGEX = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./;

function parseLine(line) {
  const m = REGEX.exec(line);
  return [m[1], m[2]];
}

function question1(pairs) {
  return '';
}

module.exports = { parseLine, question1 };
