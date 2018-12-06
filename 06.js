const fs = require('fs');

const { combinations22, Matrix } = require('./generic');

const REGEX = /([0-9]+), ([0-9]+)/;

const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const letters50 = new Array(50);
(function() {
  const code0 = 'A'.charCodeAt(0);
  for (let i = 0; i < 50; ++i) {
    letters50[i] = String.fromCharCode(code0 + i);
  }
  // console.log(letters50);
})();

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

const MIN_INT = Number.MIN_SAFE_INTEGER;
const MAX_INT = Number.MAX_SAFE_INTEGER;

function findLimits(positions) {
  const mins = [MAX_INT, MAX_INT];
  const maxs = [MIN_INT, MIN_INT];
  positions.forEach(([x, y]) => {
    if (x < mins[0]) {
      mins[0] = x;
    }
    if (x > maxs[0]) {
      maxs[0] = x;
    }
    if (y < mins[1]) {
      mins[1] = y;
    }
    if (y > maxs[1]) {
      maxs[1] = y;
    }
  });
  return {
    x: [mins[0], maxs[0]],
    y: [mins[1], maxs[1]]
  };
}

function indicesBetweenLimits(positions, limits) {
  const candidateIndices = [];
  positions.forEach(([x, y], idx) => {
    if (x === limits.x[0] || x === limits.x[1]) {
      return;
    }
    if (y === limits.y[0] || y === limits.y[1]) {
      return;
    }
    candidateIndices.push(idx);
  });
  return candidateIndices;
}

function indicesWithUniqueCoords(positions) {
  const candidateIndices = [];
  positions.forEach(([x, y], i) => {
    const failed = positions.some(([x_, y_], i_) => {
      if (i === i_) {
        return false; // continue
      }
      if (x === x_ || y === y_) {
        return true; // break
      }
    });
    if (!failed) {
      candidateIndices.push(i);
    }
  });
  return candidateIndices;
}

function drawPositions(matrix, positions, letters) {
  for (let i = 0; i < positions.length; ++i) {
    const [x, y] = positions[i];
    matrix.setChar(x, y, letters[i]);
  }
}

function computeMatrix(positions, limits, letters) {
  const {
    x: [xi, xf],
    y: [yi, yf]
  } = limits;
  const W = xf - xi + 1;
  const H = yf - yi + 1;

  const m = new Matrix(W, H, xi, yi);

  for (let y = yi; y <= yf; ++y) {
    for (let x = xi; x <= xf; ++x) {
      const idx = nearestToPos([x, y], positions, manhattanDist);
      const char = idx === undefined ? '.' : letters[idx];
      m.setChar(x, y, char);
    }
  }

  return m;
}

function boundaryPositions(xi, xf, yi, yf) {
  const positions = [];
  for (let x = xi; x <= xf; ++x) {
    for (let y = yi; y <= yf; ++y) {
      if (x === xi || x === xf || y === yi || y === yf) {
        positions.push([x, y]);
      }
    }
  }
  return positions;
}

function findCharsInMatrixPositions(matrix, limits) {
  const uniqueCharsFound = new Set();
  const {
    x: [xi, xf],
    y: [yi, yf]
  } = limits;
  const positions = boundaryPositions(xi, xf, yi, yf);

  positions.forEach(([x, y]) => {
    uniqueCharsFound.add(matrix.getChar(x, y));
  });

  return Array.from(uniqueCharsFound);
}

function question1(positions, letters) {
  const limits = findLimits(positions);
  const m = computeMatrix(positions, limits, letters);
  const candidateIndices_ = indicesBetweenLimits(positions, limits);

  const boundaryChars = findCharsInMatrixPositions(m, limits);
  const denyTheseIndices = boundaryChars.map((char) => letters.indexOf(char));
  const candidateIndices = candidateIndices_.filter((v) => {
    return denyTheseIndices.indexOf(v) === -1;
  });

  let largestArea = 0;
  candidateIndices.forEach((idx) => {
    const pos = positions[idx];
    const char = m.getChar(pos[0], pos[1]);
    const area = m.countOcurrences(char);
    if (area > largestArea) {
      largestArea = area;
    }
  });
  return largestArea;
}

function calcDistanceBetweenCoords(pos, coords, maxDist) {
  let sum = 0;
  const isSafe = !coords.some((coord, _) => {
    const dist = manhattanDist(coord, pos);
    sum += dist;
    if (sum >= maxDist) {
      return true;
    }
  });
  return isSafe ? sum : undefined;
}

function question2(positions) {
  const {
    x: [xi, xf],
    y: [yi, yf]
  } = findLimits(positions);

  // const m = new Matrix(xf - xi + 1, yf - yi + 1, xi, yi);

  let sum = 0;
  let all = 0;
  for (let y = yi; y <= yf; ++y) {
    for (let x = xi; x <= xf; ++x) {
      ++all;
      const res = calcDistanceBetweenCoords([x, y], positions, 10000);
      if (res !== undefined) {
        ++sum;
        // m.setChar(x, y, '#');
      }
    }
  }

  // drawPositions(m, positions, letters50);
  // console.log(`${sum}/${all}`);
  // fs.writeFileSync('06.result.txt', m.toString());

  return sum;
}

module.exports = {
  parseLine,
  manhattanDist,
  nearestToPos,
  findLimits,
  indicesBetweenLimits,
  indicesWithUniqueCoords,
  computeMatrix,
  drawPositions,
  question1,
  question2,
  letters,
  LETTERS,
  letters50
};
