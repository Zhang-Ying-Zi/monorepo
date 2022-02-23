import { observe, observable } from "./observe.js";

test("** observe **", () => {
  const person = observable({
    name: "张三",
    age: 20,
  });

  let result = "";
  function print() {
    result = `${person.name}, ${person.age}`;
  }

  observe(print);
  person.name = "李四";

  expect(result).toBe("李四, 20");
});
