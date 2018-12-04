const { cloneArray, cloneSet } = require('./generic');

function f1(freq, changes) {
  if (changes.length === 0) {
    return freq;
  }
  // const remainingChanges = changes.slice();
  const remainingChanges = cloneArray(changes);
  const change = remainingChanges.shift();
  return f1(freq + change, remainingChanges);
}

function f2(freq, changes) {
  return f2_(freq, changes, 0, new Set());
}

function f2_(freq, changes, index, foundFreqs) {
  const change = changes[index];

  const resultingFreq = freq + change;
  // console.log(`freq:${freq}, change:${change} => ${resultingFreq}`);

  if (foundFreqs.has(resultingFreq)) {
    // console.log(`FOUND ${resultingFreq} AGAIN!`);
    return resultingFreq;
  }

  const newIndex = (index + 1) % changes.length;
  const newFoundFreqs = cloneSet(foundFreqs);
  newFoundFreqs.add(resultingFreq);

  return f2_(resultingFreq, changes, newIndex, newFoundFreqs);
}

module.exports = { f1, f2 };
