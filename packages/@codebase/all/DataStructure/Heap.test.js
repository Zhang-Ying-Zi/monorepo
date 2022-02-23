import { MinHeap, MaxHeap } from "./Heap";

test("** MinHeap **", () => {
  let minHeap = new MinHeap();
  for (let i = 1; i <= 6; i++) minHeap.add(i);
  expect(minHeap.peek()).toBe(1);
  minHeap.remove(1);
  expect(minHeap.peek()).toBe(2);
  minHeap.remove(6);
  expect(minHeap.peek()).toBe(2);
  minHeap.remove(2);
  expect(minHeap.peek()).toBe(3);
  expect(minHeap.poll()).toBe(3);
  expect(minHeap.poll()).toBe(4);
  expect(minHeap.poll()).toBe(5);
  expect(minHeap.isEmpty()).toBe(true);
});

test("** MaxHeap **", () => {
  let maxHeap = new MaxHeap();
  for (let i = 1; i <= 6; i++) maxHeap.add(i);
  expect(maxHeap.peek()).toBe(6);
  maxHeap.remove(6);
  expect(maxHeap.peek()).toBe(5);
  maxHeap.remove(1);
  expect(maxHeap.peek()).toBe(5);
  maxHeap.remove(5);
  expect(maxHeap.peek()).toBe(4);
  expect(maxHeap.poll()).toBe(4);
  expect(maxHeap.poll()).toBe(3);
  expect(maxHeap.poll()).toBe(2);
  expect(maxHeap.isEmpty()).toBe(true);
});
