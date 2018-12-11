const {
  hundreds,
  cellValue,
  generateMatrix,
  searchMatrix,
  question1
} = require('./11');

const { padWith } = require('./generic');

function printSubMatrix(mtx, x_, y_, w, h) {
  const lines = [];
  for (let y = y_; y < y_ + h; ++y) {
    const line = [];
    for (let x = x_; x < x_ + w; ++x) {
      line.push(padWith(mtx.getChar(x, y), 4, ' '));
    }
    lines.push(line.join(''));
  }
  return lines.join('\n');
}

it('hundreds', () => {
  expect(hundreds(123)).toBe(1);
  expect(hundreds(5732)).toBe(7);
  expect(hundreds(32)).toBe(0);
});

it('cellValue', () => {
  expect(cellValue(3, 5, 8)).toBe(4);
  expect(cellValue(122, 79, 57)).toBe(-5);
  expect(cellValue(217, 196, 39)).toBe(0);
  expect(cellValue(101, 153, 71)).toBe(4);
});

it('generateMatrix', () => {
  expect(generateMatrix(10, 4).lines).toEqual([
    [-3, -3, -3, -2],
    [-2, -1, -1, 0],
    [-1, 0, 1, 2],
    [0, 1, 3, 4]
  ]);

  expect(printSubMatrix(generateMatrix(18, 300), 32, 44, 5, 5))
    .toBe(`  -2  -4   4   4   4
  -4   4   4   4  -5
   4   3   3   4  -4
   1   1   2   4  -3
  -1   0   2  -5  -2`);

  expect(printSubMatrix(generateMatrix(42, 300), 20, 60, 5, 5))
    .toBe(`  -3   4   2   2   2
  -4   4   3   3   4
  -5   3   3   4  -4
   4   3   3   4  -3
   3   3   3  -5  -1`);
});

it('searchMatrix', () => {
  const mtx = generateMatrix(10, 4);
  // console.log(printSubMatrix(mtx, 1, 1, 4, 4));
  expect(searchMatrix(mtx, 4, 2)).toBe('2,2');
});

it('question1', () => {
  expect(question1(18, 300, 3)).toBe('33,45');
  expect(question1(42, 300, 3)).toBe('21,61');
});
