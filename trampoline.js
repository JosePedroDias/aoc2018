// FROM: http://raganwald.com/2013/03/28/trampolines-in-javascript.html
// FROM: https://stackoverflow.com/a/44244819/193711 (also interesting)

// 1ST FORM - naive implementation
function _factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}

// 2ND - rewritten in tail-recursion form
function __factorial(n) {
  function myself(acc, n) {
    return n ? myself(acc * n, n - 1) : acc;
  }

  return myself(1, n);
}

function trampoline(fun, ...args) {
  let result = fun.apply(fun, args);

  while (result instanceof Function) {
    result = result();
  }

  return result;
}

// 3RD - trampolined: it now works!
function factorial(n) {
  function myself(acc, n) {
    return n
      ? function() {
          return myself(acc * n, n - 1);
        }
      : acc;
  }

  return trampoline(myself, 1, n);
}

console.log('fact(10)', factorial(10)); //=> 3628800
console.log('fact(32768)', factorial(32768)); //=> RangeError: Maximum call stack size exceeded
