import { QuickSortInPlace, QuickSort, quickSortSimple } from "./QuickSort";

test("** Quick Sort - QuickSortInPlace **", () => {
  let array = [0, 4, 1, 8, -2, 9, 3, 1];
  let quickSort = new QuickSortInPlace();
  let sortedArray = quickSort.sort(array);
  expect(JSON.stringify(sortedArray)).toBe("[-2,0,1,1,3,4,8,9]");
});

test("** Quick Sort - QuickSort **", () => {
  let array = [0, 4, 1, 8, -2, 9, 3, 1];
  let quickSort = new QuickSort();
  let sortedArray = quickSort.sort(array);
  expect(JSON.stringify(sortedArray)).toBe("[-2,0,1,1,3,4,8,9]");
});

test("** Quick Sort - quickSortSimple **", () => {
  let array = [0, 4, 1, 8, -2, 9, 3, 1];
  let sortedArray = quickSortSimple(array);
  expect(JSON.stringify(sortedArray)).toBe("[-2,0,1,1,3,4,8,9]");
});
