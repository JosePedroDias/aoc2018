// const { cloneSet } = require('./generic');

const REGEX = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./; // A -> B

function parseLine(line) {
  const m = REGEX.exec(line);
  return [m[1], m[2]];
}

function missingDestinations(points, froms) {
  const tos = new Set();
  Array.from(froms.values()).forEach((destinationArr) =>
    destinationArr.forEach((to) => tos.add(to))
  );
  const missing = Array.from(points).filter((p) => !tos.has(p));
  missing.sort();
  return missing;
}

function question1(pairs) {
  const froms = new Map();
  const points = new Set();

  pairs.forEach(([from, to]) => {
    let bag = froms.get(from);
    if (!bag) {
      bag = [];
      froms.set(from, bag);
    }
    bag.push(to);

    points.add(from);
    points.add(to);
  });

  /* for (const bag of froms.values()) {
    bag.sort();
  } */

  const result = [];

  let from = missingDestinations(points, froms);
  //console.log('points', points);
  console.log('nextCandidates', nextCandidates);
  let from = nextCandidates.shift();
  result.push(from);
  let to;
  while (true) {
    console.log(froms);

    if (!froms.has(from)) {
      break;
    }

    to = froms.get(from).shift();
    if (!to) {
      froms.delete(from);
      points.delete(from);
      console.log(`- ${from}`);
    } else {
      console.log(`${from} -> ${to}`);
      result.push(to);
    }

    nextCandidates = missingDestinations(points, froms);
    //console.log('points', points);
    console.log('nextCandidates', nextCandidates);
    from = nextCandidates.shift();
  }

  return result.join('');
}

module.exports = { parseLine, question1 };
