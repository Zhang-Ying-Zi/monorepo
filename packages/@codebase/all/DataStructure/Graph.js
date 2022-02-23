class Node {
  constructor(value) {
    this.value = value;
    this.edges = [];
  }
}

export class Graph {
  constructor(directed = false) {
    this.directed = directed;
    this.nodes = [];
  }

  addNode(value) {
    this.nodes.push(new Node(value));
  }

  removeNode(value) {
    this.nodes = this.nodes.filter((node) => node.value !== value);
    this.nodes.forEach((node) => {
      node.edges = node.edges.filter((edge) => edge.value !== value);
    });
  }

  getNode(value) {
    return this.nodes.find((node) => node.value === value);
  }

  addEdge(value1, value2) {
    const node1 = this.getNode(value1);
    const node2 = this.getNode(value2);
    node1.edges.push(node2);
    if (!this.directed) {
      node2.edges.push(node1);
    }
    return `An edge between ${node1.value} and ${node2.value} was added`;
  }
}

// import { LinkedList } from "./LinkedList";

// class GraphVertex {
//   constructor(value) {
//     if (value === undefined) {
//       throw new Error("Graph vertex must have a value");
//     }

//     const edgeComparator = (edgeA, edgeB) => {
//       if (edgeA.getKey() === edgeB.getKey()) {
//         return 0;
//       }

//       return edgeA.getKey() < edgeB.getKey() ? -1 : 1;
//     };

//     this.value = value;
//     this.edges = new LinkedList(edgeComparator);
//   }

//   addEdge(edge) {
//     this.edges.append(edge);

//     return this;
//   }

//   deleteEdge(edge) {
//     this.edges.delete(edge);
//   }

//   getNeighbors() {
//     const edges = this.edges.toArray();

//     // Return either start or end vertex.
//     // For directed graphs it is possible that current vertex will be the end one.
//     return edges.map((node) =>
//       node.value.startVertex === this
//         ? node.value.endVertex
//         : node.value.startVertex
//     );
//   }

//   getEdges() {
//     return this.edges.toArray().map((linkedListNode) => linkedListNode.value);
//   }

//   getDegree() {
//     return this.edges.toArray().length;
//   }

//   hasEdge(requiredEdge) {
//     const edgeNode = this.edges.find({
//       callback: (edge) => edge === requiredEdge,
//     });

//     return !!edgeNode;
//   }

//   hasNeighbor(vertex) {
//     const vertexNode = this.edges.find({
//       callback: (edge) =>
//         edge.startVertex === vertex || edge.endVertex === vertex,
//     });

//     return !!vertexNode;
//   }

//   findEdge(vertex) {
//     const edge = this.edges.find({
//       callback: (edge) => {
//         return edge.startVertex === vertex || edge.endVertex === vertex;
//       },
//     });

//     return edge ? edge.value : null;
//   }

//   getKey() {
//     return this.value;
//   }

//   deleteAllEdges() {
//     this.getEdges().forEach((edge) => this.deleteEdge(edge));

//     return this;
//   }

//   toString(callback) {
//     return callback ? callback(this.value) : `${this.value}`;
//   }
// }

// class GraphEdge {
//   constructor(startVertex, endVertex, weight = 0) {
//     this.startVertex = startVertex;
//     this.endVertex = endVertex;
//     this.weight = weight;
//   }

//   getKey() {
//     const startVertexKey = this.startVertex.getKey();
//     const endVertexKey = this.endVertex.getKey();

//     return `${startVertexKey}_${endVertexKey}`;
//   }

//   reverse() {
//     const tmp = this.startVertex;
//     this.startVertex = this.endVertex;
//     this.endVertex = tmp;

//     return this;
//   }

//   toString() {
//     return this.getKey();
//   }
// }

// export class Graph {
//   constructor(isDirected = false) {
//     this.vertices = {};
//     this.edges = {};
//     this.isDirected = isDirected;
//   }

//   addVertex(newVertex) {
//     this.vertices[newVertex.getKey()] = newVertex;

