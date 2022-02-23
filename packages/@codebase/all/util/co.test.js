import co from "./co.js";
import thunkify from "./thunkify";

test("** co thunk **", () => {
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
    co(generator);
  }).then((datas) => {
    expect(datas.toString()).toBe("1,2,3");
  });
});

test("** co promise **", () => {
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
    co(generator);
  }).then((datas) => {
    expect(datas.toString()).toBe("1,2,3");
  });
});
