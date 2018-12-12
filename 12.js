const { clone } = require('./generic');

function parseInput(lines) {
  lines = clone(lines); // not to be destructive
  const initial = lines.shift().split(': ')[1];
  lines.shift();
  const rules = lines.map((l) => l.split(' => '));
  return [initial, rules];
}

function nextGeneration(gen, rules) {
  gen = '..' + gen + '..';
  const nextGen = [];
  for (let i = 0; i < gen.length - 4; ++i) {
    const neighbours = gen.substring(i, i + 5);
    let v = '.'; //neighbours[2];
    // console.log(`----- #${i} was ${v}`);
    // console.log('n', neighbours);
    // console.log('v', v);
    for (let [rule, result] of rules) {
      if (neighbours === rule) {
        v = result;
        // console.log(`matched rule ${rule} => ${result}`);
        break;
      }
    }
    nextGen.push(v);
    // console.log('v_', v);
  }
  return '.' + nextGen.join('') + '.';
}

function measure(g, n) {
  let sum = 0;
  g.split('').forEach((ch, i) => {
    if (ch === '#') {
      sum += i - n;
    }
  });
  return sum;
}

function question1(g, rules) {
  for (let n = 0; n < 21; ++n) {
    // console.log(g);
    g = nextGeneration(g, rules);
  }
  const sum = measure(g, 20);
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

  //question1(g, rules);
})();

module.exports = { parseInput, nextGeneration, measure, question1 };
