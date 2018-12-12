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

function convertFromString(s, delta) {
  const nums = s.split('').map((char, i) => {
    return char === ON ? i + delta : 0;
  });
  return new Set(nums);
}

function convertToString(map) {
  const ons = Array.from(map);
  ons.sort((a, b) => a - b);
  const min = ons[0];
  const max = ons[ons.length - 1];
  const arr = new Array(max - min + 1);
  for (let i = min; i <= max; ++i) {
    arr[i - min] = map.has(i) ? ON : OFF;
  }
  return arr.join('');
}

function nextGeneration(gen, rules) {
  const nextGen = [];
  for (let i = 0; i < gen.length - 4; ++i) {
    const neighbours = gen.substring(i, i + 5);
    let v = '.';
    for (let [rule, result] of rules) {
      if (neighbours === rule) {
        v = result;
        // console.log(`matched rule ${rule} => ${result}`);
        break;
      }
    }
    nextGen.push(v);
  }

  return '..' + nextGen.join('') + '..';
}

function measure(g, n) {
  let sum = 0;
  const delta = n;
  g.split('').forEach((ch, i) => {
    if (ch === '#') {
      const j = i - delta;
      sum += j;
    }
  });
  return sum;
}

function question1(g, rules) {
  const steps = 20;

  const pad = repeatString('.', steps);
  g = pad + g + pad;

  // console.log(g);
  for (let n = 0; n < steps; ++n) {
    g = nextGeneration(g, rules);
    // console.log(g);
  }
  const sum = measure(g, steps);
  // console.log(g, sum);
  return sum;
}

(function() {
  let g = '#..#.#..##......###...###';
  const rules = [
    ['...##', '#'],
    ['..#..', '#'],
    ['.#...', '#'],
    ['.#.#.', '#'],
    ['.#.##', '#'],
    ['.##..', '#'],
    ['.####', '#'],
    ['#.#.#', '#'],
    ['#.###', '#'],
    ['##.#.', '#'],
    ['##.##', '#'],
    ['###..', '#'],
    ['###.#', '#'],
    ['####.', '#']
  ];

  // question1(g, rules);
})();

module.exports = {
  parseInput,
  convertFromString,
  convertToString,
  nextGeneration,
  measure,
  question1
};
