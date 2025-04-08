---
title: PATH WEAVER
date: 2023-01-15
collaborators: Abhishek Chandra, Jon Weissman
github: https://github.com/nsreekum/pathweaver
---

# PathWeaver
PathWeaver is a Python simulation framework designed for generating and analyzing user movement paths in 2D environments with obstacles. It incorporates real-world data patterns, such as market basket analysis for item placement and transaction generation, making it suitable for applications like simulating customer behavior in retail spaces or generating realistic workloads for Augmented Reality (AR) prefetching studies.

The framework allows you to define an environment from geometric data, analyze transaction patterns to inform item layout, generate synthetic user goals (shopping lists), and simulate how users might navigate the space to achieve those goals while avoiding obstacles.

## Features

* **Environment Loading:** Load 2D environment maps from collider data (CSV format expected).
* **Obstacle Processing:** Merge adjacent or nearby obstacle polygons into unified shapes using `unary_union` or distance-based buffering.
* **Market Basket Analysis:**
    * Generate item categories/clusters from transaction data using graph-based community detection (Louvain algorithm).
    * Generate synthetic user transactions that mimic statistical patterns (co-occurrence, size) of real data using Frequent Itemset Mining (Apriori/FP-Growth).
* **Item Placement:** Place items onto the boundaries of obstacles based on generated categories using a greedy allocation strategy.
* **Pathfinding:**
    * Generate valid random start/end points within the environment.
    * Implement obstacle-avoiding pathfinding between two points using:
        * **Voronoi-based Aisle Graphs:** Approximates centerlines between obstacles for more "aisle-like" paths.
* **Shopping Simulation:** Generate full, multi-segment shopping paths for users based on (synthetic) transactions, ordered by proximity, using Aisle Graph pathfinding.
* **Visualization:** Example scripts provided to visualize maps, obstacles, item placements, and generated user paths using Matplotlib.
* **Modular Structure:** Organized into sub-packages for environment representation, analysis, and path generation.