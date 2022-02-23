import Comparator from "./Comparator";

// 二叉搜索树
class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null;
    this.rightChild = null;
  }
}

export class BinarySearchTree {
  constructor(comparatorFunction) {
    this.root = null;
    this.compare = new Comparator(comparatorFunction);
  }

  addChild(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    } else {
      let currentNode = this.root;
      let added = false;
      while (!added && currentNode) {
        if (this.compare.equal(value, currentNode.value)) {
          return "Duplicates cannot be added";
        }
        if (this.compare.lessThan(value, currentNode.value)) {
          if (currentNode.leftChild === null) {
            currentNode.leftChild = new Node(value);
            added = true;
          } else {
            currentNode = currentNode.leftChild;
          }
        } else if (this.compare.greaterThan(value, currentNode.value)) {
          if (currentNode.rightChild === null) {
            currentNode.rightChild = new Node(value);
            added = true;
          } else {
            currentNode = currentNode.rightChild;
          }
        }
      }
    }
  }

  //   When removing a node there are four cases to account for:
  //   1. The node isn’t found
  //   2. The node is a leaf node (no children)
  //   3. The node has one child
  //   4. The node has two children
  removeChild(value) {
    let currentNode = this.root;
    let found = false;
    let nodeToRemove;
    let parentNode = null;
    while (!found) {
      if (currentNode === null || currentNode.value === null) {
        return "The node was not found";
      }
      if (this.compare.equal(value, currentNode.value)) {
        nodeToRemove = currentNode;
        found = true;
      } else if (this.compare.lessThan(value, currentNode.value)) {
        parentNode = currentNode;
        currentNode = currentNode.leftChild;
      } else {
        parentNode = currentNode;
        currentNode = currentNode.rightChild;
      }
    }

    const nodeToRemoveIsParentsLeftChild =
      parentNode.leftChild === nodeToRemove;

    if (nodeToRemove.leftChild === null && nodeToRemove.rightChild === null) {
      // no child
      if (nodeToRemoveIsParentsLeftChild) {
        parentNode.leftChild = null;
      } else {
        parentNode.rightChild = null;
      }
    } else if (
      nodeToRemove.leftChild !== null &&
      nodeToRemove.rightChild === null
    ) {
      // Only has a left child
      if (nodeToRemoveIsParentsLeftChild) {
        parentNode.leftChild = nodeToRemove.leftChild;
      } else {
        parentNode.rightChild = nodeToRemove.leftChild;
      }
    } else if (
      nodeToRemove.rightChild !== null &&
      nodeToRemove.leftChild === null
    ) {
      // Only has a right child
      if (nodeToRemoveIsParentsLeftChild) {
        parentNode.leftChild = nodeToRemove.rightChild;
      } else {
        parentNode.rightChild = nodeToRemove.rightChild;
      }
    } else {
      // Has two children

      // If the node we’re deleting has two children. Here’s the algorithm:
      // Set the parentNode’s pointer to the right subtree of the node we’re deleting.
      // If the parent node’s right child points to the node we’re removing, set parentNode.rightChild to the nodeToDelete.rightChild.
      // If the parent node’s left child points to the node we’re removing, set parentNode.leftChild to the nodeToDelete.rightChild.
      // Traverse the right subtree’s left branches until we find a free spot.
      // Once a free left subtree spot has been found, add the nodeToDelete’s left subtree.
      const rightSubTree = nodeToRemove.rightChild;
      const leftSubTree = nodeToRemove.leftChild;
      // Set parent node's respective child to the right sub tree
      if (nodeToRemoveIsParentsLeftChild) {
        parentNode.leftChild = rightSubTree;
      } else {
        parentNode.rightChild = rightSubTree;
      }
      // Find the lowest free space on the left side of the right sub tree and add the leftSubTree
      let currLeftNode = rightSubTree;
      let currLeftParent;
      let foundSpace = false;
      while (!foundSpace) {
        if (currLeftNode === null) {
          foundSpace = true;
        } else {
          currLeftParent = currLeftNode;
          currLeftNode = currLeftNode.leftChild;
        }
      }
      currLeftParent.leftChild = leftSubTree;
      return "The node was successfully deleted";
    }
  }

  find({ value = undefined, callback = undefined }) {
    if (!this.root || (value === undefined && callback === undefined))
      return null;
    let currentNode = this.root;
    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }
      if (this.compare.equal(value, currentNode.value)) {
        return currentNode;
      } else if (this.compare.greaterThan(value, currentNode.value)) {
        currentNode = currentNode.rightChild;
      } else {
        currentNode = currentNode.leftChild;
      }
    }
    return null;
  }

  traverse(traverseFunction, visitFunction = undefined) {
    const defaultVisitFunction = (node) => {
      return node.value;
    };
    visitFunction = visitFunction || defaultVisitFunction;
    traverseFunction(this.root, visitFunction);
  }
}
