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

module.exports = {
  fileAsLines,
  cloneArray,
  cloneSet,
  cloneMap,
  mapFromObj,
  clonedArrayWithoutIndices,
  combinations22
};
