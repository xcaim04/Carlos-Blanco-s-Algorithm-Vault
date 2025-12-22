---
title: "Binary Search"
description: "Learn about binary search algorithm, its implementation, and time complexity analysis"
date: "2024-01-15"
category: "Algorithms"
author: "Algorithm Expert"
readTime: "5 min read"
---

# Binary Search

Binary search is one of the most fundamental algorithms in computer science. It's an efficient algorithm for finding an item from a sorted list of items.

## How it Works

Binary search works by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to the upper half.

## Algorithm

```cpp
int binarySearch(vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Element not found
}
```

## Time Complexity

- **Best Case**: O(1) - Element found at middle
- **Average Case**: O(log n)
- **Worst Case**: O(log n)

## Space Complexity

- **Iterative**: O(1)
- **Recursive**: O(log n) due to call stack

## Applications

1. Searching in sorted arrays
2. Finding boundaries in sorted arrays
3. Computing square roots
4. Finding peak elements
5. Rotated sorted array problems

## Key Points

- Array must be sorted
- More efficient than linear search for large datasets
- Forms the basis for many advanced algorithms
