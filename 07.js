// const { cloneSet } = require('./generic');

const REGEX = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./; // A -> B

function parseLine(line) {
  const m = REGEX.exec(line);
  return [m[1], m[2]];
}

function missingDestinations(points, froms) {
  froms.values.forEach((destinationArr) =>
    destinationArr.forEach((to) => set.add(to))
  );
  const missing = Array.from(points).filter((el) => !froms.has(el));
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

  console.log('froms', froms);

  const result = [];

  let nextCandidates = missingDestinations(points, froms);
  console.log('nextCandidates', nextCandidates);
  let from = nextCandidates.shift();
  result.push(from);
  let to;
  while (true) {
    to = froms.get(from).shift();
    if (!to) {
      break;
    }
    result.push(to);
    console.log(froms);

    nextCandidates = missingDestinations(points, froms);
    from = nextCandidates.shift();
  }

  console.log(result);

  return 'CABDFE';
}

module.exports = { parseLine, question1 };
