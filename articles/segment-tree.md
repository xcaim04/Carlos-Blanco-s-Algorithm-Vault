---
title: "Segment Tree"
description: "Understanding segment trees for range queries and updates"
date: "2024-01-10"
category: "Data Structures"
author: "Data Structure Guru"
readTime: "8 min read"
---

# Segment Tree

A segment tree is a tree data structure used for storing information about intervals, or segments. It allows for efficient query operations over an array or list.

## Structure

A segment tree is a binary tree where:
- Each leaf node represents a single element
- Each internal node represents a segment (range) of elements

## Implementation

```cpp
class SegmentTree {
private:
    vector<int> tree;
    int n;
    
    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
            return;
        }
        
        int mid = (start + end) / 2;
        build(arr, 2*node, start, mid);
        build(arr, 2*node+1, mid+1, end);
        tree[node] = tree[2*node] + tree[2*node+1];
    }
    
public:
    SegmentTree(vector<int>& arr) {
        n = arr.size();
        tree.resize(4 * n);
        build(arr, 1, 0, n-1);
    }
    
    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        
        int mid = (start + end) / 2;
        return query(2*node, start, mid, l, r) + 
               query(2*node+1, mid+1, end, l, r);
    }
};
```

## Operations

### Query
- **Time Complexity**: O(log n)
- Used to find sum/min/max in a range

### Update
- **Time Complexity**: O(log n)
- Updates a single element

## Applications

1. Range sum queries
2. Range minimum/maximum queries
3. Counting inversions
4. Lazy propagation for range updates

## Advantages

- Efficient range queries: O(log n)
- Efficient point updates: O(log n)
- Versatile for various operations
