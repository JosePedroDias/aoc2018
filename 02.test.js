const {
  histogram,
  checksum,
  addPairs,
  diffsOneCharPos,
  question2
} = require('./02');
const { fileAsLines, mapFromObj } = require('./generic');

const IDS = fileAsLines('./02.input.txt');

it('histogram', () => {
  expect(histogram('abcdef')).toEqual(
    mapFromObj({ a: 1, b: 1, c: 1, d: 1, e: 1, f: 1 })
  );
  expect(histogram('bababc')).toEqual(mapFromObj({ b: 3, a: 2, c: 1 }));
});

/*
    abcdef contains no letters that appear exactly two or three times.
    bababc contains two a and three b, so it counts for both.
    abbcde contains two b, but no letter appears exactly three times.
    abcccd contains three c, but no letter appears exactly two times.
    aabcdd contains two a and two d, but it only counts once.
    abcdee contains two e.
    ababab contains three a and three b, but it only counts once.
 */

it('checksum', () => {
  expect(checksum('abcdef')).toEqual([0, 0]);
  expect(checksum('bababc')).toEqual([1, 1]);
  expect(checksum('abbcde')).toEqual([1, 0]);
  expect(checksum('abcccd')).toEqual([0, 1]);
  expect(checksum('aabcdd')).toEqual([1, 0]);
  expect(checksum('abcdee')).toEqual([1, 0]);
  expect(checksum('ababab')).toEqual([0, 1]);
});

it('addPairs', () => {
  expect(addPairs([2, 3], [1, 1])).toEqual([3, 4]);
});

it('question 1', () => {
  const checks = IDS.map(checksum);
  const arr = checks.reduce(addPairs, [0, 0]);
  const checkSum = arr[0] * arr[1];
  expect(checkSum).toBe(5904);
});

it('diffsOneCharPos', () => {
  expect(diffsOneCharPos('qweqwe', 'qweqwe')).toBe(undefined);
  expect(diffsOneCharPos('qweqwe', 'qweXwe')).toBe(3);
  expect(diffsOneCharPos('qweqwe', 'qweXwX')).toBe(undefined);
});

it('example 2', () => {
  const res = question2([
    'abcde',
    'fghij',
    'klmno',
    'pqrst',
    'fguij',
    'axcye',
    'wvxyz'
  ]);
  expect(res).toBe('fgij');
});

it('question 2', () => {
  const res = question2(IDS);
  expect(res).toBe('jiwamotgsfrudclzbyzkhlrvp');
});
