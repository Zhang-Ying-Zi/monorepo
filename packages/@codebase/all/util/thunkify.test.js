import thunkify from "./thunkify";

test("** thunkify **", () => {
  let fn = function (a, b, callback) {
    setTimeout(() => {
      callback(null, [a, b]);
    }, 1000);
  };

  let fnThunk = thunkify(fn);

  return new Promise((resolve) => {
    fnThunk(
      1,
      2
    )((err, data) => {
      resolve(data);
    });
  }).then((data) => {
    expect(data.toString()).toBe("1,2");
  });
});
