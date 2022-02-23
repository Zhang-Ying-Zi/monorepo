import { BubbleSort, BubbleSortSimple } from "./BubbleSort.js";

test("** Bubble Sort - class **", () => {
  let array = [9, 0, -3, 1, 4, 3, 1, 8];
  let bubbleSort = new BubbleSort();
  let sortedArray = bubbleSort.sort(array);
  expect(JSON.stringify(sortedArray)).toBe("[-3,0,1,1,3,4,8,9]");
});

test("** Bubble Sort - simple function **", () => {
  let array = [10, 0, -3, 1, 4, 3, 1, 8];
  let sortedArray = BubbleSortSimple(array);
  expect(JSON.stringify(sortedArray)).toBe("[-3,0,1,1,3,4,8,10]");
});
