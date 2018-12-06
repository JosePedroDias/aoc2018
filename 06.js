const REGEX = /([0-9]+), ([0-9]+)/;

function parseLine(line) {
  const m = REGEX.exec(line);
  return [parseInt(m[1], 10), parseInt(m[2], 10)];
}

function manhattanDist(p1, p2) {
  return Math.abs(p1[0] - p2[0]) + Math.abs(p1[1] - p2[1]);
}

function nearestToPos(location, positions, distFn) {
  let closestPosIndices = [];
  let closestDist = Number.MAX_SAFE_INTEGER;
  positions.forEach((pos, posIndex) => {
    const dist = distFn(location, pos);
    if (dist < closestDist) {
      closestDist = dist;
      closestPosIndices = [posIndex];
    } else if (dist === closestDist) {
      closestPosIndices.push(posIndex);
    }
  });
  //console.log(
  //  `indices: ${JSON.stringify(closestPosIndices)}, dist: ${closestDist}`
  //);
  return closestPosIndices.length !== 1 ? undefined : closestPosIndices[0];
}

(function() {
  const EXAMPLE_LINES = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`.split('\n');

  const { Matrix } = require('./generic');
  const W = 10;
  const m = new Matrix(W, W);
  const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');

  const positions = EXAMPLE_LINES.map(parseLine);

  for (let y = 0; y < W; ++y) {
    for (let x = 0; x < W; ++x) {
      const idx = nearestToPos([x, y], positions, manhattanDist);
      const char = idx === undefined ? '.' : letters[idx];
      m.setChar(x, y, char);
    }
  }

  for (let i = 0; i < positions.length; ++i) {
    const [x, y] = positions[i];
    m.setChar(x, y, letters[i].toUpperCase());
  }

  console.log(m.toString());
})();

module.exports = { parseLine, manhattanDist, nearestToPos };
