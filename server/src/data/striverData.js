// Striver's A2Z DSA Sheet - Structured Problem Dataset (Steps 1 to 16)
// Open-source curriculum mapping: Step -> Sub-topic -> Problem with links and difficulty

export const STRIVER_STEPS = [
  {
    stepId: 1,
    stepTitle: "Step 1: Learn the Basics",
    description: "Core programming constructs, time/space complexity, math basics, and basic recursion.",
    topics: [
      {
        topicId: "1.1",
        topicTitle: "Things to Know in C++/Java/Python/JS",
        problems: [
          { id: "p1_1_1", title: "User Input / Output & Data Types", difficulty: "EASY", link: "https://takeuforward.org/c/c-basics-user-input-and-output/", platform: "TakeUForward" },
          { id: "p1_1_2", title: "If-Else & Switch Statements", difficulty: "EASY", link: "https://takeuforward.org/c/if-else-statements/", platform: "TakeUForward" },
          { id: "p1_1_3", title: "Loops (for, while, do-while)", difficulty: "EASY", link: "https://takeuforward.org/c/for-loops-in-c/", platform: "TakeUForward" },
          { id: "p1_1_4", title: "Functions (Pass by Reference & Value)", difficulty: "EASY", link: "https://takeuforward.org/c/functions-in-c/", platform: "TakeUForward" },
          { id: "p1_1_5", title: "Time and Space Complexity Analysis", difficulty: "EASY", link: "https://takeuforward.org/data-structure/time-and-space-complexity/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "1.2",
        topicTitle: "Build-up Logical Thinking (Pattern Problems)",
        problems: [
          { id: "p1_2_1", title: "Rectangular Star Pattern", difficulty: "EASY", link: "https://takeuforward.org/patterns/pattern-1-rectangular-star-pattern/", platform: "TakeUForward" },
          { id: "p1_2_2", title: "Right-Angled Triangle Pattern", difficulty: "EASY", link: "https://takeuforward.org/patterns/pattern-2-right-angled-triangle-pattern/", platform: "TakeUForward" },
          { id: "p1_2_3", title: "Inverted Star Pyramid", difficulty: "EASY", link: "https://takeuforward.org/patterns/pattern-8-inverted-star-pyramid/", platform: "TakeUForward" },
          { id: "p1_2_4", title: "Diamond Star Pattern", difficulty: "MEDIUM", link: "https://takeuforward.org/patterns/pattern-9-diamond-star-pattern/", platform: "TakeUForward" },
          { id: "p1_2_5", title: "Number Crown Pattern", difficulty: "MEDIUM", link: "https://takeuforward.org/patterns/pattern-12-number-crown-pattern/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "1.3",
        topicTitle: "Basic Maths for DSA",
        problems: [
          { id: "p1_3_1", title: "Count Digits in a Number", difficulty: "EASY", link: "https://leetcode.com/problems/count-integers-with-even-digit-sum/", platform: "LeetCode" },
          { id: "p1_3_2", title: "Reverse a Number", difficulty: "EASY", link: "https://leetcode.com/problems/reverse-integer/", platform: "LeetCode" },
          { id: "p1_3_3", title: "Check Palindrome Number", difficulty: "EASY", link: "https://leetcode.com/problems/palindrome-number/", platform: "LeetCode" },
          { id: "p1_3_4", title: "GCD or HCF (Euclidean Algorithm)", difficulty: "EASY", link: "https://takeuforward.org/data-structure/find-gcd-of-two-numbers/", platform: "TakeUForward" },
          { id: "p1_3_5", title: "Armstrong Numbers", difficulty: "EASY", link: "https://takeuforward.org/maths/check-if-a-number-is-armstrong-number-or-not/", platform: "TakeUForward" },
          { id: "p1_3_6", title: "Print all Divisors of a given Number", difficulty: "EASY", link: "https://takeuforward.org/data-structure/print-all-divisors-of-a-given-number/", platform: "TakeUForward" },
          { id: "p1_3_7", title: "Check for Prime (Square Root Approach)", difficulty: "EASY", link: "https://takeuforward.org/data-structure/check-if-a-number-is-prime-or-not/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "1.4",
        topicTitle: "Basic Recursion",
        problems: [
          { id: "p1_4_1", title: "Print 1 to N using Recursion", difficulty: "EASY", link: "https://takeuforward.org/recursion/print-1-to-n-using-recursion/", platform: "TakeUForward" },
          { id: "p1_4_2", title: "Sum of first N natural numbers", difficulty: "EASY", link: "https://takeuforward.org/data-structure/sum-of-first-n-natural-numbers/", platform: "TakeUForward" },
          { id: "p1_4_3", title: "Factorial of a Number", difficulty: "EASY", link: "https://takeuforward.org/data-structure/factorial-of-a-number-iterative-and-recursive/", platform: "TakeUForward" },
          { id: "p1_4_4", title: "Reverse an Array using Recursion", difficulty: "EASY", link: "https://takeuforward.org/data-structure/reverse-a-given-array/", platform: "TakeUForward" },
          { id: "p1_4_5", title: "Check if a String is Palindrome (Recursive)", difficulty: "EASY", link: "https://leetcode.com/problems/valid-palindrome/", platform: "LeetCode" },
          { id: "p1_4_6", title: "Fibonacci Number (Recursion Tree)", difficulty: "EASY", link: "https://leetcode.com/problems/fibonacci-number/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "1.5",
        topicTitle: "Basic Hashing",
        problems: [
          { id: "p1_5_1", title: "Count Frequency of each element in Array", difficulty: "EASY", link: "https://takeuforward.org/data-structure/count-frequency-of-each-element-in-the-array/", platform: "TakeUForward" },
          { id: "p1_5_2", title: "Find the Highest/Lowest Frequency Element", difficulty: "EASY", link: "https://takeuforward.org/arrays/find-the-highest-lowest-frequency-element/", platform: "TakeUForward" }
        ]
      }
    ]
  },
  {
    stepId: 2,
    stepTitle: "Step 2: Learn Important Sorting Techniques",
    description: "Fundamental and divide-and-conquer sorting algorithms.",
    topics: [
      {
        topicId: "2.1",
        topicTitle: "Sorting-I (Elementary Sorts)",
        problems: [
          { id: "p2_1_1", title: "Selection Sort Algorithm", difficulty: "EASY", link: "https://takeuforward.org/sorting/selection-sort-algorithm/", platform: "TakeUForward" },
          { id: "p2_1_2", title: "Bubble Sort Algorithm", difficulty: "EASY", link: "https://takeuforward.org/data-structure/bubble-sort-algorithm/", platform: "TakeUForward" },
          { id: "p2_1_3", title: "Insertion Sort Algorithm", difficulty: "EASY", link: "https://takeuforward.org/data-structure/insertion-sort-algorithm/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "2.2",
        topicTitle: "Sorting-II (Divide & Conquer)",
        problems: [
          { id: "p2_2_1", title: "Merge Sort Algorithm", difficulty: "MEDIUM", link: "https://leetcode.com/problems/sort-an-array/", platform: "LeetCode" },
          { id: "p2_2_2", title: "Quick Sort Algorithm", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/quick-sort-algorithm/", platform: "TakeUForward" }
        ]
      }
    ]
  },
  {
    stepId: 3,
    stepTitle: "Step 3: Solve Problems on Arrays",
    description: "Easy, Medium, and Hard array problems (Kadane's, Dutch National Flag, Moore's Voting, 2-Pointers).",
    topics: [
      {
        topicId: "3.1",
        topicTitle: "Arrays (Easy)",
        problems: [
          { id: "p3_1_1", title: "Largest Element in an Array", difficulty: "EASY", link: "https://takeuforward.org/data-structure/find-the-largest-element-in-an-array/", platform: "TakeUForward" },
          { id: "p3_1_2", title: "Second Largest Element without Sorting", difficulty: "EASY", link: "https://takeuforward.org/data-structure/find-second-smallest-and-second-largest-element-in-an-array/", platform: "TakeUForward" },
          { id: "p3_1_3", title: "Check if Array is Sorted and Rotated", difficulty: "EASY", link: "https://leetcode.com/problems/check-if-array-is-sorted-and-rotated/", platform: "LeetCode" },
          { id: "p3_1_4", title: "Remove Duplicates from Sorted Array", difficulty: "EASY", link: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/", platform: "LeetCode" },
          { id: "p3_1_5", title: "Rotate Array by K Places", difficulty: "MEDIUM", link: "https://leetcode.com/problems/rotate-array/", platform: "LeetCode" },
          { id: "p3_1_6", title: "Move Zeroes to End", difficulty: "EASY", link: "https://leetcode.com/problems/move-zeroes/", platform: "LeetCode" },
          { id: "p3_1_7", title: "Linear Search", difficulty: "EASY", link: "https://takeuforward.org/data-structure/linear-search-in-c/", platform: "TakeUForward" },
          { id: "p3_1_8", title: "Union of Two Sorted Arrays", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/union-of-two-sorted-arrays/", platform: "TakeUForward" },
          { id: "p3_1_9", title: "Find Missing Number in Array", difficulty: "EASY", link: "https://leetcode.com/problems/missing-number/", platform: "LeetCode" },
          { id: "p3_1_10", title: "Max Consecutive Ones", difficulty: "EASY", link: "https://leetcode.com/problems/max-consecutive-ones/", platform: "LeetCode" },
          { id: "p3_1_11", title: "Single Number (XOR Trick)", difficulty: "EASY", link: "https://leetcode.com/problems/single-number/", platform: "LeetCode" },
          { id: "p3_1_12", title: "Longest Subarray with given Sum K (Positives)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/longest-subarray-with-given-sum-k/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "3.2",
        topicTitle: "Arrays (Medium)",
        problems: [
          { id: "p3_2_1", title: "Two Sum Problem", difficulty: "EASY", link: "https://leetcode.com/problems/two-sum/", platform: "LeetCode" },
          { id: "p3_2_2", title: "Sort Colors (0s, 1s, and 2s - DNF Algo)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/sort-colors/", platform: "LeetCode" },
          { id: "p3_2_3", title: "Majority Element (> n/2 times - Moore's Voting)", difficulty: "EASY", link: "https://leetcode.com/problems/majority-element/", platform: "LeetCode" },
          { id: "p3_2_4", title: "Maximum Subarray Sum (Kadane's Algorithm)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/maximum-subarray/", platform: "LeetCode" },
          { id: "p3_2_5", title: "Best Time to Buy and Sell Stock", difficulty: "EASY", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/", platform: "LeetCode" },
          { id: "p3_2_6", title: "Rearrange Array Elements by Sign", difficulty: "MEDIUM", link: "https://leetcode.com/problems/rearrange-array-elements-by-sign/", platform: "LeetCode" },
          { id: "p3_2_7", title: "Next Permutation", difficulty: "MEDIUM", link: "https://leetcode.com/problems/next-permutation/", platform: "LeetCode" },
          { id: "p3_2_8", title: "Leaders in an Array Problem", difficulty: "EASY", link: "https://takeuforward.org/data-structure/leaders-in-an-array/", platform: "TakeUForward" },
          { id: "p3_2_9", title: "Longest Consecutive Sequence in an Array", difficulty: "MEDIUM", link: "https://leetcode.com/problems/longest-consecutive-sequence/", platform: "LeetCode" },
          { id: "p3_2_10", title: "Set Matrix Zeroes", difficulty: "MEDIUM", link: "https://leetcode.com/problems/set-matrix-zeroes/", platform: "LeetCode" },
          { id: "p3_2_11", title: "Rotate Matrix by 90 Degrees", difficulty: "MEDIUM", link: "https://leetcode.com/problems/rotate-image/", platform: "LeetCode" },
          { id: "p3_2_12", title: "Spiral Matrix Traversal", difficulty: "MEDIUM", link: "https://leetcode.com/problems/spiral-matrix/", platform: "LeetCode" },
          { id: "p3_2_13", title: "Subarray Sum Equals K (Prefix Sum + Hashmap)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/subarray-sum-equals-k/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "3.3",
        topicTitle: "Arrays (Hard)",
        problems: [
          { id: "p3_3_1", title: "Pascal's Triangle", difficulty: "MEDIUM", link: "https://leetcode.com/problems/pascals-triangle/", platform: "LeetCode" },
          { id: "p3_3_2", title: "Majority Element II (> n/3 times)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/majority-element-ii/", platform: "LeetCode" },
          { id: "p3_3_3", title: "3 Sum Problem", difficulty: "MEDIUM", link: "https://leetcode.com/problems/3sum/", platform: "LeetCode" },
          { id: "p3_3_4", title: "4 Sum Problem", difficulty: "MEDIUM", link: "https://leetcode.com/problems/4sum/", platform: "LeetCode" },
          { id: "p3_3_5", title: "Largest Subarray with 0 Sum", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/length-of-the-longest-subarray-with-zero-sum/", platform: "TakeUForward" },
          { id: "p3_3_6", title: "Count Number of Subarrays with given XOR K", difficulty: "HARD", link: "https://takeuforward.org/data-structure/count-the-number-of-subarrays-with-given-xor-k/", platform: "TakeUForward" },
          { id: "p3_3_7", title: "Merge Overlapping Subintervals", difficulty: "MEDIUM", link: "https://leetcode.com/problems/merge-intervals/", platform: "LeetCode" },
          { id: "p3_3_8", title: "Merge Two Sorted Arrays Without Extra Space", difficulty: "HARD", link: "https://leetcode.com/problems/merge-sorted-array/", platform: "LeetCode" },
          { id: "p3_3_9", title: "Find the Repeating and Missing Number", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/find-the-repeating-and-missing-number/", platform: "TakeUForward" },
          { id: "p3_3_10", title: "Count Inversions in an Array", difficulty: "HARD", link: "https://takeuforward.org/data-structure/count-inversions-in-an-array/", platform: "TakeUForward" },
          { id: "p3_3_11", title: "Reverse Pairs", difficulty: "HARD", link: "https://leetcode.com/problems/reverse-pairs/", platform: "LeetCode" },
          { id: "p3_3_12", title: "Maximum Product Subarray", difficulty: "MEDIUM", link: "https://leetcode.com/problems/maximum-product-subarray/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 4,
    stepTitle: "Step 4: Binary Search",
    description: "1D arrays, Search space / Answers, 2D Arrays.",
    topics: [
      {
        topicId: "4.1",
        topicTitle: "BS on 1D Arrays",
        problems: [
          { id: "p4_1_1", title: "Binary Search to find X in sorted array", difficulty: "EASY", link: "https://leetcode.com/problems/binary-search/", platform: "LeetCode" },
          { id: "p4_1_2", title: "Implement Lower Bound and Upper Bound", difficulty: "EASY", link: "https://takeuforward.org/arrays/implement-lower-bound-bs-2/", platform: "TakeUForward" },
          { id: "p4_1_3", title: "Search Insert Position", difficulty: "EASY", link: "https://leetcode.com/problems/search-insert-position/", platform: "LeetCode" },
          { id: "p4_1_4", title: "First and Last Position of Element in Sorted Array", difficulty: "MEDIUM", link: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/", platform: "LeetCode" },
          { id: "p4_1_5", title: "Search in Rotated Sorted Array I", difficulty: "MEDIUM", link: "https://leetcode.com/problems/search-in-rotated-sorted-array/", platform: "LeetCode" },
          { id: "p4_1_6", title: "Search in Rotated Sorted Array II (Duplicates)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/", platform: "LeetCode" },
          { id: "p4_1_7", title: "Find Minimum in Rotated Sorted Array", difficulty: "MEDIUM", link: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/", platform: "LeetCode" },
          { id: "p4_1_8", title: "Single Element in a Sorted Array", difficulty: "MEDIUM", link: "https://leetcode.com/problems/single-element-in-a-sorted-array/", platform: "LeetCode" },
          { id: "p4_1_9", title: "Find Peak Element", difficulty: "MEDIUM", link: "https://leetcode.com/problems/find-peak-element/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "4.2",
        topicTitle: "BS on Answers",
        problems: [
          { id: "p4_2_1", title: "Find square root of a number in O(log N)", difficulty: "EASY", link: "https://leetcode.com/problems/sqrtx/", platform: "LeetCode" },
          { id: "p4_2_2", title: "Koko Eating Bananas", difficulty: "MEDIUM", link: "https://leetcode.com/problems/koko-eating-bananas/", platform: "LeetCode" },
          { id: "p4_2_3", title: "Minimum days to make M bouquets", difficulty: "MEDIUM", link: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/", platform: "LeetCode" },
          { id: "p4_2_4", title: "Find the Smallest Divisor given a Threshold", difficulty: "MEDIUM", link: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/", platform: "LeetCode" },
          { id: "p4_2_5", title: "Capacity to Ship Packages within D Days", difficulty: "MEDIUM", link: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/", platform: "LeetCode" },
          { id: "p4_2_6", title: "Aggressive Cows (Spoj / GFG)", difficulty: "HARD", link: "https://takeuforward.org/data-structure/aggressive-cows-detailed-solution/", platform: "TakeUForward" },
          { id: "p4_2_7", title: "Book Allocation Problem", difficulty: "HARD", link: "https://takeuforward.org/data-structure/allocate-minimum-number-of-pages/", platform: "TakeUForward" },
          { id: "p4_2_8", title: "Split Array Largest Sum", difficulty: "HARD", link: "https://leetcode.com/problems/split-array-largest-sum/", platform: "LeetCode" },
          { id: "p4_2_9", title: "Median of Two Sorted Arrays", difficulty: "HARD", link: "https://leetcode.com/problems/median-of-two-sorted-arrays/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "4.3",
        topicTitle: "BS on 2D Arrays",
        problems: [
          { id: "p4_3_1", title: "Search in a 2D Matrix I", difficulty: "MEDIUM", link: "https://leetcode.com/problems/search-a-2d-matrix/", platform: "LeetCode" },
          { id: "p4_3_2", title: "Search in a Row and Column Wise Sorted Matrix", difficulty: "MEDIUM", link: "https://leetcode.com/problems/search-a-2d-matrix-ii/", platform: "LeetCode" },
          { id: "p4_3_3", title: "Find Peak Element in 2D Matrix", difficulty: "HARD", link: "https://leetcode.com/problems/find-a-peak-element-ii/", platform: "LeetCode" },
          { id: "p4_3_4", title: "Matrix Median in Row-Wise Sorted Matrix", difficulty: "HARD", link: "https://takeuforward.org/data-structure/median-of-row-wise-sorted-matrix/", platform: "TakeUForward" }
        ]
      }
    ]
  },
  {
    stepId: 5,
    stepTitle: "Step 5: Strings (Basic & Medium)",
    description: "String matching, anagrams, roman numerals, LPS, and KMP algorithm basics.",
    topics: [
      {
        topicId: "5.1",
        topicTitle: "Basic and Easy String Problems",
        problems: [
          { id: "p5_1_1", title: "Remove Outermost Parentheses", difficulty: "EASY", link: "https://leetcode.com/problems/remove-outermost-parentheses/", platform: "LeetCode" },
          { id: "p5_1_2", title: "Reverse Words in a String", difficulty: "MEDIUM", link: "https://leetcode.com/problems/reverse-words-in-a-string/", platform: "LeetCode" },
          { id: "p5_1_3", title: "Largest Odd Number in String", difficulty: "EASY", link: "https://leetcode.com/problems/largest-odd-number-in-string/", platform: "LeetCode" },
          { id: "p5_1_4", title: "Longest Common Prefix", difficulty: "EASY", link: "https://leetcode.com/problems/longest-common-prefix/", platform: "LeetCode" },
          { id: "p5_1_5", title: "Isomorphic Strings", difficulty: "EASY", link: "https://leetcode.com/problems/isomorphic-strings/", platform: "LeetCode" },
          { id: "p5_1_6", title: "Rotate String (Check if A is rotation of B)", difficulty: "EASY", link: "https://leetcode.com/problems/rotate-string/", platform: "LeetCode" },
          { id: "p5_1_7", title: "Valid Anagram", difficulty: "EASY", link: "https://leetcode.com/problems/valid-anagram/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "5.2",
        topicTitle: "Medium String Problems",
        problems: [
          { id: "p5_2_1", title: "Sort Characters By Frequency", difficulty: "MEDIUM", link: "https://leetcode.com/problems/sort-characters-by-frequency/", platform: "LeetCode" },
          { id: "p5_2_2", title: "Maximum Nesting Depth of Parentheses", difficulty: "EASY", link: "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/", platform: "LeetCode" },
          { id: "p5_2_3", title: "Roman to Integer & Integer to Roman", difficulty: "MEDIUM", link: "https://leetcode.com/problems/roman-to-integer/", platform: "LeetCode" },
          { id: "p5_2_4", title: "Implement Atoi (String to Integer)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/string-to-integer-atoi/", platform: "LeetCode" },
          { id: "p5_2_5", title: "Longest Palindromic Substring", difficulty: "MEDIUM", link: "https://leetcode.com/problems/longest-palindromic-substring/", platform: "LeetCode" },
          { id: "p5_2_6", title: "Sum of Beauty of All Substrings", difficulty: "MEDIUM", link: "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 6,
    stepTitle: "Step 6: Learn LinkedList (Single, Double, Medium & Hard)",
    description: "Pointers manipulation, cycle detection, tortoise & hare, reversing, merging, flattening.",
    topics: [
      {
        topicId: "6.1",
        topicTitle: "1D LinkedList Basics & Traversal",
        problems: [
          { id: "p6_1_1", title: "Introduction to LinkedList & Node Creation", difficulty: "EASY", link: "https://takeuforward.org/linked-list/introduction-to-linked-list/", platform: "TakeUForward" },
          { id: "p6_1_2", title: "Insert Node at Beginning, End, Pos", difficulty: "EASY", link: "https://takeuforward.org/linked-list/insert-node-at-beginning-of-linked-list/", platform: "TakeUForward" },
          { id: "p6_1_3", title: "Delete Node in a Linked List", difficulty: "MEDIUM", link: "https://leetcode.com/problems/delete-node-in-a-linked-list/", platform: "LeetCode" },
          { id: "p6_1_4", title: "Find Length of Linked List", difficulty: "EASY", link: "https://takeuforward.org/linked-list/find-the-length-of-a-linked-list/", platform: "TakeUForward" },
          { id: "p6_1_5", title: "Search an Element in Linked List", difficulty: "EASY", link: "https://takeuforward.org/linked-list/search-an-element-in-a-linked-list/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "6.2",
        topicTitle: "Medium Problems of LL",
        problems: [
          { id: "p6_2_1", title: "Middle of the Linked List (Tortoise-Hare)", difficulty: "EASY", link: "https://leetcode.com/problems/middle-of-the-linked-list/", platform: "LeetCode" },
          { id: "p6_2_2", title: "Reverse a Linked List (Iterative & Recursive)", difficulty: "EASY", link: "https://leetcode.com/problems/reverse-linked-list/", platform: "LeetCode" },
          { id: "p6_2_3", title: "Detect a Loop in Linked List", difficulty: "EASY", link: "https://leetcode.com/problems/linked-list-cycle/", platform: "LeetCode" },
          { id: "p6_2_4", title: "Find the Starting Point of Loop in LL", difficulty: "MEDIUM", link: "https://leetcode.com/problems/linked-list-cycle-ii/", platform: "LeetCode" },
          { id: "p6_2_5", title: "Check if LL is Palindrome", difficulty: "EASY", link: "https://leetcode.com/problems/palindrome-linked-list/", platform: "LeetCode" },
          { id: "p6_2_6", title: "Segregate Odd and Even Nodes in LL", difficulty: "MEDIUM", link: "https://leetcode.com/problems/odd-even-linked-list/", platform: "LeetCode" },
          { id: "p6_2_7", title: "Remove Nth Node from End of List", difficulty: "MEDIUM", link: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/", platform: "LeetCode" },
          { id: "p6_2_8", title: "Delete the Middle Node of LL", difficulty: "MEDIUM", link: "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/", platform: "LeetCode" },
          { id: "p6_2_9", title: "Find Intersection Point of Y Linked List", difficulty: "MEDIUM", link: "https://leetcode.com/problems/intersection-of-two-linked-lists/", platform: "LeetCode" },
          { id: "p6_2_10", title: "Add 2 Numbers represented by LL", difficulty: "MEDIUM", link: "https://leetcode.com/problems/add-two-numbers/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "6.3",
        topicTitle: "Hard Problems of LL",
        problems: [
          { id: "p6_3_1", title: "Reverse LL in group of given size K", difficulty: "HARD", link: "https://leetcode.com/problems/reverse-nodes-in-k-group/", platform: "LeetCode" },
          { id: "p6_3_2", title: "Rotate a Linked List", difficulty: "MEDIUM", link: "https://leetcode.com/problems/rotate-list/", platform: "LeetCode" },
          { id: "p6_3_3", title: "Flattening of a Linked List", difficulty: "HARD", link: "https://takeuforward.org/data-structure/flattening-a-linked-list/", platform: "TakeUForward" },
          { id: "p6_3_4", title: "Copy List with Random Pointer", difficulty: "MEDIUM", link: "https://leetcode.com/problems/copy-list-with-random-pointer/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 7,
    stepTitle: "Step 7: Recursion & Backtracking",
    description: "Subsets, combinations, permutations, N-Queens, Sudoku solver, word search.",
    topics: [
      {
        topicId: "7.1",
        topicTitle: "Subsequences & Combinations",
        problems: [
          { id: "p7_1_1", title: "Generate all Subsets / Power Set", difficulty: "MEDIUM", link: "https://leetcode.com/problems/subsets/", platform: "LeetCode" },
          { id: "p7_1_2", title: "Combination Sum I", difficulty: "MEDIUM", link: "https://leetcode.com/problems/combination-sum/", platform: "LeetCode" },
          { id: "p7_1_3", title: "Combination Sum II (No Duplicates)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/combination-sum-ii/", platform: "LeetCode" },
          { id: "p7_1_4", title: "Subset Sum I & II", difficulty: "MEDIUM", link: "https://leetcode.com/problems/subsets-ii/", platform: "LeetCode" },
          { id: "p7_1_5", title: "Generate Parentheses", difficulty: "MEDIUM", link: "https://leetcode.com/problems/generate-parentheses/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "7.2",
        topicTitle: "Hard Backtracking Problems",
        problems: [
          { id: "p7_2_1", title: "Word Search in Grid", difficulty: "MEDIUM", link: "https://leetcode.com/problems/word-search/", platform: "LeetCode" },
          { id: "p7_2_2", title: "N-Queens Problem", difficulty: "HARD", link: "https://leetcode.com/problems/n-queens/", platform: "LeetCode" },
          { id: "p7_2_3", title: "Rat in a Maze Problem", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/rat-in-a-maze/", platform: "TakeUForward" },
          { id: "p7_2_4", title: "Word Break (Recursive)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/word-break/", platform: "LeetCode" },
          { id: "p7_2_5", title: "Sudoku Solver", difficulty: "HARD", link: "https://leetcode.com/problems/sudoku-solver/", platform: "LeetCode" },
          { id: "p7_2_6", title: "Palindrome Partitioning", difficulty: "MEDIUM", link: "https://leetcode.com/problems/palindrome-partitioning/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 8,
    stepTitle: "Step 8: Bit Manipulation",
    description: "Bitwise operators, check set bit, count set bits, single numbers, power sets.",
    topics: [
      {
        topicId: "8.1",
        topicTitle: "Learn Bit Manipulation",
        problems: [
          { id: "p8_1_1", title: "Check if the i-th bit is set or not", difficulty: "EASY", link: "https://takeuforward.org/data-structure/check-if-the-i-th-bit-is-set-or-not/", platform: "TakeUForward" },
          { id: "p8_1_2", title: "Check if a number is Power of 2", difficulty: "EASY", link: "https://leetcode.com/problems/power-of-two/", platform: "LeetCode" },
          { id: "p8_1_3", title: "Count Number of Set Bits (Hamming Weight)", difficulty: "EASY", link: "https://leetcode.com/problems/number-of-1-bits/", platform: "LeetCode" },
          { id: "p8_1_4", title: "Set/Clear the rightmost unset/set bit", difficulty: "EASY", link: "https://takeuforward.org/data-structure/set-the-rightmost-unset-bit/", platform: "TakeUForward" },
          { id: "p8_1_5", title: "Two Numbers with Odd Occurrences (Single Number III)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/single-number-iii/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 9,
    stepTitle: "Step 9: Stack and Queues",
    description: "Monotonic stacks, Next Greater Element, Histogram, Sliding Window Maximum, Min Stack.",
    topics: [
      {
        topicId: "9.1",
        topicTitle: "Learning & Standard Implementations",
        problems: [
          { id: "p9_1_1", title: "Implement Stack using Array / Queue", difficulty: "EASY", link: "https://leetcode.com/problems/implement-stack-using-queues/", platform: "LeetCode" },
          { id: "p9_1_2", title: "Implement Queue using Stack", difficulty: "EASY", link: "https://leetcode.com/problems/implement-queue-using-stacks/", platform: "LeetCode" },
          { id: "p9_1_3", title: "Valid Parentheses", difficulty: "EASY", link: "https://leetcode.com/problems/valid-parentheses/", platform: "LeetCode" },
          { id: "p9_1_4", title: "Implement Min Stack in O(1) Time and Space", difficulty: "MEDIUM", link: "https://leetcode.com/problems/min-stack/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "9.2",
        topicTitle: "Monotonic Stack Problems (Core DSA Pattern)",
        problems: [
          { id: "p9_2_1", title: "Next Greater Element I & II", difficulty: "MEDIUM", link: "https://leetcode.com/problems/next-greater-element-ii/", platform: "LeetCode" },
          { id: "p9_2_2", title: "Trapping Rainwater (Stack & 2-Pointer)", difficulty: "HARD", link: "https://leetcode.com/problems/trapping-rain-water/", platform: "LeetCode" },
          { id: "p9_2_3", title: "Sum of Subarray Minimums", difficulty: "MEDIUM", link: "https://leetcode.com/problems/sum-of-subarray-minimums/", platform: "LeetCode" },
          { id: "p9_2_4", title: "Asteroid Collision", difficulty: "MEDIUM", link: "https://leetcode.com/problems/asteroid-collision/", platform: "LeetCode" },
          { id: "p9_2_5", title: "Largest Rectangle in Histogram", difficulty: "HARD", link: "https://leetcode.com/problems/largest-rectangle-in-histogram/", platform: "LeetCode" },
          { id: "p9_2_6", title: "Maximal Rectangle (Matrix Histogram)", difficulty: "HARD", link: "https://leetcode.com/problems/maximal-rectangle/", platform: "LeetCode" },
          { id: "p9_2_7", title: "Sliding Window Maximum (Deque)", difficulty: "HARD", link: "https://leetcode.com/problems/sliding-window-maximum/", platform: "LeetCode" },
          { id: "p9_2_8", title: "The Celebrity Problem", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/the-celebrity-problem/", platform: "TakeUForward" },
          { id: "p9_2_9", title: "LRU Cache Implementation", difficulty: "HARD", link: "https://leetcode.com/problems/lru-cache/", platform: "LeetCode" },
          { id: "p9_2_10", title: "LFU Cache Implementation", difficulty: "HARD", link: "https://leetcode.com/problems/lfu-cache/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 10,
    stepTitle: "Step 10: Sliding Window & Two Pointer",
    description: "Constant, Longest, and Shortest window patterns.",
    topics: [
      {
        topicId: "10.1",
        topicTitle: "Medium & Hard Sliding Window Problems",
        problems: [
          { id: "p10_1_1", title: "Longest Substring Without Repeating Characters", difficulty: "MEDIUM", link: "https://leetcode.com/problems/longest-substring-without-repeating-characters/", platform: "LeetCode" },
          { id: "p10_1_2", title: "Max Consecutive Ones III (Flip K zeros)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/max-consecutive-ones-iii/", platform: "LeetCode" },
          { id: "p10_1_3", title: "Fruit Into Baskets", difficulty: "MEDIUM", link: "https://leetcode.com/problems/fruit-into-baskets/", platform: "LeetCode" },
          { id: "p10_1_4", title: "Longest Repeating Character Replacement", difficulty: "MEDIUM", link: "https://leetcode.com/problems/longest-repeating-character-replacement/", platform: "LeetCode" },
          { id: "p10_1_5", title: "Binary Subarrays with Sum", difficulty: "MEDIUM", link: "https://leetcode.com/problems/binary-subarrays-with-sum/", platform: "LeetCode" },
          { id: "p10_1_6", title: "Count Number of Nice Subarrays", difficulty: "MEDIUM", link: "https://leetcode.com/problems/count-number-of-nice-subarrays/", platform: "LeetCode" },
          { id: "p10_1_7", title: "Number of Substrings Containing All Three Characters", difficulty: "MEDIUM", link: "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/", platform: "LeetCode" },
          { id: "p10_1_8", title: "Maximum Points You Can Obtain from Cards", difficulty: "MEDIUM", link: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/", platform: "LeetCode" },
          { id: "p10_1_9", title: "Minimum Window Substring", difficulty: "HARD", link: "https://leetcode.com/problems/minimum-window-substring/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 11,
    stepTitle: "Step 11: Heaps & Priority Queues",
    description: "Min-Heap, Max-Heap, Top K Elements, Kth largest, Merge K Sorted lists.",
    topics: [
      {
        topicId: "11.1",
        topicTitle: "Heap Basics & Problems",
        problems: [
          { id: "p11_1_1", title: "Implement Min / Max Heap & Heapify", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/min-heap-and-max-heap-implementation-in-c/", platform: "TakeUForward" },
          { id: "p11_1_2", title: "Kth Largest Element in an Array", difficulty: "MEDIUM", link: "https://leetcode.com/problems/kth-largest-element-in-an-array/", platform: "LeetCode" },
          { id: "p11_1_3", title: "Kth Smallest Element in an Array", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/kth-largest-smallest-element-in-an-array/", platform: "TakeUForward" },
          { id: "p11_1_4", title: "Merge M/K Sorted Lists", difficulty: "HARD", link: "https://leetcode.com/problems/merge-k-sorted-lists/", platform: "LeetCode" },
          { id: "p11_1_5", title: "Top K Frequent Elements", difficulty: "MEDIUM", link: "https://leetcode.com/problems/top-k-frequent-elements/", platform: "LeetCode" },
          { id: "p11_1_6", title: "Task Scheduler", difficulty: "MEDIUM", link: "https://leetcode.com/problems/task-scheduler/", platform: "LeetCode" },
          { id: "p11_1_7", title: "Find Median from Data Stream", difficulty: "HARD", link: "https://leetcode.com/problems/find-median-from-data-stream/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 12,
    stepTitle: "Step 12: Greedy Algorithms",
    description: "Interval scheduling, jump game, fractional knapsack, N meetings in one room.",
    topics: [
      {
        topicId: "12.1",
        topicTitle: "Greedy Easy & Medium",
        problems: [
          { id: "p12_1_1", title: "Assign Cookies", difficulty: "EASY", link: "https://leetcode.com/problems/assign-cookies/", platform: "LeetCode" },
          { id: "p12_1_2", title: "Fractional Knapsack Problem", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/fractional-knapsack-problem-greedy-approach/", platform: "TakeUForward" },
          { id: "p12_1_3", title: "Find Minimum Number of Coins", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/find-minimum-number-of-coins/", platform: "TakeUForward" },
          { id: "p12_1_4", title: "Lemonade Change", difficulty: "EASY", link: "https://leetcode.com/problems/lemonade-change/", platform: "LeetCode" },
          { id: "p12_1_5", title: "N Meetings in One Room", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/n-meetings-in-one-room/", platform: "TakeUForward" },
          { id: "p12_1_6", title: "Non-overlapping Intervals", difficulty: "MEDIUM", link: "https://leetcode.com/problems/non-overlapping-intervals/", platform: "LeetCode" },
          { id: "p12_1_7", title: "Insert Interval", difficulty: "MEDIUM", link: "https://leetcode.com/problems/insert-interval/", platform: "LeetCode" },
          { id: "p12_1_8", title: "Jump Game I & II", difficulty: "MEDIUM", link: "https://leetcode.com/problems/jump-game/", platform: "LeetCode" },
          { id: "p12_1_9", title: "Candy (Hard Greedy)", difficulty: "HARD", link: "https://leetcode.com/problems/candy/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 13,
    stepTitle: "Step 13: Binary Trees (Traversals, Views, Construction)",
    description: "Inorder, Preorder, Postorder, BFS Level Order, Boundary, Diameter, LCA, Serialization.",
    topics: [
      {
        topicId: "13.1",
        topicTitle: "Traversals & Properties",
        problems: [
          { id: "p13_1_1", title: "Binary Tree Traversals (Inorder, Preorder, Postorder)", difficulty: "EASY", link: "https://leetcode.com/problems/binary-tree-inorder-traversal/", platform: "LeetCode" },
          { id: "p13_1_2", title: "Level Order Traversal / BFS", difficulty: "MEDIUM", link: "https://leetcode.com/problems/binary-tree-level-order-traversal/", platform: "LeetCode" },
          { id: "p13_1_3", title: "Maximum Depth / Height of Binary Tree", difficulty: "EASY", link: "https://leetcode.com/problems/maximum-depth-of-binary-tree/", platform: "LeetCode" },
          { id: "p13_1_4", title: "Check if Binary Tree is Balanced", difficulty: "EASY", link: "https://leetcode.com/problems/balanced-binary-tree/", platform: "LeetCode" },
          { id: "p13_1_5", title: "Diameter of Binary Tree", difficulty: "EASY", link: "https://leetcode.com/problems/diameter-of-binary-tree/", platform: "LeetCode" },
          { id: "p13_1_6", title: "Maximum Path Sum in Binary Tree", difficulty: "HARD", link: "https://leetcode.com/problems/binary-tree-maximum-path-sum/", platform: "LeetCode" },
          { id: "p13_1_7", title: "Check if Two Trees are Identical", difficulty: "EASY", link: "https://leetcode.com/problems/same-tree/", platform: "LeetCode" },
          { id: "p13_1_8", title: "Zig Zag / Spiral Traversal of Binary Tree", difficulty: "MEDIUM", link: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "13.2",
        topicTitle: "Views & Hard Tree Problems",
        problems: [
          { id: "p13_2_1", title: "Boundary Traversal of Binary Tree", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/boundary-traversal-of-a-binary-tree/", platform: "TakeUForward" },
          { id: "p13_2_2", title: "Vertical Order Traversal of Binary Tree", difficulty: "HARD", link: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/", platform: "LeetCode" },
          { id: "p13_2_3", title: "Top / Bottom View of Binary Tree", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/top-view-of-a-binary-tree/", platform: "TakeUForward" },
          { id: "p13_2_4", title: "Right / Left View of Binary Tree", difficulty: "MEDIUM", link: "https://leetcode.com/problems/binary-tree-right-side-view/", platform: "LeetCode" },
          { id: "p13_2_5", title: "Lowest Common Ancestor for Two Given Nodes", difficulty: "MEDIUM", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/", platform: "LeetCode" },
          { id: "p13_2_6", title: "Construct Binary Tree from Preorder and Inorder", difficulty: "MEDIUM", link: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/", platform: "LeetCode" },
          { id: "p13_2_7", title: "Serialize and Deserialize Binary Tree", difficulty: "HARD", link: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 14,
    stepTitle: "Step 14: Binary Search Trees (BST)",
    description: "BST properties, search, insertion, deletion, validate BST, LCA in BST, BST Iterator.",
    topics: [
      {
        topicId: "14.1",
        topicTitle: "Concepts and Operations in BST",
        problems: [
          { id: "p14_1_1", title: "Search in a Binary Search Tree", difficulty: "EASY", link: "https://leetcode.com/problems/search-in-a-binary-search-tree/", platform: "LeetCode" },
          { id: "p14_1_2", title: "Find Min/Max in BST", difficulty: "EASY", link: "https://takeuforward.org/binary-search-tree/find-minimum-maximum-value-in-a-bst/", platform: "TakeUForward" },
          { id: "p14_1_3", title: "Ceil & Floor in a BST", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/ceil-in-a-binary-search-tree/", platform: "TakeUForward" },
          { id: "p14_1_4", title: "Insert a given Node in BST", difficulty: "MEDIUM", link: "https://leetcode.com/problems/insert-into-a-binary-search-tree/", platform: "LeetCode" },
          { id: "p14_1_5", title: "Delete a Node in BST", difficulty: "MEDIUM", link: "https://leetcode.com/problems/delete-node-in-a-bst/", platform: "LeetCode" },
          { id: "p14_1_6", title: "Kth Smallest/Largest Element in BST", difficulty: "MEDIUM", link: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/", platform: "LeetCode" },
          { id: "p14_1_7", title: "Validate Binary Search Tree", difficulty: "MEDIUM", link: "https://leetcode.com/problems/validate-binary-search-tree/", platform: "LeetCode" },
          { id: "p14_1_8", title: "LCA in Binary Search Tree", difficulty: "MEDIUM", link: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/", platform: "LeetCode" },
          { id: "p14_1_9", title: "Two Sum in BST", difficulty: "MEDIUM", link: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/", platform: "LeetCode" },
          { id: "p14_1_10", title: "Recover BST (Swap Two Incorrect Nodes)", difficulty: "HARD", link: "https://leetcode.com/problems/recover-binary-search-tree/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 15,
    stepTitle: "Step 15: Graphs (BFS, DFS, Topo Sort, Shortest Path, MST, Disjoint Set)",
    description: "Graph representation, connected components, cycle detection, Dijkstra, Bellman Ford, Floyd Warshall, Kruskal, Prim, Kahn's algorithm.",
    topics: [
      {
        topicId: "15.1",
        topicTitle: "Traversals & Cycles",
        problems: [
          { id: "p15_1_1", title: "Graph Representation (Adjacency List & Matrix)", difficulty: "EASY", link: "https://takeuforward.org/graph/graph-representation-in-c/", platform: "TakeUForward" },
          { id: "p15_1_2", title: "BFS and DFS Traversal of Graph", difficulty: "EASY", link: "https://takeuforward.org/data-structure/breadth-first-searchbfs-level-order-traversal/", platform: "TakeUForward" },
          { id: "p15_1_3", title: "Number of Provinces / Connected Components", difficulty: "MEDIUM", link: "https://leetcode.com/problems/number-of-provinces/", platform: "LeetCode" },
          { id: "p15_1_4", title: "Rotting Oranges (Multi-source BFS)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/rotting-oranges/", platform: "LeetCode" },
          { id: "p15_1_5", title: "Flood Fill Algorithm", difficulty: "EASY", link: "https://leetcode.com/problems/flood-fill/", platform: "LeetCode" },
          { id: "p15_1_6", title: "Cycle Detection in Undirected Graph (BFS & DFS)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/detect-cycle-in-an-undirected-graph-using-bfs/", platform: "TakeUForward" },
          { id: "p15_1_7", title: "0/1 Matrix (Distance to Nearest 0)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/01-matrix/", platform: "LeetCode" },
          { id: "p15_1_8", title: "Surrounded Regions (Replace O's with X's)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/surrounded-regions/", platform: "LeetCode" },
          { id: "p15_1_9", title: "Number of Enclaves", difficulty: "MEDIUM", link: "https://leetcode.com/problems/number-of-enclaves/", platform: "LeetCode" },
          { id: "p15_1_10", title: "Word Ladder I & II", difficulty: "HARD", link: "https://leetcode.com/problems/word-ladder/", platform: "LeetCode" },
          { id: "p15_1_11", title: "Is Graph Bipartite?", difficulty: "MEDIUM", link: "https://leetcode.com/problems/is-graph-bipartite/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "15.2",
        topicTitle: "Topo Sort & Directed Graph Cycles",
        problems: [
          { id: "p15_2_1", title: "Topological Sort (DFS & Kahn's BFS Algorithm)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/topological-sort-algorithm-dfs/", platform: "TakeUForward" },
          { id: "p15_2_2", title: "Course Schedule I & II", difficulty: "MEDIUM", link: "https://leetcode.com/problems/course-schedule/", platform: "LeetCode" },
          { id: "p15_2_3", title: "Alien Dictionary", difficulty: "HARD", link: "https://takeuforward.org/data-structure/alien-dictionary-topological-sort/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "15.3",
        topicTitle: "Shortest Path Algorithms",
        problems: [
          { id: "p15_3_1", title: "Dijkstra's Algorithm (PriorityQueue & Set)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/dijkstras-algorithm-using-priority-queue-g-32/", platform: "TakeUForward" },
          { id: "p15_3_2", title: "Shortest Path in Binary Matrix", difficulty: "MEDIUM", link: "https://leetcode.com/problems/shortest-path-in-binary-matrix/", platform: "LeetCode" },
          { id: "p15_3_3", title: "Path With Minimum Effort", difficulty: "MEDIUM", link: "https://leetcode.com/problems/path-with-minimum-effort/", platform: "LeetCode" },
          { id: "p15_3_4", title: "Cheapest Flights Within K Stops", difficulty: "MEDIUM", link: "https://leetcode.com/problems/cheapest-flights-within-k-stops/", platform: "LeetCode" },
          { id: "p15_3_5", title: "Network Delay Time", difficulty: "MEDIUM", link: "https://leetcode.com/problems/network-delay-time/", platform: "LeetCode" },
          { id: "p15_3_6", title: "Bellman Ford Algorithm (Detect Negative Cycles)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/bellman-ford-algorithm-g-41/", platform: "TakeUForward" },
          { id: "p15_3_7", title: "Floyd Warshall Algorithm (All-pairs Shortest Path)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/floyd-warshall-algorithm-g-42/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "15.4",
        topicTitle: "MST & Disjoint Set Union (DSU)",
        problems: [
          { id: "p15_4_1", title: "Disjoint Set (Union by Rank & Path Compression)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/disjoint-set-union-by-rank-union-by-size-path-compression-g-46/", platform: "TakeUForward" },
          { id: "p15_4_2", title: "Kruskal's & Prim's Minimum Spanning Tree", difficulty: "HARD", link: "https://takeuforward.org/data-structure/kruskals-algorithm-minimum-spanning-tree-g-47/", platform: "TakeUForward" },
          { id: "p15_4_3", title: "Number of Operations to Make Network Connected", difficulty: "MEDIUM", link: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/", platform: "LeetCode" },
          { id: "p15_4_4", title: "Most Stones Removed with Same Row or Column", difficulty: "MEDIUM", link: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/", platform: "LeetCode" },
          { id: "p15_4_5", title: "Accounts Merge", difficulty: "MEDIUM", link: "https://leetcode.com/problems/accounts-merge/", platform: "LeetCode" },
          { id: "p15_4_6", title: "Making A Large Island", difficulty: "HARD", link: "https://leetcode.com/problems/making-a-large-island/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 16,
    stepTitle: "Step 16: Dynamic Programming (DP)",
    description: "1D DP, 2D Grid DP, DP on Subsequences, Strings, Stocks, LIS, MCM, Partition DP.",
    topics: [
      {
        topicId: "16.1",
        topicTitle: "1D DP (Climbing Stairs, Frog Jump)",
        problems: [
          { id: "p16_1_1", title: "Climbing Stairs", difficulty: "EASY", link: "https://leetcode.com/problems/climbing-stairs/", platform: "LeetCode" },
          { id: "p16_1_2", title: "Frog Jump (DP 3 & 4)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/dynamic-programming-frog-jump-dp-3/", platform: "TakeUForward" },
          { id: "p16_1_3", title: "House Robber I & II (Maximum Sum of Non-Adjacent Elements)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/house-robber/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "16.2",
        topicTitle: "2D Grid DP",
        problems: [
          { id: "p16_2_1", title: "Ninja's Training", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/dynamic-programming-ninjas-training-dp-7/", platform: "TakeUForward" },
          { id: "p16_2_2", title: "Grid Unique Paths I & II", difficulty: "MEDIUM", link: "https://leetcode.com/problems/unique-paths/", platform: "LeetCode" },
          { id: "p16_2_3", title: "Minimum Path Sum in Grid", difficulty: "MEDIUM", link: "https://leetcode.com/problems/minimum-path-sum/", platform: "LeetCode" },
          { id: "p16_2_4", title: "Triangle Fixed Starting to Variable Ending", difficulty: "MEDIUM", link: "https://leetcode.com/problems/triangle/", platform: "LeetCode" },
          { id: "p16_2_5", title: "Minimum / Maximum Falling Path Sum", difficulty: "MEDIUM", link: "https://leetcode.com/problems/minimum-falling-path-sum/", platform: "LeetCode" },
          { id: "p16_2_6", title: "Cherry Pickup II (3D DP)", difficulty: "HARD", link: "https://leetcode.com/problems/cherry-pickup-ii/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "16.3",
        topicTitle: "DP on Subsequences / Knapsack",
        problems: [
          { id: "p16_3_1", title: "Subset Sum Equal to Target", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/subset-sum-equal-to-target-dp-14/", platform: "TakeUForward" },
          { id: "p16_3_2", title: "Partition Equal Subset Sum", difficulty: "MEDIUM", link: "https://leetcode.com/problems/partition-equal-subset-sum/", platform: "LeetCode" },
          { id: "p16_3_3", title: "0/1 Knapsack Problem", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/0-1-knapsack-dp-19/", platform: "TakeUForward" },
          { id: "p16_3_4", title: "Minimum Coins / Coin Change I & II", difficulty: "MEDIUM", link: "https://leetcode.com/problems/coin-change/", platform: "LeetCode" },
          { id: "p16_3_5", title: "Target Sum", difficulty: "MEDIUM", link: "https://leetcode.com/problems/target-sum/", platform: "LeetCode" },
          { id: "p16_3_6", title: "Unbounded Knapsack", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/unbounded-knapsack-dp-23/", platform: "TakeUForward" },
          { id: "p16_3_7", title: "Rod Cutting Problem", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/rod-cutting-problem-dp-24/", platform: "TakeUForward" }
        ]
      },
      {
        topicId: "16.4",
        topicTitle: "DP on Strings",
        problems: [
          { id: "p16_4_1", title: "Longest Common Subsequence (LCS)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/longest-common-subsequence/", platform: "LeetCode" },
          { id: "p16_4_2", title: "Print Longest Common Subsequence", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/print-longest-common-subsequence-dp-26/", platform: "TakeUForward" },
          { id: "p16_4_3", title: "Longest Common Substring", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/longest-common-substring-dp-27/", platform: "TakeUForward" },
          { id: "p16_4_4", title: "Longest Palindromic Subsequence", difficulty: "MEDIUM", link: "https://leetcode.com/problems/longest-palindromic-subsequence/", platform: "LeetCode" },
          { id: "p16_4_5", title: "Minimum Insertions to Make String Palindrome", difficulty: "MEDIUM", link: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/", platform: "LeetCode" },
          { id: "p16_4_6", title: "Edit Distance (Insert, Delete, Replace)", difficulty: "HARD", link: "https://leetcode.com/problems/edit-distance/", platform: "LeetCode" },
          { id: "p16_4_7", title: "Wildcard Matching", difficulty: "HARD", link: "https://leetcode.com/problems/wildcard-matching/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "16.5",
        topicTitle: "DP on Stocks & LIS",
        problems: [
          { id: "p16_5_1", title: "Best Time to Buy and Sell Stock II, III, IV, with Cooldown & Fee", difficulty: "HARD", link: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/", platform: "LeetCode" },
          { id: "p16_5_2", title: "Longest Increasing Subsequence (LIS - O(N^2) & O(N log N) BS)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/longest-increasing-subsequence/", platform: "LeetCode" },
          { id: "p16_5_3", title: "Largest Divisible Subset", difficulty: "MEDIUM", link: "https://leetcode.com/problems/largest-divisible-subset/", platform: "LeetCode" },
          { id: "p16_5_4", title: "Longest String Chain", difficulty: "MEDIUM", link: "https://leetcode.com/problems/longest-string-chain/", platform: "LeetCode" },
          { id: "p16_5_5", title: "Longest Bitonic Subsequence", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/longest-bitonic-subsequence-dp-46/", platform: "TakeUForward" },
          { id: "p16_5_6", title: "Number of Longest Increasing Subsequences", difficulty: "MEDIUM", link: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/", platform: "LeetCode" }
        ]
      },
      {
        topicId: "16.6",
        topicTitle: "MCM / Partition DP",
        problems: [
          { id: "p16_6_1", title: "Matrix Chain Multiplication (MCM)", difficulty: "HARD", link: "https://takeuforward.org/data-structure/matrix-chain-multiplication-dp-48/", platform: "TakeUForward" },
          { id: "p16_6_2", title: "Minimum Cost to Cut a Stick", difficulty: "HARD", link: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/", platform: "LeetCode" },
          { id: "p16_6_3", title: "Burst Balloons", difficulty: "HARD", link: "https://leetcode.com/problems/burst-balloons/", platform: "LeetCode" },
          { id: "p16_6_4", title: "Palindrome Partitioning II (Min Cuts)", difficulty: "HARD", link: "https://leetcode.com/problems/palindrome-partitioning-ii/", platform: "LeetCode" },
          { id: "p16_6_5", title: "Partition Array for Maximum Sum", difficulty: "MEDIUM", link: "https://leetcode.com/problems/partition-array-for-maximum-sum/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 17,
    stepTitle: "Step 17: Tries",
    description: "Prefix tree operations, auto-completion, distinct substrings, and Maximum XOR bitwise tries.",
    topics: [
      {
        topicId: "17.1",
        topicTitle: "Theory and Implementation",
        problems: [
          { id: "p17_1_1", title: "Implement Trie (Prefix Tree - Insert, Search, StartsWith)", difficulty: "MEDIUM", link: "https://leetcode.com/problems/implement-trie-prefix-tree/", platform: "LeetCode" },
          { id: "p17_1_2", title: "Implement Trie II (Prefix with Word Count & Erase)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/implement-trie-ii-prefix-tree/", platform: "TakeUForward" },
          { id: "p17_1_3", title: "Longest String with All Prefixes (Complete String)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/longest-word-with-all-prefixes/", platform: "TakeUForward" },
          { id: "p17_1_4", title: "Number of Distinct Substrings in a String", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/number-of-distinct-substrings-in-a-string-using-trie/", platform: "TakeUForward" },
          { id: "p17_1_5", title: "Maximum XOR of Two Numbers in an Array", difficulty: "MEDIUM", link: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/", platform: "LeetCode" },
          { id: "p17_1_6", title: "Maximum XOR With an Element From Array (Queries)", difficulty: "HARD", link: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/", platform: "LeetCode" }
        ]
      }
    ]
  },
  {
    stepId: 18,
    stepTitle: "Step 18: Advanced Strings (Matching Algorithms)",
    description: "Rabin-Karp Rolling Hash, Knuth-Morris-Pratt (KMP), and Z-Algorithm string search.",
    topics: [
      {
        topicId: "18.1",
        topicTitle: "String Matching Algorithms",
        problems: [
          { id: "p18_1_1", title: "Rabin Karp Algorithm (Rolling Hash Pattern Search)", difficulty: "MEDIUM", link: "https://takeuforward.org/data-structure/rabin-karp-algorithm-for-pattern-searching/", platform: "TakeUForward" },
          { id: "p18_1_2", title: "KMP Algorithm / LPS Array (Prefix Function)", difficulty: "HARD", link: "https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/", platform: "LeetCode" },
          { id: "p18_1_3", title: "Z-Algorithm (Linear Pattern Matching)", difficulty: "HARD", link: "https://takeuforward.org/data-structure/z-algorithm-pattern-searching/", platform: "TakeUForward" },
          { id: "p18_1_4", title: "Shortest Palindrome (Minimum characters to add at front)", difficulty: "HARD", link: "https://leetcode.com/problems/shortest-palindrome/", platform: "LeetCode" }
        ]
      }
    ]
  }
];

