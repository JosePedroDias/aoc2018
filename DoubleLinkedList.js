class DoubleLinkedList {
  constructor(value, previous, next) {
    this._value = value;
    this._previous = previous || this;
    this._next = next || this;
  }

  next() {
    return this._next;
  }

  previous() {
    return this._previous;
  }

  value(v) {
    if (v !== undefined) {
      this._value = v;
    } else {
      return this._value;
    }
  }

  remove() {
    if (this.length() === 1) {
      throw 'cannot remove the last node';
    }
    const p = this._previous;
    const n = this._next;
    p._next = n;
    n._previous = p;
  }

  addBefore(v) {
    const x = new DoubleLinkedList(v, this._previous, this);
    this._previous._next = x;
    this._previous = x;
  }

  addAfter(v) {
    const x = new DoubleLinkedList(v, this, this._next);
    this._next._previous = x;
    this._next = x;
  }

  traverse(fn) {
    const set = new Set();
    let node = this;
    let i = 0;
    set.add(node);
    fn(node._value, i);
    while (true) {
      node = node.next();
      if (set.has(node)) {
        return;
      }
      ++i;
      set.add(node);
      fn(node._value, i);
    }
  }

  length() {
    let len = 0;
    this.traverse(() => {
      ++len;
    });
    return len;
  }

  toArray() {
    const arr = [];
    this.traverse((v) => {
      arr.push(v);
    });
    return arr;
  }

  toString() {
    return this.toArray().join(', ');
  }
}

module.exports = { DoubleLinkedList };
