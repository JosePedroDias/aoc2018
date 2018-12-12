// const { cloneSet } = require('./generic');

const REGEX = /Step ([A-Z]) must be finished before step ([A-Z]) can begin./; // A -> B

function parseLine(line) {
  const m = REGEX.exec(line);
  return [m[1], m[2]];
}

function missingDestinations(froms) {
  const tos = new Set();
  Array.from(froms.values()).forEach((destinationArr) =>
    destinationArr.forEach((to) => tos.add(to))
  );
  let points = new Set(froms.keys());
  tos.forEach((to) => points.add(to));
  points = Array.from(points);
  points.sort();
  const missing = points.filter((p) => !tos.has(p));
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

  let to;
  let candidateFroms = missingDestinations(froms);
  let from = candidateFroms[0];
  const result = [from];
  while (true) {
    console.log(froms);
    console.log(candidateFroms);
    const bag = froms.get(from);
    if (bag && bag.length > 0) {
      to = bag.shift();
      result.push(to);
      console.log(`${from} -> ${to}`);
    } else {
      console.log(`- ${from}`);
      froms.delete(from);
    }

    candidateFroms = missingDestinations(froms);
    from = candidateFroms[0];
    if (!from) {
      return result.join('');
    }
  }
}

module.exports = { parseLine, question1 };
