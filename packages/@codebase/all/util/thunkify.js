// 在javascript中，thunk函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数

/**
 * Wrap a regular callback `fn` as a thunk.
 * fn(args1, args2, ... , callback)
 *
 * @function
 * @param {Function} fn
 * @return {Function}
 */
export default function thunkify(fn) {
  if ("function" != typeof fn) {
    throw new Error("function required");
  }

  return function () {
    var args = new Array(arguments.length);
    var ctx = this;

    for (var i = 0; i < args.length; ++i) {
      args[i] = arguments[i];
    }

    return function (done) {
      var called;

      args.push(function () {
        // 包装回调函数，确保回调函数只执行一次
        if (called) return;
        called = true;
        done.apply(null, arguments);
      });

      try {
        fn.apply(ctx, args);
      } catch (err) {
        done(err);
      }
    };
  };
}
