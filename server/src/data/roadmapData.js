// 90-Day Developer Upgrade Roadmap: 5 Phases / 13 Weeks
// Deeply integrated with LeetCode Problem Sets & Striver A2Z Curriculum

export const ROADMAP_PHASES = [
  {
    phaseId: 1,
    phaseNumber: "Phase 01",
    phaseTitle: "Foundations & Clean Code Architecture",
    phaseSubtitle: "Weeks 1-3 • Core Patterns, Spring Boot / Node.js Scaffolding & DSA Warmup",
    branchName: "phase/01-foundations",
    weeks: [
      {
        weekNumber: 1,
        title: "Week 01: Core Language Mechanics, Time Complexity & Basic API Scaffolding",
        goal: "Master time & space complexities, basic math, recursion, and initialize Spring Boot / Node.js environments.",
        tracks: ["DSA", "BACKEND", "CS_FUNDAMENTALS"],
        milestones: [
          { id: "m_w1_1", text: "Striver Step 1: Basics, Math & Recursion trees", track: "DSA" },
          { id: "m_w1_2", text: "Java 21 Virtual Threads / Node.js Event Loop Deep Dive", track: "CS_FUNDAMENTALS" },
          { id: "m_w1_3", text: "Spring Boot 3 starter setup & Express REST scaffolding with clean controller/service/repo layers", track: "BACKEND" },
          { id: "m_w1_4", text: "Log 5 daily commits with >= 1.5 hrs/day", track: "BACKEND" }
        ],
        leetcodeProblems: [
          { id: "lc_9", number: 9, title: "Palindrome Number", difficulty: "EASY", url: "https://leetcode.com/problems/palindrome-number/", dsaId: "p1_3_3" },
          { id: "lc_7", number: 7, title: "Reverse Integer", difficulty: "MEDIUM", url: "https://leetcode.com/problems/reverse-integer/", dsaId: "p1_3_2" },
          { id: "lc_509", number: 509, title: "Fibonacci Number", difficulty: "EASY", url: "https://leetcode.com/problems/fibonacci-number/", dsaId: "p1_4_6" },
          { id: "lc_125", number: 125, title: "Valid Palindrome", difficulty: "EASY", url: "https://leetcode.com/problems/valid-palindrome/", dsaId: "p1_4_5" }
        ]
      },
      {
        weekNumber: 2,
        title: "Week 02: Array Patterns (Kadane's, 2-Pointers, Moore's) & Database Fundamentals",
        goal: "Master Striver Step 3 Array Easy/Medium problems and configure PostgreSQL with JPA/Hibernate & Node pg.",
        tracks: ["DSA", "BACKEND"],
        milestones: [
          { id: "m_w2_1", text: "Striver Step 3: Arrays Easy (12 problems) + Medium (Kadane's, DNF, Stock Buy/Sell)", track: "DSA" },
          { id: "m_w2_2", text: "Relational DB design: normalization (1NF-3NF), indexing (B-Tree vs Hash)", track: "CS_FUNDAMENTALS" },
          { id: "m_w2_3", text: "Spring Data JPA Entity mapping (@Entity, @Table, @OneToMany) & Connection Pooling (HikariCP)", track: "BACKEND" },
          { id: "m_w2_4", text: "Solve 15 LeetCode Array problems", track: "DSA" }
        ],
        leetcodeProblems: [
          { id: "lc_1", number: 1, title: "Two Sum", difficulty: "EASY", url: "https://leetcode.com/problems/two-sum/", dsaId: "p3_2_1" },
          { id: "lc_75", number: 75, title: "Sort Colors (Dutch National Flag)", difficulty: "MEDIUM", url: "https://leetcode.com/problems/sort-colors/", dsaId: "p3_2_2" },
          { id: "lc_53", number: 53, title: "Maximum Subarray (Kadane's)", difficulty: "MEDIUM", url: "https://leetcode.com/problems/maximum-subarray/", dsaId: "p3_2_4" },
          { id: "lc_121", number: 121, title: "Best Time to Buy and Sell Stock", difficulty: "EASY", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", dsaId: "p3_2_5" },
          { id: "lc_169", number: 169, title: "Majority Element (Moore's Voting)", difficulty: "EASY", url: "https://leetcode.com/problems/majority-element/", dsaId: "p3_2_3" },
          { id: "lc_31", number: 31, title: "Next Permutation", difficulty: "MEDIUM", url: "https://leetcode.com/problems/next-permutation/", dsaId: "p3_2_7" },
          { id: "lc_560", number: 560, title: "Subarray Sum Equals K", difficulty: "MEDIUM", url: "https://leetcode.com/problems/subarray-sum-equals-k/", dsaId: "p3_2_13" }
        ]
      },
      {
        weekNumber: 3,
        title: "Week 03: Binary Search on Search Space & Multi-Account JWT Security",
        goal: "Conquer Binary Search on 1D/2D and answers, build stateless JWT authentication from scratch.",
        tracks: ["DSA", "BACKEND"],
        milestones: [
          { id: "m_w3_1", text: "Striver Step 4: Binary Search on 1D/2D arrays and BS on Search Space (Book Allocation, Aggressive Cows)", track: "DSA" },
          { id: "m_w3_2", text: "Implement Spring Security SecurityFilterChain with custom OncePerRequestFilter for JWT", track: "BACKEND" },
          { id: "m_w3_3", text: "Node.js bcrypt password hashing + JWT sign/verify + access/refresh token rotation", track: "BACKEND" },
          { id: "m_w3_4", text: "Merge branch phase/01-foundations into main", track: "BACKEND" }
        ],
        leetcodeProblems: [
          { id: "lc_704", number: 704, title: "Binary Search", difficulty: "EASY", url: "https://leetcode.com/problems/binary-search/", dsaId: "p4_1_1" },
          { id: "lc_33", number: 33, title: "Search in Rotated Sorted Array", difficulty: "MEDIUM", url: "https://leetcode.com/problems/search-in-rotated-sorted-array/", dsaId: "p4_1_5" },
          { id: "lc_875", number: 875, title: "Koko Eating Bananas", difficulty: "MEDIUM", url: "https://leetcode.com/problems/koko-eating-bananas/", dsaId: "p4_2_2" },
          { id: "lc_1011", number: 1011, title: "Capacity To Ship Packages Within D Days", difficulty: "MEDIUM", url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", dsaId: "p4_2_5" },
          { id: "lc_74", number: 74, title: "Search a 2D Matrix", difficulty: "MEDIUM", url: "https://leetcode.com/problems/search-a-2d-matrix/", dsaId: "p4_3_1" },
          { id: "lc_4", number: 4, title: "Median of Two Sorted Arrays", difficulty: "HARD", url: "https://leetcode.com/problems/median-of-two-sorted-arrays/", dsaId: "p4_2_9" }
        ]
      }
    ]
  },
  {
    phaseId: 2,
    phaseNumber: "Phase 02",
    phaseTitle: "Core Data Structures & Advanced Backend Patterns",
    phaseSubtitle: "Weeks 4-6 • Linked Lists, Stacks, Queues, Sliding Window & Production JPA",
    branchName: "phase/02-core-structures",
    weeks: [
      {
        weekNumber: 4,
        title: "Week 04: Linked Lists Mastery & Monotonic Stacks",
        goal: "Master pointer manipulation, Tortoise-Hare algorithm, Next Greater Element, and Histogram problems.",
        tracks: ["DSA", "BACKEND"],
        milestones: [
          { id: "m_w4_1", text: "Striver Step 6: Linked List Medium & Hard (Reversal, Loop detection, Flattening)", track: "DSA" },
          { id: "m_w4_2", text: "Striver Step 9: Monotonic Stacks (NGE I & II, Trapping Rain Water, Largest Rectangle in Histogram)", track: "DSA" },
          { id: "m_w4_3", text: "Spring Boot Transaction Management (@Transactional isolation levels & propagation)", track: "BACKEND" },
          { id: "m_w4_4", text: "Build custom LRU Cache in Java & TypeScript", track: "DSA" }
        ],
        leetcodeProblems: [
          { id: "lc_206", number: 206, title: "Reverse Linked List", difficulty: "EASY", url: "https://leetcode.com/problems/reverse-linked-list/", dsaId: "p6_2_2" },
          { id: "lc_141", number: 141, title: "Linked List Cycle (Floyd Tortoise-Hare)", difficulty: "EASY", url: "https://leetcode.com/problems/linked-list-cycle/", dsaId: "p6_2_3" },
          { id: "lc_25", number: 25, title: "Reverse Nodes in k-Group", difficulty: "HARD", url: "https://leetcode.com/problems/reverse-nodes-in-k-group/", dsaId: "p6_3_1" },
          { id: "lc_503", number: 503, title: "Next Greater Element II", difficulty: "MEDIUM", url: "https://leetcode.com/problems/next-greater-element-ii/", dsaId: "p9_2_1" },
          { id: "lc_42", number: 42, title: "Trapping Rain Water", difficulty: "HARD", url: "https://leetcode.com/problems/trapping-rain-water/", dsaId: "p9_2_2" },
          { id: "lc_84", number: 84, title: "Largest Rectangle in Histogram", difficulty: "HARD", url: "https://leetcode.com/problems/largest-rectangle-in-histogram/", dsaId: "p9_2_5" },
          { id: "lc_146", number: 146, title: "LRU Cache", difficulty: "HARD", url: "https://leetcode.com/problems/lru-cache/", dsaId: "p9_2_9" }
        ]
      },
      {
        weekNumber: 5,
        title: "Week 05: Sliding Window & Two Pointers + REST API Optimization",
        goal: "Solve variable & fixed size sliding window problems, implement pagination, sorting, and DTO validation.",
        tracks: ["DSA", "BACKEND"],
        milestones: [
          { id: "m_w5_1", text: "Striver Step 10: Sliding Window & Two Pointer (Longest Substring Without Repeating, Minimum Window Substring)", track: "DSA" },
          { id: "m_w5_2", text: "Spring Validation (@Valid, @NotNull, custom annotations) + Global Exception Handling (@ControllerAdvice)", track: "BACKEND" },
          { id: "m_w5_3", text: "Database indexing benchmarks and N+1 query troubleshooting (fetch joins, @EntityGraph)", track: "BACKEND" },
          { id: "m_w5_4", text: "Maintain 100% daily commit streak", track: "DSA" }
        ],
        leetcodeProblems: [
          { id: "lc_3", number: 3, title: "Longest Substring Without Repeating Characters", difficulty: "MEDIUM", url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", dsaId: "p10_1_1" },
          { id: "lc_1004", number: 1004, title: "Max Consecutive Ones III", difficulty: "MEDIUM", url: "https://leetcode.com/problems/max-consecutive-ones-iii/", dsaId: "p10_1_2" },
          { id: "lc_424", number: 424, title: "Longest Repeating Character Replacement", difficulty: "MEDIUM", url: "https://leetcode.com/problems/longest-repeating-character-replacement/", dsaId: "p10_1_4" },
          { id: "lc_76", number: 76, title: "Minimum Window Substring", difficulty: "HARD", url: "https://leetcode.com/problems/minimum-window-substring/", dsaId: "p10_1_9" }
        ]
      },
      {
        weekNumber: 6,
        title: "Week 06: Heaps / Priority Queues & Caching Architecture (Redis)",
        goal: "Master top-K patterns and integrate Redis distributed caching for read-heavy API paths.",
        tracks: ["DSA", "BACKEND", "SYSTEM_DESIGN"],
        milestones: [
          { id: "m_w6_1", text: "Striver Step 11: Heaps (Top K Frequent, Task Scheduler, Find Median from Data Stream)", track: "DSA" },
          { id: "m_w6_2", text: "Spring Boot Spring Cache + Redis integration (@Cacheable, cache eviction, TTLs)", track: "BACKEND" },
          { id: "m_w6_3", text: "System Design: Cache-Aside vs Write-Through vs Write-Back, cache stampede mitigation", track: "SYSTEM_DESIGN" },
          { id: "m_w6_4", text: "Merge branch phase/02-core-structures", track: "BACKEND" }
        ],
        leetcodeProblems: [
          { id: "lc_215", number: 215, title: "Kth Largest Element in an Array", difficulty: "MEDIUM", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/", dsaId: "p11_1_2" },
          { id: "lc_23", number: 23, title: "Merge k Sorted Lists", difficulty: "HARD", url: "https://leetcode.com/problems/merge-k-sorted-lists/", dsaId: "p11_1_4" },
          { id: "lc_347", number: 347, title: "Top K Frequent Elements", difficulty: "MEDIUM", url: "https://leetcode.com/problems/top-k-frequent-elements/", dsaId: "p11_1_5" },
          { id: "lc_621", number: 621, title: "Task Scheduler", difficulty: "MEDIUM", url: "https://leetcode.com/problems/task-scheduler/", dsaId: "p11_1_6" },
          { id: "lc_295", number: 295, title: "Find Median from Data Stream", difficulty: "HARD", url: "https://leetcode.com/problems/find-median-from-data-stream/", dsaId: "p11_1_7" }
        ]
      }
    ]
  },
  {
    phaseId: 3,
    phaseNumber: "Phase 03",
    phaseTitle: "Hierarchical Structures & Asynchronous Systems",
    phaseSubtitle: "Weeks 7-9 • Trees, BST, Graphs, Message Queues & Event-Driven Systems",
    branchName: "phase/03-trees-and-events",
    weeks: [
      {
        weekNumber: 7,
        title: "Week 07: Binary Trees & Binary Search Trees (BST)",
        goal: "Conquer Tree traversals (BFS/DFS), Views, LCA, Diameter, BST validation, and Tree construction.",
        tracks: ["DSA", "CS_FUNDAMENTALS"],
        milestones: [
          { id: "m_w7_1", text: "Striver Step 13: Binary Trees (Traversals, Boundary, Vertical Order, LCA, Serialize/Deserialize)", track: "DSA" },
          { id: "m_w7_2", text: "Striver Step 14: BST (Validate BST, Kth smallest, Two sum in BST, LCA in BST)", track: "DSA" },
          { id: "m_w7_3", text: "Operating Systems: Process vs Thread, Memory Management, Virtual Memory, Page Faults", track: "CS_FUNDAMENTALS" },
          { id: "m_w7_4", text: "Solve 20 LeetCode Tree problems", track: "DSA" }
        ],
        leetcodeProblems: [
          { id: "lc_102", number: 102, title: "Binary Tree Level Order Traversal", difficulty: "MEDIUM", url: "https://leetcode.com/problems/binary-tree-level-order-traversal/", dsaId: "p13_1_2" },
          { id: "lc_543", number: 543, title: "Diameter of Binary Tree", difficulty: "EASY", url: "https://leetcode.com/problems/diameter-of-binary-tree/", dsaId: "p13_1_5" },
          { id: "lc_124", number: 124, title: "Binary Tree Maximum Path Sum", difficulty: "HARD", url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", dsaId: "p13_1_6" },
          { id: "lc_236", number: 236, title: "Lowest Common Ancestor of a Binary Tree", difficulty: "MEDIUM", url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", dsaId: "p13_2_5" },
          { id: "lc_98", number: 98, title: "Validate Binary Search Tree", difficulty: "MEDIUM", url: "https://leetcode.com/problems/validate-binary-search-tree/", dsaId: "p14_1_7" }
        ]
      },
      {
        weekNumber: 8,
        title: "Week 08: Graph Algorithms (BFS, DFS, Topo Sort, Shortest Path)",
        goal: "Master graph representations, cycle detection, Topological sort, Dijkstra, and Disjoint Set Union.",
        tracks: ["DSA", "SYSTEM_DESIGN"],
        milestones: [
          { id: "m_w8_1", text: "Striver Step 15: Graph Traversals, Bipartite check, Course Schedule (Kahn's Algo)", track: "DSA" },
          { id: "m_w8_2", text: "Striver Step 15: Shortest Path (Dijkstra, Bellman-Ford, Floyd Warshall) & DSU", track: "DSA" },
          { id: "m_w8_3", text: "Event-Driven Architecture: Kafka vs RabbitMQ message brokers, consumer groups, idempotency", track: "BACKEND" },
          { id: "m_w8_4", text: "Spring Boot Kafka producer & consumer listener implementation", track: "BACKEND" }
        ],
        leetcodeProblems: [
          { id: "lc_200", number: 200, title: "Number of Islands", difficulty: "MEDIUM", url: "https://leetcode.com/problems/number-of-islands/", dsaId: "p15_1_3" },
          { id: "lc_994", number: 994, title: "Rotting Oranges (Multi-source BFS)", difficulty: "MEDIUM", url: "https://leetcode.com/problems/rotting-oranges/", dsaId: "p15_1_4" },
          { id: "lc_207", number: 207, title: "Course Schedule (Topological Sort)", difficulty: "MEDIUM", url: "https://leetcode.com/problems/course-schedule/", dsaId: "p15_2_2" },
          { id: "lc_743", number: 743, title: "Network Delay Time (Dijkstra)", difficulty: "MEDIUM", url: "https://leetcode.com/problems/network-delay-time/", dsaId: "p15_3_5" },
          { id: "lc_684", number: 684, title: "Redundant Connection (DSU)", difficulty: "MEDIUM", url: "https://leetcode.com/problems/redundant-connection/", dsaId: "p15_4_1" }
        ]
      },
      {
        weekNumber: 9,
        title: "Week 09: Dynamic Programming (1D, 2D, Grids & Subsequences)",
        goal: "Transition from recursion to memoization and space-optimized tabulation for classic DP problems.",
        tracks: ["DSA", "BACKEND"],
        milestones: [
          { id: "m_w9_1", text: "Striver Step 16: 1D DP (Frog Jump, House Robber) & 2D Grid DP (Unique Paths, Ninja's Training)", track: "DSA" },
          { id: "m_w9_2", text: "Striver Step 16: DP on Subsequences (0/1 Knapsack, Coin Change, Target Sum)", track: "DSA" },
          { id: "m_w9_3", text: "Spring Boot Actuator, Prometheus metrics, and Micrometer APM observability", track: "BACKEND" },
          { id: "m_w9_4", text: "Merge branch phase/03-trees-and-events", track: "BACKEND" }
        ],
        leetcodeProblems: [
          { id: "lc_70", number: 70, title: "Climbing Stairs", difficulty: "EASY", url: "https://leetcode.com/problems/climbing-stairs/", dsaId: "p16_1_1" },
          { id: "lc_198", number: 198, title: "House Robber", difficulty: "MEDIUM", url: "https://leetcode.com/problems/house-robber/", dsaId: "p16_1_3" },
          { id: "lc_62", number: 62, title: "Unique Paths", difficulty: "MEDIUM", url: "https://leetcode.com/problems/unique-paths/", dsaId: "p16_2_2" },
          { id: "lc_64", number: 64, title: "Minimum Path Sum", difficulty: "MEDIUM", url: "https://leetcode.com/problems/minimum-path-sum/", dsaId: "p16_2_3" },
          { id: "lc_322", number: 322, title: "Coin Change", difficulty: "MEDIUM", url: "https://leetcode.com/problems/coin-change/", dsaId: "p16_3_4" },
          { id: "lc_416", number: 416, title: "Partition Equal Subset Sum", difficulty: "MEDIUM", url: "https://leetcode.com/problems/partition-equal-subset-sum/", dsaId: "p16_3_2" }
        ]
      }
    ]
  },
  {
    phaseId: 4,
    phaseNumber: "Phase 04",
    phaseTitle: "Advanced DP, High-Level & Low-Level System Design",
    phaseSubtitle: "Weeks 10-11 • Hard DP (Strings, Stocks, MCM) & Production Scale System Design",
    branchName: "phase/04-system-design",
    weeks: [
      {
        weekNumber: 10,
        title: "Week 10: Advanced DP (Strings, Stocks, LIS, MCM) & LLD Object Design",
        goal: "Master LCS, Edit Distance, LIS, Matrix Chain Multiplication, and Low-Level Design (SOLID, GoF Patterns).",
        tracks: ["DSA", "SYSTEM_DESIGN"],
        milestones: [
          { id: "m_w10_1", text: "Striver Step 16: DP on Strings (LCS, Longest Palindromic Subsequence, Edit Distance)", track: "DSA" },
          { id: "m_w10_2", text: "Striver Step 16: DP on Stocks, LIS (Binary Search O(N log N)), MCM & Partition DP", track: "DSA" },
          { id: "m_w10_3", text: "LLD: Parking Lot, Rate Limiter (Token Bucket / Leaky Bucket), Notification Service in Java", track: "SYSTEM_DESIGN" },
          { id: "m_w10_4", text: "Computer Networks: TCP 3-way handshake, TLS 1.3, HTTP/2 vs HTTP/3, WebSockets", track: "CS_FUNDAMENTALS" }
        ],
        leetcodeProblems: [
          { id: "lc_1143", number: 1143, title: "Longest Common Subsequence", difficulty: "MEDIUM", url: "https://leetcode.com/problems/longest-common-subsequence/", dsaId: "p16_4_1" },
          { id: "lc_72", number: 72, title: "Edit Distance", difficulty: "HARD", url: "https://leetcode.com/problems/edit-distance/", dsaId: "p16_4_6" },
          { id: "lc_300", number: 300, title: "Longest Increasing Subsequence", difficulty: "MEDIUM", url: "https://leetcode.com/problems/longest-increasing-subsequence/", dsaId: "p16_5_2" },
          { id: "lc_312", number: 312, title: "Burst Balloons", difficulty: "HARD", url: "https://leetcode.com/problems/burst-balloons/", dsaId: "p16_6_3" }
        ]
      },
      {
        weekNumber: 11,
        title: "Week 11: High-Level System Design (HLD) at Scale",
        goal: "Design high-availability distributed systems: Rate Limiter, URL Shortener, Chat System, Video Streaming.",
        tracks: ["SYSTEM_DESIGN", "BACKEND"],
        milestones: [
          { id: "m_w11_1", text: "HLD 1: Distributed Rate Limiter & URL Shortener (TinyURL) with Consistent Hashing", track: "SYSTEM_DESIGN" },
          { id: "m_w11_2", text: "HLD 2: Real-time Chat App (WebSocket gateway, message ordering, fan-out on write)", track: "SYSTEM_DESIGN" },
          { id: "m_w11_3", text: "Database Sharding, Replication (Master-Slave), CAP Theorem, PACELC tradeoffs", track: "SYSTEM_DESIGN" },
          { id: "m_w11_4", text: "Dockerize Spring Boot + Node.js + Postgres microservices with docker-compose", track: "BACKEND" }
        ],
        leetcodeProblems: [
          { id: "lc_535", number: 535, title: "Encode and Decode TinyURL", difficulty: "MEDIUM", url: "https://leetcode.com/problems/encode-and-decode-tinyurl/" },
          { id: "lc_359", number: 359, title: "Logger Rate Limiter", difficulty: "EASY", url: "https://leetcode.com/problems/logger-rate-limiter/" }
        ]
      }
    ]
  },
  {
    phaseId: 5,
    phaseNumber: "Phase 05",
    phaseTitle: "Production Deployment, Mock Interviews & Mastery",
    phaseSubtitle: "Weeks 12-13 • Cloud Deployments, Hard DSA Sprints & Portfolio Merge",
    branchName: "phase/05-production-mastery",
    weeks: [
      {
        weekNumber: 12,
        title: "Week 12: Cloud Deployments (Render / Railway / Neon), CI/CD & Security Hardening",
        goal: "Deploy production applications to free cloud hosting tiers, configure GitHub Actions CI/CD pipelines.",
        tracks: ["BACKEND", "CS_FUNDAMENTALS"],
        milestones: [
          { id: "m_w12_1", text: "Deploy Spring Boot & Node.js backend to Render / Railway free tier", track: "BACKEND" },
          { id: "m_w12_2", text: "Deploy React frontend to Vercel / Netlify with custom domain & HTTPS", track: "BACKEND" },
          { id: "m_w12_3", text: "Setup GitHub Actions CI pipeline: automated unit tests, linting, Docker build", track: "CS_FUNDAMENTALS" },
          { id: "m_w12_4", text: "Solve 10 LeetCode Hard problems across DP & Graphs", track: "DSA" }
        ],
        leetcodeProblems: [
          { id: "lc_127", number: 127, title: "Word Ladder", difficulty: "HARD", url: "https://leetcode.com/problems/word-ladder/", dsaId: "p15_1_10" },
          { id: "lc_135", number: 135, title: "Candy", difficulty: "HARD", url: "https://leetcode.com/problems/candy/", dsaId: "p12_1_9" }
        ]
      },
      {
        weekNumber: 13,
        title: "Week 13: Final Sprint, Mock Technical Interviews & Master Merge",
        goal: "Complete Striver A2Z revision flags, conduct timed mock coding interviews, and finalize developer README portfolio.",
        tracks: ["DSA", "SYSTEM_DESIGN", "BACKEND"],
        milestones: [
          { id: "m_w13_1", text: "Revise all Flagged DSA problems across Striver A2Z sheet", track: "DSA" },
          { id: "m_w13_2", text: "Run 3 timed mock interview sessions (1 DSA + 1 System Design + 1 Backend Deep Dive)", track: "SYSTEM_DESIGN" },
          { id: "m_w13_3", text: "Generate final commit:// README.md stats badge and publish portfolio", track: "BACKEND" },
          { id: "m_w13_4", text: "Git merge all phase branches into main: 90-Day Sprint Complete!", track: "BACKEND" }
        ],
        leetcodeProblems: [
          { id: "lc_297", number: 297, title: "Serialize and Deserialize Binary Tree", difficulty: "HARD", url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", dsaId: "p13_2_7" },
          { id: "lc_76_rev", number: 76, title: "Minimum Window Substring", difficulty: "HARD", url: "https://leetcode.com/problems/minimum-window-substring/", dsaId: "p10_1_9" }
        ]
      }
    ]
  }
];
