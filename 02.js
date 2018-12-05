function histogram(s) {
  const letters = s.split('');
  const hist = new Map();
  letters.forEach((l) => {
    if (hist.has(l)) {
      hist.set(l, hist.get(l) + 1);
    } else {
      hist.set(l, 1);
    }
  });
  return hist;
}

function checksum(s) {
  const hist = histogram(s);
  let two = 0,
    three = 0;
  for (let [k, v] of hist.entries()) {
    if (v === 2) {
      ++two;
    } else if (v === 3) {
      ++three;
    }
  }
  return [two, three];
}

function addPairs(p1, p2) {
  return [p1[0] + p2[0], p1[1] + p2[1]];
}

module.exports = {
  histogram,
  checksum,
  addPairs
};
