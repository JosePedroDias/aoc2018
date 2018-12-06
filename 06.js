const REGEX = /([0-9]+), ([0-9]+)/;

function parseLine(line) {
  const m = REGEX.exec(line);
  return [parseInt(m[1], 10), parseInt(m[2], 10)];
}

module.exports = { parseLine };
