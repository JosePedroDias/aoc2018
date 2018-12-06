const fs = require('fs');

function fileAsLines(fileName) {
  return fs
    .readFileSync(fileName)
    .toString()
    .split('\n'); // \n \r\n
}

function cloneArray(arr) {
  return arr.slice();
}

function cloneSet(set) {
  const arr = Array.from(set.values());
  return new Set(arr);
}

function cloneMap(map) {
  const arr = Array.from(map.entries());
  return new Map(arr);
}

function mapFromObj(obj) {
  const map = new Map();
  const keys = Object.keys(obj);
  for (let k of keys) {
    map.set(k, obj[k]);
  }
  return map;
}

function clonedArrayWithoutIndices(
  arr,
  startIndexToRemove,
  numberOfIndicesToRemove
) {
  const arr2 = arr.slice();
  arr2.splice(startIndexToRemove, numberOfIndicesToRemove);
  return arr2;
}

function combinations22(n) {
  let i, j;
  const arr = [];
  for (i = 0; i < n - 1; ++i) {
    for (j = 1; j < n; ++j) {
      if (i < j) {
        arr.push([i, j]);
      }
    }
  }
  return arr;
}

class Matrix {
  constructor(w, h, dx = 0, dy = 0, defaultChar = ' ') {
    this.lines = new Array(h);
    this.w = w;
    this.h = h;
    this.dx = dx;
    this.dy = dy;
    for (let y = 0; y < h; ++y) {
      this.lines[y] = new Array(w);
      this.lines[y].fill(defaultChar);
    }
  }

  getLimits() {
    return {
      x: [this.dx, this.dx + this.w],
      y: [this.dy, this.dy + this.h]
    };
  }

  setChar(x, y, char) {
    this.lines[y - this.dy][x - this.dx] = char;
  }

  getChar(x, y) {
    return this.lines[y - this.dy][x - this.dx];
  }

  getOcurrenceCoordinates(char) {
    const coords = [];
    for (let y = 0; y < this.h; ++y) {
      const line = this.lines[y];
      for (let x = 0; x < this.w; ++x) {
        if (line[x] === char) {
          coords.push([x + this.dx, y + this.dy]);
        }
      }
    }
    return coords;
  }

  countOcurrences(char) {
    let count = 0;
    for (let y = 0; y < this.h; ++y) {
      const line = this.lines[y];
      for (let x = 0; x < this.w; ++x) {
        if (line[x] === char) {
          ++count;
        }
      }
    }
    return count;
  }

  toString() {
    return this.lines
      .map((line) => {
        return line.join('');
      })
      .join('\n');
  }
}

module.exports = {
  fileAsLines,
  cloneArray,
  cloneSet,
  cloneMap,
  mapFromObj,
  clonedArrayWithoutIndices,
  combinations22,
  Matrix
};
