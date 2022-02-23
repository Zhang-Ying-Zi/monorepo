/* eslint-disable no-unused-vars */
// 二叉树构造函数
function Tree(left, label, right) {
  this.left = left;
  this.label = label;
  this.right = right;
}

// 生成二叉树
function make(array) {
  if (array.length == 1) return new Tree(null, array[0], null);
  return new Tree(make(array[0]), array[1], make(array[2]));
}

// 中序遍历
function* inorder(t) {
  if (t) {
    yield* inorder(t.left);
    yield t.label;
    yield* inorder(t.right);
  }
}

// let tree = make([[["a"], "b", ["c"]], "d", [["e"], "f", ["g"]]]);

// // 遍历二叉树
// var result = [];
// for (let node of inorder(tree)) {
//   result.push(node);
// }

// console.log(result); // ["a", "b", "c", "d", "e", "f", "g"]
