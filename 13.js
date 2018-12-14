const { Matrix } = require('./generic');

const C0 = ' ';
const CH = '-';
const CV = '|';
const CD19 = '/';
const CD37 = '\\';
const CINT = '+';
const CCU = '^';
const CCD = 'v';
const CCL = '<';
const CCR = '>';

const R = 0;
const U = 1;
const L = 2;
const D = 3;
const IN_DIR = [CCR, CCU, CCL, CCD];
const MOV = [[1, 0], [0, -1], [-1, 0], [0, 1]];

/*
    /->-\
    |   |  /----\
    | /-+--+-\  |
    | | |  | v  |
    \-+-/  \-+--/
      \------/
*/

function parseInput(lines) {
  function g(x, y) {
    return lines[y][x];
  }

  const H = lines.length;
  const W = lines[0].length;

  const seeds = [];

  const circuits = [];
  const intersections = [];
  const cars = [];

  for (let y = 0; y < H; ++y) {
    for (let x = 0; x < W; ++x) {
      let c = g(x, y);

      if (c === CCU || c === CCR || c === CCL || c === CCD) {
        let dir = IN_DIR.indexOf(c);
        cars.push([x, y, dir]);
      }

      if (c === CINT) {
        intersections.push([x, y]);
      }

      if (c !== CD19 && c !== CCD && c !== CCR) {
        continue;
      }
      c = g(x + 1, y);
      if (c === C0 || c === CD19 || c === CD37) {
        continue;
      }
      c = g(x, y + 1);
      if (c === C0 || c === CD19 || c === CD37) {
        continue;
      }
      seeds.push([x, y]);
    }
  }

  // console.log('cars', cars);
  // console.log('seeds', seeds);
  seeds.forEach(([x0, y0]) => {
    let x, y, c, x1, y1;
    for (
      x = x0;
      (c = g(x, y0)), c !== C0 && c !== CD37 && c !== CCL && c !== CCD;
      ++x
    ) {}
    x1 = x;
    for (
      y = y0;
      (c = g(x0, y)), c !== C0 && c !== CD37 && c !== CCR && c !== CCU;
      ++y
    ) {}
    y1 = y;
    // console.log(`x0:${x0}, y0:${y0}, x1:${x1}, y1:${y1}`);
    circuits.push([x0, y0, x1, y1]);
  });

  // console.log('circuits', circuits);

  return { dimensions: [W, H], circuits, intersections, cars };
}

function printScreen({ dimensions: [W, H], circuits, intersections, cars }) {
  const m = new Matrix(W, H, 0, 0, C0);

  circuits.forEach(([x0, y0, x1, y1]) => {
    m.setChar(x0, y0, CD19);
    m.setChar(x0, y1, CD37);
    m.setChar(x1, y0, CD37);
    m.setChar(x1, y1, CD19);
    for (let x = x0 + 1; x < x1; ++x) {
      m.setChar(x, y0, CH);
      m.setChar(x, y1, CH);
    }
    for (let y = y0 + 1; y < y1; ++y) {
      m.setChar(x0, y, CV);
      m.setChar(x1, y, CV);
    }
  });

  intersections.forEach(([x, y]) => {
    m.setChar(x, y, CINT);
  });

  cars.forEach(([x, y, dir]) => {
    m.setChar(x, y, IN_DIR[dir]);
  });

  return m.toString();
}

function carSort([a0, a1, a2], [b0, b1, b2]) {
  if (a1 < b1) {
    return -1;
  } else if (a1 > b1) {
    return 1;
  } else {
    if (a0 < b0) {
      return -1;
    }
    if (a0 > b0) {
      return 1;
    }
  }
  return 0;
}

// in-place
function sortCars(cars) {
  cars.sort(carSort);
  return cars;
}

function nextStep({ dimensions: [W, H], circuits, intersections, cars }) {
  // TODO
}

module.exports = { parseInput, printScreen, sortCars, nextStep };
