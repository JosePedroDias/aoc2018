const { repeatString, clone } = require('./generic');

const OFF = '.';
const ON = '#';

function parseInput(lines) {
  lines = clone(lines); // not to be destructive
  const initial = lines.shift().split(': ')[1];
  lines.shift();
  const rules = lines.map((l) => l.split(' => '));
  return [initial, rules];
}

function convertFromString(s, delta = 0) {
  const nums = s.split('').map((char, i) => {
    return char === ON ? i + delta : 0;
  });
  return new Set(nums);
}

function convertRule(s) {
  return s.split('').map((char) => char === ON);
}

function getLimits(map) {
  const ons = Array.from(map);
  ons.sort((a, b) => a - b);
  const min = ons[0];
  const max = ons[ons.length - 1];
  return [min, max];
}

function convertToString(map) {
  const [min, max] = getLimits(map);
  const arr = new Array(max - min + 1);
  for (let i = min; i <= max; ++i) {
    arr[i - min] = map.has(i) ? ON : OFF;
  }
  return [arr.join(''), min];
}

function nextGeneration(gen, rules) {
  const nextGen = new Set();
  const [min, max] = getLimits(gen);

  for (let i = min - 2; i <= max + 2; ++i) {
    let result;
    rules.some(([a, b]) => {
      /* console.log(i, 'rule', a, b);
      console.log('part', [
        gen.has(i - 2),
        gen.has(i - 1),
        gen.has(i),
        gen.has(i + 1),
        gen.has(i + 2)
      ]); */
      for (let j = -2; j <= 2; ++j) {
        const bool = a[j + 2];
        const cell = gen.has(i + j);
        const fails = bool !== cell;
        /* console.log(
          `i:${i}, j:${j} ~> bool:${bool}, cell:${cell}, fails:${fails}`
        ); */
        if (fails) {
          return;
        }
      }
      result = b;
      // console.log('MATCHED RULE');
      return true;
    });
    if (result) {
      nextGen.add(i);
    }
  }
  return nextGen;
}

function measure(g) {
  const arr = Array.from(g);
  let sum = 0;
  arr.forEach((n) => (sum += n));
  return sum;
}

function prepareInput(g, rules) {
  g = convertFromString(g, 0);
  rules = rules.map(([a, b]) => {
    return [convertRule(a), b === ON];
  });
  return [g, rules];
}

function question1(g_, rules_, steps = 20) {
  let [g, rules] = prepareInput(g_, rules_);

  // console.log(convertToString(g));
  for (let n = 0; n < steps; ++n) {
    g = nextGeneration(g, rules);
    // console.log(convertToString(g));
  }
  const sum = measure(g);
  // console.log(g, sum);
  return sum;
}

module.exports = {
  parseInput,
  convertFromString,
  convertToString,
  nextGeneration,
  measure,
  question1
};
