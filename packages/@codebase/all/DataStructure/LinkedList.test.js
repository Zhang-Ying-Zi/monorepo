import { LinkedList } from "./LinkedList";

test("** LinkedList **", () => {
  let list = new LinkedList();
  for (let i = 0; i < 10; i++) {
    list.append(i);
  }

  expect(list.reverse().toString()).toBe("9,8,7,6,5,4,3,2,1,0");

  list.reverse();

  expect(list.find({ value: 5 }).value).toBe(5);
  expect(list.find({ value: 11 })).toBe(null);
  expect(list.find({})).toBe(null);

  expect(list.toString()).toBe("0,1,2,3,4,5,6,7,8,9");
  list.delete(0);
  expect(list.toString()).toBe("1,2,3,4,5,6,7,8,9");
  list.delete(9);
  expect(list.toString()).toBe("1,2,3,4,5,6,7,8");
  list.delete(3);
  expect(list.toString()).toBe("1,2,4,5,6,7,8");
  list.delete(1);
  expect(list.toString()).toBe("2,4,5,6,7,8");
  list.delete(8);
  expect(list.toString()).toBe("2,4,5,6,7");
  list.delete(7);
  expect(list.toString()).toBe("2,4,5,6");
  list.delete(6);
  expect(list.toString()).toBe("2,4,5");
  list.delete(4);
  expect(list.toString()).toBe("2,5");
  list.delete(2);
  expect(list.toString()).toBe("5");
  list.delete(5);
  expect(list.toString()).toBe("");

  list.append(11);
  list.append(12);
  expect(list.deleteTail().value).toBe(12);
  expect(list.deleteTail().value).toBe(11);
  expect(list.deleteTail()).toBe(null);

  list.append(11);
  list.append(12);
  expect(list.deleteHead().value).toBe(11);
  expect(list.deleteHead().value).toBe(12);
  expect(list.deleteHead()).toBe(null);
});
