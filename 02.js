const { combinations22 } = require('./generic');

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
      two = 1;
    } else if (v === 3) {
      three = 1;
    }
  }
  return [two, three];
}

function addPairs(p1, p2) {
  return [p1[0] + p2[0], p1[1] + p2[1]];
}

// returns index iif one position differs between strings. undefined otherwise
function diffsOneCharPos(s1, s2) {
  const l = s1.length;
  if (l !== s2.length) {
    return;
  }
  let foundIndex;
  for (let i = 0; i < l; ++i) {
    if (s1[i] !== s2[i]) {
      if (foundIndex !== undefined) {
        return;
      }
      foundIndex = i;
    }
  }
  return foundIndex;
}

function question2(ids) {
  const combs = combinations22(ids.length);
  let response;
  combs.some((pair) => {
    const a = ids[pair[0]];
    const b = ids[pair[1]];
    const res = diffsOneCharPos(a, b);
    if (res !== undefined) {
      // console.log(a, b, res);
      response = a.substring(0, res) + a.substring(res + 1);
      return true;
    }
  });
  return response;
}

module.exports = {
  histogram,
  checksum,
  addPairs,
  diffsOneCharPos,
  question2
};
