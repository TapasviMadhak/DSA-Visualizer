import java.util.Scanner;

/**
 * DSA Problem: Binary Tree Construction from Array & Inorder Traversal
 * 
 * 1. Tree Construction:
 *    - Left Child of node at index i  = 2 * i + 1
 *    - Right Child of node at index i = 2 * i + 2
 *    - Parent of node at index i      = (i - 1) / 2
 * 
 * 2. Inorder Traversal:
 *    - Left Subtree -> Root -> Right Subtree
 */
public class BinaryTreeFromArray {

    // Definition for a binary tree node
    static class Node {
        int data;
        Node left, right;

        Node(int data) {
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }

    // 1. Recursive function to construct Binary Tree from Array
    public static Node constructTree(int[] arr, int index) {
        // Base case: index is out of bounds
        if (index >= arr.length) {
            return null;
        }

        // Create current node with value at current array index
        Node root = new Node(arr[index]);

        // Recursively construct left subtree (index: 2*i + 1)
        root.left = constructTree(arr, 2 * index + 1);

        // Recursively construct right subtree (index: 2*i + 2)
        root.right = constructTree(arr, 2 * index + 2);

        return root;
    }

    // 2. Inorder Traversal (Left -> Root -> Right)
    public static void inOrder(Node root) {
        if (root == null) {
            return;
        }

        // 1. Traverse left subtree
        inOrder(root.left);

        // 2. Visit current root node
        System.out.print(root.data + " ");

        // 3. Traverse right subtree
        inOrder(root.right);
    }

    public static void main(String[] args) {
        int[] arr = { 1, 2, 3, 4, 5, 6, 7 };

        System.out.println("Input Array:");
        for (int i = 0; i < arr.length; i++) {
            System.out.println("Index " + i + ": Value " + arr[i] + 
                " -> Left child index: " + (2 * i + 1) + 
                ", Right child index: " + (2 * i + 2));
        }

        System.out.println("\nConstructing Binary Tree from Array using Recursion...");
        Node root = constructTree(arr, 0);

        System.out.print("\nInorder Traversal Result: ");
        inOrder(root); // Output: 4 2 5 1 6 3 7
        System.out.println();
    }
}
