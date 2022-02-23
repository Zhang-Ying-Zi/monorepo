import { curry, curry2, curry3 } from "./curry";

test("** Curry **", () => {
  let fn = function (a, b, c, d) {
    return [a, b, c, d];
  };
  let curryFn = curry(fn);
  expect(curryFn(1, 2, 3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1, 2, 3)(4).toString()).toBe("1,2,3,4");
  expect(curryFn(1, 2)(3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1)(2, 3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1)(2)(3)(4).toString()).toBe("1,2,3,4");
});

test("** Curry2 **", () => {
  let fn = function (a, b, c, d) {
    return [a, b, c, d];
  };
  let curryFn = curry2(fn);
  expect(curryFn(1, 2, 3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1, 2, 3)(4).toString()).toBe("1,2,3,4");
  expect(curryFn(1, 2)(3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1)(2, 3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1)(2)(3)(4).toString()).toBe("1,2,3,4");
});

test("** Curry3 **", () => {
  let fn = function (a, b, c, d) {
    return [a, b, c, d];
  };
  let curryFn = curry3(fn);
  expect(curryFn(1, 2, 3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1, 2, 3)(4).toString()).toBe("1,2,3,4");
  expect(curryFn(1, 2)(3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1)(2, 3, 4).toString()).toBe("1,2,3,4");
  expect(curryFn(1)(2)(3)(4).toString()).toBe("1,2,3,4");
});
