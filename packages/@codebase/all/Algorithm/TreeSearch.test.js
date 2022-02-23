import { Graph } from "../DataStructure/Graph";
import { TreeSearch } from "./TreeSearch";

let graph = new Graph(true);
graph.addNode(1);
graph.addNode(2);
graph.addNode(3);
graph.addNode(4);
graph.addNode(5);
graph.addNode(6);
graph.addEdge(1, 2);
graph.addEdge(1, 3);
graph.addEdge(1, 4);
graph.addEdge(2, 5);
graph.addEdge(2, 6);

let result = [];
let treeSearch = new TreeSearch(graph, (item) => {
  result.push(item.value);
});

test("** Tree Search - Breadth-first search - BFS **", () => {
  result = [];
  treeSearch.BFS(1);
  expect(JSON.stringify(result)).toBe("[1,2,3,4,5,6]");
});

test("** Tree Search - Depth-first search - DFS **", () => {
  result = [];
  treeSearch.DFS(1);
  expect(JSON.stringify(result)).toBe("[1,2,5,6,3,4]");
});
