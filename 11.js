const { Matrix } = require('./generic');

function _hundreds(n) {
  return (n - (n % 100)) / 100;
}

function hundreds(n) {
  const s = n.toString();
  if (s.length < 3) {
    return 0;
  }
  return +s[s.length - 3];
}

function cellValue(x, y, gridSerialNumber) {
  const rackId = x + 10;
  let v = rackId * y;
  v += gridSerialNumber;
  v *= rackId;
  v = hundreds(v);
  v -= 5;
  return v;
}

function generateMatrix(gridSerialNumber, W) {
  const mtx = new Matrix(W, W, 1, 1, 0);
  for (let y = 1; y <= W; ++y) {
    for (let x = 1; x <= W; ++x) {
      const v = cellValue(x, y, gridSerialNumber);
      mtx.setChar(x, y, v);
    }
  }
  return mtx;
}

function searchMatrix(mtx, W, w) {
  let highestValue = Number.MIN_SAFE_INTEGER;
  let highestCell;
  for (let y = 1; y <= W - w + 1; ++y) {
    for (let x = 1; x <= W - w + 1; ++x) {
      let sum = 0;
      for (let i = 0; i < w; ++i) {
        for (let j = 0; j < w; ++j) {
          sum += mtx.getChar(x + i, y + i);
        }
      }
      // console.log(x + ',' + y + ' -> ' + sum);
      if (sum > highestValue) {
        highestValue = sum;
        highestCell = x + ',' + y;
        // console.log(highestCell + ' -> ' + highestValue);
      }
    }
  }
  return highestCell;
}

function question1(gridSerialNumber, W = 300, w = 3) {
  // fill matrix
  const mtx = generateMatrix(gridSerialNumber, W);

  // search for largest 3x3 submatrix
  return searchMatrix(mtx, W, w);
}

module.exports = {
  hundreds,
  cellValue,
  generateMatrix,
  searchMatrix,
  question1
};
