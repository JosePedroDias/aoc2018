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

module.exports = {
  fileAsLines,
  cloneArray,
  cloneSet,
  cloneMap,
  mapFromObj
};
