import { MergeSort } from "./MergeSort";

test("** Merge Sort **", () => {
  let array = [0, 4, 1, 8, -2, 9, 3, 1];
  let sortedArray = MergeSort(array);
  expect(JSON.stringify(sortedArray)).toBe("[-2,0,1,1,3,4,8,9]");
});
