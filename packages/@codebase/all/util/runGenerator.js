// 执行同步的Generator
export function runSyncGenerator(gen) {
  var results = [];

  var g = gen();
  var res = g.next();

  while (!res.done) {
    results.push(res.value);
    res = g.next(res.value);
  }

  return results;
}

// 自动执行返回value=Thunk的generator
export function runAsyncThunkGenerator(gen) {
  var g = gen();

  // next的参数签名与Thunk的回调函数参数签名一致
  function next(err, data) {
    // yield表达式本身没有返回值，或者说总是返回undefined。
    // next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
    var result = g.next(data);
    if (result.done) return;
    // result.value就是thunk函数
    // result.value异步完成后将执行权交还给Generator函数
    result.value(next);
  }

  next();
}

// 自动执行返回value=Promise的generator
export function runAsyncPromiseGenerator(gen) {
  var g = gen();

  function next(data) {
    var result = g.next(data);
    if (result.done) return;
    // result.value就是Promise对象
    // result.value异步完成后将执行权交还给Generator函数
    result.value.then(next);
  }

  next();
}

// 自动执行返回value=Promise的generator
// async function fn(args) {
//   // ...
// }
// // 等同于
// function fn(args) {
//   return spawn(function* () {
//     // ...
//   });
// }
export function spawn(genF) {
  return new Promise(function (resolve, reject) {
    const gen = genF();
    function step(nextF) {
      let next;
      try {
        next = nextF();
      } catch (e) {
        return reject(e);
      }
      if (next.done) {
        return resolve(next.value);
      }
      Promise.resolve(next.value).then(
        function (v) {
          step(function () {
            return gen.next(v);
          });
        },
        function (e) {
          step(function () {
            return gen.throw(e);
          });
        }
      );
    }
    step(function () {
      return gen.next(undefined);
    });
  });
}
