const { cloneArray, cloneSet } = require('./generic');

function f1(freq_, changes_) {
  let freq = freq_;
  let changes = changes_;

  while (changes.length > 0) {
    changes = cloneArray(changes);
    const change = changes.shift();
    freq += change;
  }

  return freq;
}

function f2(freq_, changes) {
  const l = changes.length;
  const foundFreqs = new Set();
  let index = 0;
  let freq = freq_;

  while (!foundFreqs.has(freq)) {
    foundFreqs.add(freq);
    freq += changes[index];
    index = (index + 1) % l;
  }

  return freq;
}

module.exports = { f1, f2 };
