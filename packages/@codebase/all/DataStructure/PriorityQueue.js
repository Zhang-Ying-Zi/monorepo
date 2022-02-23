// 1. Every item has a priority associated with it.
// 2. An element with high priority is dequeued before an element with low priority.
// 3. If two elements have the same priority, they are served according to their order in the queue.

import { MinHeap } from "./Heap";
import Comparator from "./Comparator";

// It is the same as min heap except that when comparing two elements
// we take into account its priority instead of the element's value.
export class PriorityQueue extends MinHeap {
  constructor() {
    super();

    this.priorities = new Map();

    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  add(item, priority = 0) {
    this.priorities.set(item, priority);
    super.add(item);
    return this;
  }

  remove(item, customFindingComparator) {
    super.remove(item, customFindingComparator);
    this.priorities.delete(item);
    return this;
  }

  changePriority(item, priority) {
    this.remove(item, new Comparator(this.compareValue));
    this.add(item, priority);
    return this;
  }

  findByValue(item) {
    return this.find(item, new Comparator(this.compareValue));
  }

  hasValue(item) {
    return this.findByValue(item).length > 0;
  }

  comparePriority(a, b) {
    if (this.priorities.get(a) === this.priorities.get(b)) {
      return 0;
    }
    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  compareValue(a, b) {
    if (a === b) {
      return 0;
    }
    return a < b ? -1 : 1;
  }
}
