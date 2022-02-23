import { isNum } from "./number";

test("** isNum **", () => {
  expect(isNum(-1)).toBe(true);
  expect(isNum(0)).toBe(true);
  expect(isNum(4.2)).toBe(true);
  expect(isNum(null)).toBe(false);
  expect(isNum(undefined)).toBe(false);
  expect(isNum({})).toBe(false);
});
