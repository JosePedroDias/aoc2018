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

module.exports = {
  fileAsLines,
  cloneArray,
  cloneSet,
  cloneMap
};
