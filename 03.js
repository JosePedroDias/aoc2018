// #123 @ 3,2: 5x4 -> 123, 3, 2, 5, 4

const REGEX = /#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/;

function parseLine(line) {
  const m = REGEX.exec(line);
  m.shift();
  return m.map((n) => parseInt(n, 10));
}

function calcExtension(lines) {
  let minX = 100000;
  let maxX = -100000;
  let minY = 100000;
  let maxY = -100000;
  lines.forEach(([ev, xi, yi, w, h]) => {
    const xf = xi + w;
    const yf = yi + h;
    if (xi < minX) {
      minX = xi;
    }
    if (xf > maxX) {
      maxX = xf;
    }
    if (yi < minY) {
      minY = yi;
    }
    if (yf > maxY) {
      maxY = yf;
    }
  });
  return [minX, maxX, minY, maxY];
}

module.exports = {
  parseLine,
  calcExtension
};
