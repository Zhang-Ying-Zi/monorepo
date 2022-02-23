import { uniqueString, isStr } from "./string.js";

test("** uniqueString **", () => {
  let str = "abcbbacbac";
  expect(uniqueString(str)).toBe("abc");
});

test("** isStr **", () => {
  expect(isStr("abcbbacbac")).toBe(true);
  expect(isStr(null)).toBe(false);
  expect(isStr(undefined)).toBe(false);
  expect(isStr({})).toBe(false);
});
