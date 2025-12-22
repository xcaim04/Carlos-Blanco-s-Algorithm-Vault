---
title: "Dijkstra's Algorithm"
description: "Shortest path algorithm for weighted graphs"
date: "2024-01-05"
category: "Graph Theory"
author: "Graph Specialist"
readTime: "7 min read"
---

# Dijkstra's Algorithm

Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.

## Algorithm Overview

The algorithm maintains a set of vertices whose shortest distance from the source is known. It repeatedly selects the vertex with minimum distance, updates distances of its adjacent vertices.

## Implementation

```cpp
vector<int> dijkstra(int n, vector<vector<pair<int, int>>>& graph, int source) {
    vector<int> dist(n, INT_MAX);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    
    dist[source] = 0;
    pq.push({0, source});
    
    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();
        
        if (d > dist[u]) continue;
        
        for (auto [v, weight] : graph[u]) {
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.push({dist[v], v});
            }
        }
    }
    
    return dist;
}
```

## Complexity Analysis

- **Time Complexity**: O((V + E) log V) with priority queue
- **Space Complexity**: O(V)

Where V is number of vertices and E is number of edges.

## Key Properties

1. Works only with non-negative weights
2. Greedy approach
3. Optimal for single-source shortest path

## Use Cases

- GPS navigation systems
- Network routing protocols
- Social network analysis
- Game pathfinding

## Comparison with Other Algorithms

| Algorithm | Time Complexity | Negative Weights |
|-----------|----------------|------------------|
| Dijkstra | O((V+E) log V) | No |
| Bellman-Ford | O(VE) | Yes |
| Floyd-Warshall | O(V³) | Yes |
