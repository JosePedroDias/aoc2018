const { Matrix } = require('Matrix');

const REGEX = /position=<\s*(\-?[0-9]+),\s*(\-?[0-9]+)> velocity=<\s*(\-?[0-9]+),\s*(\-?[0-9]+)>/;

// position=<-10162,  10462> velocity=< 1, -1>
function parseLine(line) {
  const m = REGEX.exec(line).map((s) => parseInt(s, 10));
  return [[m[1], m[2]], [m[3], m[4]]];
}

function draw(readings, steps, mtxSize) {
  // TODO
}

module.exports = { parseLine, draw };
