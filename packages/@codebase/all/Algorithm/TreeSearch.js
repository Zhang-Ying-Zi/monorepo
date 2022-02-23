import { Queue } from "../DataStructure/Queue";

export class TreeSearch {
  constructor(graph, visitFunction) {
    this.graph = graph;
    const defaultVisitFunction = (node) => {
      console.log(node.value + " ");
    };
    this.visitFunction = visitFunction || defaultVisitFunction;
  }

  // 深度优先
  DFS(startValue) {
    const self = this;
    let startNode = this.graph.getNode(startValue);
    let visitedNodesHash = this.graph.nodes.reduce(
      (accumulator, currentNode) => {
        accumulator[currentNode.value] = false;
        return accumulator;
      },
      {}
    );
    function exporeNode(node) {
      if (visitedNodesHash[node.value]) return;
      self.visitFunction(node);
      visitedNodesHash[node.value] = true;
      node.edges.forEach((edge) => exporeNode(edge));
    }
    exporeNode(startNode);
  }

  // 广度优先
  BFS(startValue) {
    let startNode = this.graph.getNode(startValue);
    let visitedNodesHash = this.graph.nodes.reduce(
      (accumulator, currentNode) => {
        accumulator[currentNode.value] = false;
        return accumulator;
      },
      {}
    );
    const queue = new Queue();
    queue.enqueue(startNode);
    while (!queue.isEmpty()) {
      let currentNode = queue.dequeue();
      if (!visitedNodesHash[currentNode.value]) {
        this.visitFunction(currentNode);
        visitedNodesHash[currentNode.value] = true;
      }
      currentNode.edges.forEach((node) => {
        if (!visitedNodesHash[node.value]) {
          queue.enqueue(node);
        }
      });
    }
  }
}
