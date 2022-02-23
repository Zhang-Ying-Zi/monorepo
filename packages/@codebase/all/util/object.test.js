import { objectEntries, objectEntries2 } from "./object";

test("** objectEntries **", () => {
  let jane = { first: "Jane", last: "Doe" };

  for (let [key, value] of objectEntries(jane)) {
    if (key === "first") expect(value).toBe("Jane");
    if (key === "last") expect(value).toBe("Doe");
  }
});

test("** objectEntries2 **", () => {
  let jane = { first: "Jane", last: "Doe" };

  jane[Symbol.iterator] = objectEntries2;

  for (let [key, value] of jane) {
    if (key === "first") expect(value).toBe("Jane");
    if (key === "last") expect(value).toBe("Doe");
  }
});
