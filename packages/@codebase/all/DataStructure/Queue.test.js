import { Queue } from "./Queue";

test("** Queue **", () => {
  let queue = new Queue();
  expect(queue.isEmpty()).toBe(true);

  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);

  expect(JSON.stringify(queue.toString())).toBe('"1,2,3"');
  expect(queue.peek()).toBe(1);
  expect(queue.dequeue()).toBe(1);
  expect(queue.dequeue()).toBe(2);
  expect(queue.dequeue()).toBe(3);
  expect(queue.dequeue()).toBe(null);
  expect(queue.isEmpty()).toBe(true);
});
