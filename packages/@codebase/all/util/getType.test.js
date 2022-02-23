import getType from "./getType";

test("** getType **", () => {
  expect(getType(1)).toBe("number");
  expect(getType("hi")).toBe("string");
  expect(getType({ a: "hi" })).toBe("object");
  expect(getType([1, "a"])).toBe("array");
  expect(getType(true)).toBe("boolean");
  expect(getType(() => {})).toBe("function");
  expect(getType(null)).toBe("null");
  expect(getType(undefined)).toBe("undefined");
  expect(getType(Symbol(1))).toBe("symbol");
});
