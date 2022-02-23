import { HashTable } from "./HashTable";

test("** HashTable **", () => {
  let hashTable = new HashTable();
  hashTable.set("aaa", 111);
  hashTable.set("bbb", 222);
  hashTable.set("ccc", 333);

  expect(JSON.stringify(hashTable.getKeys())).toBe('["aaa","bbb","ccc"]');
  expect(JSON.stringify(hashTable.getValues())).toBe("[111,222,333]");

  expect(hashTable.has("aaa")).toBe(true);
  expect(hashTable.has("ddd")).toBe(false);

  expect(hashTable.get("bbb")).toBe(222);

  hashTable.delete("bbb");
  expect(hashTable.get("bbb")).toBe(undefined);
});