//     return this;
//   }

//   getVertexByKey(vertexKey) {
//     return this.vertices[vertexKey];
//   }

//   getNeighbors(vertex) {
//     return vertex.getNeighbors();
//   }

//   getAllVertices() {
//     return Object.values(this.vertices);
//   }

//   getAllEdges() {
//     return Object.values(this.edges);
//   }

//   addEdge(edge) {
//     // Try to find and end start vertices.
//     let startVertex = this.getVertexByKey(edge.startVertex.getKey());
//     let endVertex = this.getVertexByKey(edge.endVertex.getKey());

//     // Insert start vertex if it wasn't inserted.
//     if (!startVertex) {
//       this.addVertex(edge.startVertex);
//       startVertex = this.getVertexByKey(edge.startVertex.getKey());
//     }

//     // Insert end vertex if it wasn't inserted.
//     if (!endVertex) {
//       this.addVertex(edge.endVertex);
//       endVertex = this.getVertexByKey(edge.endVertex.getKey());
//     }

//     // Check if edge has been already added.
//     if (this.edges[edge.getKey()]) {
//       throw new Error("Edge has already been added before");
//     } else {
//       this.edges[edge.getKey()] = edge;
//     }

//     // Add edge to the vertices.
//     if (this.isDirected) {
//       // If graph IS directed then add the edge only to start vertex.
//       startVertex.addEdge(edge);
//     } else {
//       // If graph ISN'T directed then add the edge to both vertices.
//       startVertex.addEdge(edge);
//       endVertex.addEdge(edge);
//     }

//     return this;
//   }

//   deleteEdge(edge) {
//     // Delete edge from the list of edges.
//     if (this.edges[edge.getKey()]) {
//       delete this.edges[edge.getKey()];
//     } else {
//       throw new Error("Edge not found in graph");
//     }

//     // Try to find and end start vertices and delete edge from them.
//     const startVertex = this.getVertexByKey(edge.startVertex.getKey());
//     const endVertex = this.getVertexByKey(edge.endVertex.getKey());

//     startVertex.deleteEdge(edge);
//     endVertex.deleteEdge(edge);
//   }

//   findEdge(startVertex, endVertex) {
//     const vertex = this.getVertexByKey(startVertex.getKey());

//     if (!vertex) {
//       return null;
//     }

//     return vertex.findEdge(endVertex);
//   }

//   getWeight() {
//     return this.getAllEdges().reduce((weight, graphEdge) => {
//       return weight + graphEdge.weight;
//     }, 0);
//   }

//   reverse() {
//     this.getAllEdges().forEach((edge) => {
//       // Delete straight edge from graph and from vertices.
//       this.deleteEdge(edge);

//       // Reverse the edge.
//       edge.reverse();

//       // Add reversed edge back to the graph and its vertices.
//       this.addEdge(edge);
//     });

//     return this;
//   }

//   getVerticesIndices() {
//     const verticesIndices = {};
//     this.getAllVertices().forEach((vertex, index) => {
//       verticesIndices[vertex.getKey()] = index;
//     });

//     return verticesIndices;
//   }

//   getAdjacencyMatrix() {
//     const vertices = this.getAllVertices();
//     const verticesIndices = this.getVerticesIndices();

//     // Init matrix with infinities meaning that there is no ways of
//     // getting from one vertex to another yet.
//     const adjacencyMatrix = Array(vertices.length)
//       .fill(null)
//       .map(() => {
//         return Array(vertices.length).fill(Infinity);
//       });

//     // Fill the columns.
//     vertices.forEach((vertex, vertexIndex) => {
//       vertex.getNeighbors().forEach((neighbor) => {
//         const neighborIndex = verticesIndices[neighbor.getKey()];
//         adjacencyMatrix[vertexIndex][neighborIndex] = this.findEdge(
//           vertex,
//           neighbor
//         ).weight;
//       });
//     });

//     return adjacencyMatrix;
//   }

//   toString() {
//     return Object.keys(this.vertices).toString();
//   }
// }
