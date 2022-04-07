import * as util from "./util.js";

test("** isRelative **", () => {
  expect(util.isRelative("/foo/bar/baz")).toBe(false);
  expect(util.isRelative("C:\\foo\\bar\\baz")).toBe(false);
  expect(util.isRelative("foo/bar/baz.txt")).toBe(true);
  expect(util.isRelative("foo.md")).toBe(true);
  expect(util.isRelative("./foo.md")).toBe(true);
});

test("** getUrlParams **", () => {
  // expect(util.getUrlParams(location.search)).toBe('// Get the parameters of the current URL');
  let params = util.getUrlParams("foo=Foo&bar=Bar");
  expect(params.foo).toBe("Foo");
  expect(params.bar).toBe("Bar");
  params = util.getUrlParams("foo=Foo&foo=Fuzz&bar=Bar");
  expect(params.foo.length).toBe(2);
  expect(params.bar).toBe("Bar");
});

test("** flatten **", () => {
  let array = [[1, 2, [3]], 4, [[5, 6], 7], 8];
  expect(util.flatten(array).toString()).toBe("1,2,3,4,5,6,7,8");
});

test("** uniqueArray **", () => {
  let array = [1, 1, 2, 2, 2, 3, 4, 1, 2, 5, 3];
  expect(util.uniqueArray(array).toString()).toBe("1,2,3,4,5");
});

test("** isNum **", () => {
  expect(util.isNum(-1)).toBe(true);
  expect(util.isNum(0)).toBe(true);
  expect(util.isNum(4.2)).toBe(true);
  expect(util.isNum(null)).toBe(false);
  expect(util.isNum(undefined)).toBe(false);
  expect(util.isNum({})).toBe(false);
});

test("** objectEntries **", () => {
  let jane = { first: "Jane", last: "Doe" };

  for (let [key, value] of util.objectEntries(jane)) {
    if (key === "first") expect(value).toBe("Jane");
    if (key === "last") expect(value).toBe("Doe");
  }
});

test("** objectEntries2 **", () => {
  let jane = { first: "Jane", last: "Doe" };

  jane[Symbol.iterator] = util.objectEntries2;

  for (let [key, value] of jane) {
    if (key === "first") expect(value).toBe("Jane");
    if (key === "last") expect(value).toBe("Doe");
  }
});

test("** uniqueString **", () => {
  let str = "abcbbacbac";
  expect(util.uniqueString(str)).toBe("abc");
});

test("** isStr **", () => {
  expect(util.isStr("abcbbacbac")).toBe(true);
  expect(util.isStr(null)).toBe(false);
  expect(util.isStr(undefined)).toBe(false);
  expect(util.isStr({})).toBe(false);
});
