import { LinkedList } from "./LinkedList";

export class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  isEmpty() {
    return !this.linkedList.head;
  }

  peek() {
    if (this.isEmpty()) {
      return null;
    }

    return this.linkedList.tail.value;
  }

  push(value) {
    this.linkedList.append(value);
  }

  pop() {
    const removedTail = this.linkedList.deleteTail();
    return removedTail ? removedTail.value : null;
  }

  toArray() {
    return this.linkedList
      .toArray()
      .map((linkedListNode) => linkedListNode.value);
  }

  toString() {
    return this.linkedList.toString();
  }
}
