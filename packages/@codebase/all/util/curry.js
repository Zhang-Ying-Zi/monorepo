function sub_curry(fn) {
  let args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  };
}

export function curry(fn, length) {
  length = length || fn.length;

  let slice = Array.prototype.slice;

  return function () {
    if (arguments.length < length) {
      let combined = [fn].concat(slice.call(arguments));
      return curry(sub_curry.apply(this, combined), length - arguments.length);
    } else {
      return fn.apply(this, arguments);
    }
  };
}

export function curry2(fn, args) {
  let length = fn.length;
  args = args || [];

  return function () {
    let _args = args.slice(0);

    for (let i = 0; i < arguments.length; i++) {
      _args.push(arguments[i]);
    }
    if (_args.length < length) {
      return curry2.call(this, fn, _args);
    } else {
      return fn.apply(this, _args);
    }
  };
}

export function curry3(fn) {
  const N = fn.length;
  function innerFn(n, args) {
    return function actualInnerFn(...a) {
      if (n <= a.length) {
        return fn(...args, ...a);
      }
      return innerFn(n - a.length, [...args, ...a]);
    };
  }
  return innerFn(N, []);
}
