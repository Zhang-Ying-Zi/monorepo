import {
  runSyncGenerator,
  runAsyncThunkGenerator,
  runAsyncPromiseGenerator,
  spawn,
} from "./runGenerator";
import thunkify from "./thunkify";

test("** runSyncGenerator **", () => {
  function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
  }
  expect(runSyncGenerator(foo).toString()).toBe("1,2,3,4,5");
});

test("** runAsyncThunkGenerator **", () => {
  function getData(data, cb) {
    setTimeout(() => {
      cb(null, data);
    }, 1000);
  }
  const getDataThunk = thunkify(getData);

  return new Promise((resolve) => {
    function* generator() {
      let data1 = yield getDataThunk(1);
      let data2 = yield getDataThunk(2);
      let data3 = yield getDataThunk(3);
      resolve([data1, data2, data3]);
    }
    runAsyncThunkGenerator(generator);
  }).then((datas) => {
    expect(datas.toString()).toBe("1,2,3");
  });
});

test("** runAsyncPromiseGenerator **", () => {
  function getData(data) {
    return Promise.resolve(data);
  }

  return new Promise((resolve) => {
    function* generator() {
      let data1 = yield getData(1);
      let data2 = yield getData(2);
      let data3 = yield getData(3);
      resolve([data1, data2, data3]);
    }
    runAsyncPromiseGenerator(generator);
  }).then((datas) => {
    expect(datas.toString()).toBe("1,2,3");
  });
});

test("** spawn **", () => {
  function getData(data) {
    return Promise.resolve(data);
  }

  return new Promise((resolve) => {
    function* generator() {
      let data1 = yield getData(1);
      let data2 = yield getData(2);
      let data3 = yield getData(3);
      resolve([data1, data2, data3]);
    }
    spawn(generator);
  }).then((datas) => {
    expect(datas.toString()).toBe("1,2,3");
  });
});
