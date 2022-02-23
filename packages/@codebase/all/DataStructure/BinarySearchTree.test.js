import { BinarySearchTree } from "./BinarySearchTree";
import {
  PreOrderRecursive,
  InOrderRecursive,
  PostOrderRecursive,
  PreOrder,
  InOrder,
  PostOrder,
} from "./BinarySearchTreeTraversals";

test("** BinarySearchTree **", () => {
  let tree = new BinarySearchTree();
  tree.addChild(0);
  tree.addChild(-2);
  tree.addChild(2);
  tree.addChild(-1);
  tree.addChild(-3);
  tree.addChild(1);
  tree.addChild(3);

  expect(tree.find({ value: 2 }).value).toBe(2);
  expect(tree.find({ value: 4 })).toBe(null);

  tree.removeChild(2);
  expect(tree.find({ value: 2 })).toBe(null);
});

let tree = new BinarySearchTree();
tree.addChild(10);
tree.addChild(8);
tree.addChild(12);
tree.addChild(7);
tree.addChild(9);
tree.addChild(11);
tree.addChild(13);

let result = [];
const treeTraversalsVisitFunction = (node) => {
  result.push(node.value);
};

test("** Binary Search Tree Traversals - PreOrderRecursive **", () => {
  result = [];
  tree.traverse(PreOrderRecursive, treeTraversalsVisitFunction);
  expect(JSON.stringify(result)).toBe("[10,8,7,9,12,11,13]");
});

test("** Binary Search Tree Traversals - PreOrder **", () => {
  result = [];
  tree.traverse(PreOrder, treeTraversalsVisitFunction);
  expect(JSON.stringify(result)).toBe("[10,8,7,9,12,11,13]");
});

test("** Binary Search Tree Traversals - InOrderRecursive **", () => {
  result = [];
  tree.traverse(InOrderRecursive, treeTraversalsVisitFunction);
  expect(JSON.stringify(result)).toBe("[7,8,9,10,11,12,13]");
});

test("** Binary Search Tree Traversals - InOrder **", () => {
  result = [];
  tree.traverse(InOrder, treeTraversalsVisitFunction);
  expect(JSON.stringify(result)).toBe("[7,8,9,10,11,12,13]");
});

test("** Binary Search Tree Traversals - PostOrderRecursive **", () => {
  result = [];
  tree.traverse(PostOrderRecursive, treeTraversalsVisitFunction);
  expect(JSON.stringify(result)).toBe("[7,9,8,11,13,12,10]");
});

test("** Binary Search Tree Traversals - PostOrder **", () => {
  result = [];
  tree.traverse(PostOrder, treeTraversalsVisitFunction);
  expect(JSON.stringify(result)).toBe("[7,9,8,11,13,12,10]");
});
