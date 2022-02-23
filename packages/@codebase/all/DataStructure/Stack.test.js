import { Stack } from "./Stack";

test("** Stack **", () => {
  let stack = new Stack();
  expect(stack.isEmpty()).toBe(true);

  stack.push(1);
  stack.push(2);
  stack.push(3);

  expect(JSON.stringify(stack.toString())).toBe('"1,2,3"');
  expect(stack.peek()).toBe(3);
  expect(stack.pop()).toBe(3);
  expect(stack.pop()).toBe(2);
  expect(stack.pop()).toBe(1);
  expect(stack.pop()).toBe(null);
  expect(stack.isEmpty()).toBe(true);
});
