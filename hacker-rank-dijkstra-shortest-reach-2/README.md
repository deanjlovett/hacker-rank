# hacker-rank-dijkstra-shortest-reach-2

Hacker Rank

Dijkstra: Shortest Reach 2

https://www.hackerrank.com/challenges/dijkstrashortreach/problem

file:./dijkstrashortreach-English.pdf

Given an undirected graph and a starting node, determine the lengths of the shortest paths from the starting node to all other nodes in the graph. If a node is unreachable, its distance is -1. Nodes will be numbered consecutively from  to , and edges will have varying distances or lengths.


### Function Description


Complete the shortestReach function in the editor below. It should return an array of integers that represent the shortest distance to each node from the start node in ascending order of node number.


shortestReach has the following parameter(s):


• n: the number of nodes in the graph

• edges: a 2D array of integers where each *edges[i]* consists of three integers that represent the start and end nodes of an edge, followed by its length

• s: the start node number


### Input Format


The first line contains , the number of test cases.


Each test case is as follows:

- The first line contains two space-separated integers ***n*** and ***m***, the number of nodes and edges in the graph.

- Each of the next ***m*** lines contains three space-separated integers ***x***, ***y***, and ***z***, ***r*** the beginning and ending nodes of an edge, and the length of the edge.

- The last line of each test case has an integer ***s***, denoting the starting position.


### Constraints

- 1 ≤ ***t*** ≤ 10
- 2 ≤ ***n*** ≤ 3000
- 1 ≤ ***m*** ≤ ( N x (N-1) ) / 2
- 1 ≤ ***x,y,z*** ≤ ***N***
- 1 ≤≤ 10⁵ 

If there are edges between the same pair of nodes with different weights, they are to be considered as is, like multiple edges.


### Output Format


For each of the ***t*** test cases, print a single line consisting ***n - 1*** space separated integers denoting the shortest distance to the ***n - 1*** nodes from starting position ***s*** in increasing order of their labels, excluding ***s***.


For unreachable nodes, print ***-1***.


### Sample Input

```
1
4 4
1 2 24
1 4 20
3 1 3
4 3 12
1
```

### Sample Output

```
24 3 15
```
# how to run

### To Run javascript version:

node dsr2.js < sample-input.txt 
