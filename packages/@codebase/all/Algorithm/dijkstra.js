/**
 *
 * 最短路径
 *
 */

class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  isEmpty() {
    return this.collection.length === 0;
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        //  node’s value at index 0 and its weight at index 1
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(element);
      }
    }
  }

  dequeue() {
    const value = this.collection.shift();
    return value;
  }
}

class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = [];
  }

  addNode(node) {
    this.nodes.push(node);
    this.adjacencyList[node] = [];
  }

  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight: weight });
    this.adjacencyList[node2].push({ node: node1, weight: weight });
  }

  findPathWithDijkstra(startNode, endNode) {
    // startNode到各个node的最短路径值
    const times = {};
    // 记录各个node到startNode的最短路径值的前一个node
    const backtrace = {};
    const pq = new PriorityQueue();

    // 初始化times
    times[startNode] = 0;
    this.nodes.forEach((node) => {
      if (node !== startNode) {
        times[node] = Infinity;
      }
    });

    // 从startNode开始遍历
    pq.enqueue([startNode, 0]);

    while (!pq.isEmpty()) {
      const shortestStep = pq.dequeue();
      const currentNode = shortestStep[0];
      this.adjacencyList[currentNode].forEach((neighbor) => {
        const time = times[currentNode] + neighbor.weight;
        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          // 加入新一轮全新权重
          pq.enqueue([neighbor.node, time]);
        }
      });
    }

    // 最短路径数组
    const path = [endNode];
    let lastStep = endNode;
    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep]);
      lastStep = backtrace[lastStep];
    }
    return `Path is ${path} and time is ${times[endNode]}`;
  }
}

const map = new Graph();
map.addNode("Fullstack");
map.addNode("Starbucks");
map.addNode("Dubliner");
map.addNode("Dig Inn");
map.addNode("Insomnia Cookies");
map.addNode("Cafe Grumpy");
map.addEdge("Fullstack", "Starbucks", 6);
map.addEdge("Fullstack", "Dig Inn", 7);
map.addEdge("Fullstack", "Dubliner", 2);
map.addEdge("Dubliner", "Dig Inn", 4);
map.addEdge("Dubliner", "Starbucks", 3);
map.addEdge("Dubliner", "Insomnia Cookies", 7);
map.addEdge("Starbucks", "Insomnia Cookies", 6);
map.addEdge("Dig Inn", "Cafe Grumpy", 9);
map.addEdge("Insomnia Cookies", "Cafe Grumpy", 5);
map.findPathWithDijkstra("Fullstack", "Cafe Grumpy");
