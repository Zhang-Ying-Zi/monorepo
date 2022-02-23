import { flatten, uniqueArray } from "./array.js";

test("** flatten **", () => {
  let array = [[1, 2, [3]], 4, [[5, 6], 7], 8];
  expect(flatten(array).toString()).toBe("1,2,3,4,5,6,7,8");
});

test("** uniqueArray **", () => {
  let array = [1, 1, 2, 2, 2, 3, 4, 1, 2, 5, 3];
  expect(uniqueArray(array).toString()).toBe("1,2,3,4,5");
});
