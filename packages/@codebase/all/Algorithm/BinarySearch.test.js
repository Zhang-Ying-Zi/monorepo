import { BinarySearch } from "./BinarySearch";

test("** Binary Search **", () => {
  let sortedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(BinarySearch(sortedArray, 0)).toBe(0);
  expect(BinarySearch(sortedArray, 9)).toBe(9);
  expect(BinarySearch(sortedArray, -1)).toBe(false);
});
