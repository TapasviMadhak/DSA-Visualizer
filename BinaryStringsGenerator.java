import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

/**
 * DSA Problem: Generating All Binary Strings of Length N
 * 
 * Given an integer N, generate and print all possible binary strings of length N.
 * Total binary strings = 2^N
 * 
 * This class provides 4 distinct approaches in Java:
 * 1. Backtracking with a Character Array (Optimal auxiliary space)
 * 2. Recursive Divide & Conquer with String Concatenation
 * 3. Bit Manipulation / Bitwise Counter
 * 4. Iterative Breadth-First Search (BFS) using a Queue
 */
public class BinaryStringsGenerator {

    // =========================================================================
    // Approach 1: Backtracking with Character Array (Standard & Most Efficient)
    // Time Complexity : O(2^N * N) - 2^N strings, each takes O(N) to construct/print
    // Space Complexity: O(N) - Recursion stack depth + char array of size N
    // =========================================================================
    public static List<String> generateBacktracking(int n) {
        List<String> result = new ArrayList<>();
        if (n <= 0) return result;
        char[] current = new char[n];
        backtrack(0, n, current, result);
        return result;
    }

    private static void backtrack(int index, int n, char[] current, List<String> result) {
        // Base Case: All N positions filled
        if (index == n) {
            result.add(new String(current));
            return;
        }

        // Branch 1: Choose '0' for the current position
        current[index] = '0';
        backtrack(index + 1, n, current, result);

        // Branch 2: Choose '1' for the current position
        current[index] = '1';
        backtrack(index + 1, n, current, result);

        // Note: The character at current[index] is naturally overwritten
        // in subsequent branches, fulfilling backtracking principle.
    }

    // =========================================================================
    // Approach 2: Recursive Divide & Conquer (String Concatenation)
    // Time Complexity : O(2^N * N)
    // Space Complexity: O(N^2) due to immutable String creation at each level
    // =========================================================================
    public static List<String> generateRecursiveString(int n) {
        List<String> result = new ArrayList<>();
        if (n <= 0) return result;
        generateStringHelper(n, "", result);
        return result;
    }

    private static void generateStringHelper(int n, String current, List<String> result) {
        if (current.length() == n) {
            result.add(current);
            return;
        }
        // Explore branch '0'
        generateStringHelper(n, current + "0", result);
        // Explore branch '1'
        generateStringHelper(n, current + "1", result);
    }

    // =========================================================================
    // Approach 3: Bit Manipulation (Iterative Binary Counter)
    // Time Complexity : O(2^N * N)
    // Space Complexity: O(1) auxiliary space (excluding output list)
    // =========================================================================
    public static List<String> generateBitwise(int n) {
        List<String> result = new ArrayList<>();
        if (n <= 0 || n > 30) return result;

        int total = 1 << n; // 2^N
        for (int i = 0; i < total; i++) {
            StringBuilder sb = new StringBuilder(n);
            for (int bit = n - 1; bit >= 0; bit--) {
                // Check if bit-th position is set
                sb.append((i & (1 << bit)) != 0 ? '1' : '0');
            }
            result.add(sb.toString());
        }
        return result;
    }

    // =========================================================================
    // Approach 4: Iterative Breadth-First Search (Queue)
    // Time Complexity : O(2^N * N)
    // Space Complexity: O(2^N) space to hold the leaves in the queue
    // =========================================================================
    public static List<String> generateBFS(int n) {
        List<String> result = new ArrayList<>();
        if (n <= 0) return result;

        Queue<String> queue = new LinkedList<>();
        queue.offer("");

        while (!queue.isEmpty()) {
            String curr = queue.poll();
            if (curr.length() == n) {
                result.add(curr);
            } else {
                queue.offer(curr + "0");
                queue.offer(curr + "1");
            }
        }
        return result;
    }

    // =========================================================================
    // Main Method: Run and Verify
    // =========================================================================
    public static void main(String[] args) {
        int n = 3;
        System.out.println("=================================================");
        System.out.println("Generating all binary strings of length N = " + n);
        System.out.println("Expected count = 2^" + n + " = " + (1 << n));
        System.out.println("=================================================");

        System.out.println("\n1. Backtracking Approach (char[]):");
        List<String> res1 = generateBacktracking(n);
        System.out.println(res1);

        System.out.println("\n2. Recursive String Concatenation:");
        List<String> res2 = generateRecursiveString(n);
        System.out.println(res2);

        System.out.println("\n3. Bit Manipulation:");
        List<String> res3 = generateBitwise(n);
        System.out.println(res3);

        System.out.println("\n4. Iterative BFS (Queue):");
        List<String> res4 = generateBFS(n);
        System.out.println(res4);

        System.out.println("\nAll methods match output: " + 
            (res1.equals(res2) && res2.equals(res3) && res3.equals(res4)));
    }
}
