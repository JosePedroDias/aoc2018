// FROM: https://stackoverflow.com/a/44244819/193711

// a tag to uniquely identify thunks (zero-argument functions)
const $thunk = Symbol.for('thunk');

//  eagerly evaluate a lazy function until the final result
const eager = f => (...args) => {
  // console.log('eager', args);
  let g = f(...args);
  while (g && g[$thunk]) g = g();
  return g;
};

// lift a normal binary function into the lazy context
const lazy2 = f => (x, y) => {
  // console.log('lazy2', x, y);
  const thunk = () => f(x, y);
  return (thunk[$thunk] = true), thunk;
};

// the stack-safe iterative function in recursive style
const repeat = n => f => x => {
  const aux = lazy2((n, x) => (n === 0 ? x : aux(n - 1, f(x))));
  return eager(aux)(n, x);
};

const inc = x => x + 1;

// and run...
// console.log(repeat(1e6)(inc)(0)); // 1000000

////////

// FROM: http://raganwald.com/2013/03/28/trampolines-in-javascript.html

// NAIVE
function _factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

// 2ND
function factorial(n) {
  function myself(acc, n) {
    return n ? myself(acc * n, n - 1) : acc;
  }

  return myself(1, n);
}

console.log('fact(10)', factorial(10)); //=> 3628800
console.log('fact(32768)', factorial(32768)); //=> RangeError: Maximum call stack size exceeded
