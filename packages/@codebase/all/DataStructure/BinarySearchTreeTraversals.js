// 递归遍历 - 先序遍历 current, left, right
export function PreOrderRecursive(node, visitFunction) {
  if (node !== null) {
    visitFunction(node);
    PreOrderRecursive(node.leftChild, visitFunction);
    PreOrderRecursive(node.rightChild, visitFunction);
  }
}

// 递归遍历 - 中序遍历 left, current, right
export function InOrderRecursive(node, visitFunction) {
  if (node !== null) {
    InOrderRecursive(node.leftChild, visitFunction);
    visitFunction(node);
    InOrderRecursive(node.rightChild, visitFunction);
  }
}

// 递归遍历 - 后序遍历 left, right, current
export function PostOrderRecursive(node, visitFunction) {
  if (node !== null) {
    PostOrderRecursive(node.leftChild, visitFunction);
    PostOrderRecursive(node.rightChild, visitFunction);
    visitFunction(node);
  }
}

// 非递归遍历 - 先序遍历 current, left, right
export function PreOrder(node, visitFunction) {
  let arr = [];
  if (node !== null) {
    arr.push(node);
  }
  while (arr.length) {
    node = arr.pop();
    visitFunction(node);
    if (node.rightChild !== null) {
      arr.push(node.rightChild);
    }
    if (node.leftChild !== null) {
      arr.push(node.leftChild);
    }
  }
}

// 非递归遍历 - 中序遍历 left, current, right
export function InOrder(node, visitFunction) {
  let arr = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    while (node !== null) {
      arr.push(node);
      node = node.leftChild;
    }
    // 终止条件
    if (arr.length === 0) {
      break;
    }
    node = arr.pop();
    visitFunction(node);
    node = node.rightChild;
  }
}

// 非递归遍历 - 后序遍历 left, right, current
export function PostOrder(node, visitFunction) {
  let arr = [];
  let result = [];
  if (node !== null) {
    arr.push(node);
  }
  while (arr.length) {
    node = arr.pop();
    result.push(node);
    if (node.leftChild !== null) {
      arr.push(node.leftChild);
    }
    if (node.rightChild !== null) {
      arr.push(node.rightChild);
    }
  }
  result.reverse().map(visitFunction);
}
