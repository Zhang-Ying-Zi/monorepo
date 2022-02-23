import { PriorityQueue } from "./PriorityQueue";

test("** PriorityQueue **", () => {
  let priorityQueue = new PriorityQueue();
  expect(priorityQueue).toBeDefined();

  priorityQueue.add(10, 1);
  expect(priorityQueue.peek()).toBe(10);

  priorityQueue.add(5, 2);
  expect(priorityQueue.peek()).toBe(10);

  priorityQueue.add(100, 0);
  expect(priorityQueue.peek()).toBe(100);

  priorityQueue.add(200, 0);
  expect(priorityQueue.peek()).toBe(100);

  priorityQueue.changePriority(100, 10);
  expect(priorityQueue.peek()).toBe(200);

  expect(priorityQueue.poll()).toBe(200);
  expect(priorityQueue.poll()).toBe(10);
  expect(priorityQueue.poll()).toBe(5);
  expect(priorityQueue.poll()).toBe(100);

  const user1 = { name: "Mike" };
  const user2 = { name: "Bill" };
  const user3 = { name: "Jane" };

  priorityQueue.add(user1, 1);
  expect(priorityQueue.peek()).toBe(user1);

  priorityQueue.add(user2, 2);
  expect(priorityQueue.peek()).toBe(user1);

  priorityQueue.add(user3, 0);
  expect(priorityQueue.peek()).toBe(user3);
});
