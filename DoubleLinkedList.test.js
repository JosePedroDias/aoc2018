const { DoubleLinkedList } = require('./DoubleLinkedList');

it('ctor', () => {
  const a = new DoubleLinkedList(42);
  expect(a.value()).toBe(42);
  expect(a.length()).toBe(1);
  expect(a.toArray()).toEqual([42]);
  expect(a.toString()).toEqual('42');
  // expect(a.remove()).toThrow();
});

it('addBefore', () => {
  const a = new DoubleLinkedList('a');
  a.addBefore('b');
  expect(a.length()).toBe(2);
  expect(a.toArray()).toEqual(['a', 'b']);
  expect(a.toString()).toBe('a, b');
  expect(a.value()).toBe('a');
  expect(a.next().value()).toBe('b');
  expect(a.previous().value()).toBe('b');
});

it('addAfter', () => {
  const a = new DoubleLinkedList('a');
  a.addAfter('b');
  expect(a.length()).toBe(2);
  expect(a.toArray()).toEqual(['a', 'b']);
  expect(a.toString()).toBe('a, b');
  expect(a.value()).toBe('a');
  expect(a.next().value()).toBe('b');
  expect(a.previous().value()).toBe('b');
});
