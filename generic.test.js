const {
  fileAsLines,
  cloneArray,
  cloneSet,
  cloneMap,
  mapFromObj,
  clonedArrayWithoutIndices,
  combinations22,
  repeatString,
  padWith,
  tickProgress,
  Matrix
} = require('./generic');

it('fileAsLines', () => {
  expect(fileAsLines('./.gitignore')).toEqual(['node_modules', 'coverage']);
});

it('cloneArray', () => {
  const a = [2, 'a'];
  const b = cloneArray(a);
  expect(a).not.toBe(b);
  expect(a).toEqual(b);
  b.push(true);
  expect(a).not.toEqual(b);
  expect(b[2]).toBe(true);
});

it('cloneSet', () => {
  const a = new Set([2, 'a']);
  const b = cloneSet(a);
  expect(a).not.toBe(b);
  expect(a).toEqual(b);
  b.add(true);
  expect(a).not.toEqual(b);
  expect(b.has(2)).toBeTruthy();
});

it('cloneMap', () => {
  const a = new Map([[1, 'a'], [2, 'b']]);
  const b = cloneMap(a);
  expect(a).not.toBe(b);
  expect(a).toEqual(b);
  b.set(3, 'c');
  expect(b.get(3)).toBe('c');
});

it('mapFromObj', () => {
  const m = mapFromObj({ a: '2', b: true });
  expect(m instanceof Map).toBeTruthy();
  expect(m.get('a')).toBe('2');
  expect(m.get('b')).toBe(true);
});

it('clonedArrayWithoutIndices', () => {
  const a = [2, 3, 'a', true, 9, 'b'];
  const b = clonedArrayWithoutIndices(a, 1, 2);
  const c = [2, true, 9, 'b'];
  expect(b).toEqual(c);
  expect();
});

it('combinations22', () => {
  expect(combinations22(2)).toEqual([[0, 1]]);
  expect(combinations22(3)).toEqual([[0, 1], [0, 2], [1, 2]]);
});

it('repeatString', () => {
  expect(repeatString('x', 2)).toBe('xx');
});

it('padWith', () => {
  expect(padWith('..', 4, '*')).toBe('**..');
});

fit('tickProgress', (onDone) => {
  let counter = 0;
  const MAX = 10; // 10*250 = 2.5s
  function onTick() {
    tickProgress(counter / MAX);
    if (counter === MAX) {
      clearInterval(onTick);
      onDone();
    }
    ++counter;
  }
  const timer = setInterval(onTick, 250);
  onTick();
});

describe('matrix class', () => {
  it('a', () => {
    expect('x').toBe('x');
  });

  // TODO
});
