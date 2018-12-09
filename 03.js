// #123 @ 3,2: 5x4 -> 123, 3, 2, 5, 4

const REGEX = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/;

function parseLine(line) {
  const m = REGEX.exec(line);
  m.shift();
  return m.map((n) => parseInt(n, 10));
}

function cellsToFill(xi, yi, w, h) {
  const cells = [];
  for (let y = yi; y < yi + h; ++y) {
    for (let x = xi; x < xi + w; ++x) {
      cells.push(x + ',' + y);
    }
  }
  return cells;
}

function question1(events) {
  const fabric = new Map();
  events.forEach(([claim, xi, yi, w, h]) => {
    const cells = cellsToFill(xi, yi, w, h);
    cells.forEach((cell) => {
      let v = fabric.get(cell) || 0;
      fabric.set(cell, ++v);
    });
  });
  let answer = 0;
  for (let v of fabric.values()) {
    if (v > 1) {
      ++answer;
    }
  }
  return answer;
}

function question2(events) {
  const fabric = new Map();
  const claimsStillHolding = new Set();
  events.forEach(([claim, xi, yi, w, h]) => {
    claimsStillHolding.add(claim);
    const cells = cellsToFill(xi, yi, w, h);
    cells.forEach((cell) => {
      const oldV = fabric.get(cell);
      if (isFinite(oldV)) {
        claimsStillHolding.delete(oldV);
        claimsStillHolding.delete(claim);
      }
      fabric.set(cell, claim);
    });
  });
  return Array.from(claimsStillHolding);
}

module.exports = {
  parseLine,
  cellsToFill,
  question1,
  question2
};
