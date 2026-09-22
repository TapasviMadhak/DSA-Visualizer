import React, { useState } from 'react';

const FULL_JAVA_CODE = `import java.util.Scanner;

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

        System.out.println("Constructing Binary Tree from Array...");
        Node root = constructTree(arr, 0);

        System.out.print("Inorder Traversal: ");
        inOrder(root); // Output: 4 2 5 1 6 3 7
        System.out.println();
    }
}`;

export default function TreeTheory() {
  const [activeTab, setActiveTab] = useState('algorithm');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(FULL_JAVA_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <section className="theory-section">
      <div className="theory-nav">
        <button
          className={`theory-tab ${activeTab === 'algorithm' ? 'active' : ''}`}
          onClick={() => setActiveTab('algorithm')}
        >
          🌲 Algorithm &amp; Index Mapping Math
        </button>
        <button
          className={`theory-tab ${activeTab === 'inorder' ? 'active' : ''}`}
          onClick={() => setActiveTab('inorder')}
        >
          🔄 Inorder Traversal Mechanics
        </button>
        <button
          className={`theory-tab ${activeTab === 'complexity' ? 'active' : ''}`}
          onClick={() => setActiveTab('complexity')}
        >
          ⏱️ Time &amp; Space Complexity
        </button>
        <button
          className={`theory-tab ${activeTab === 'javacode' ? 'active' : ''}`}
          onClick={() => setActiveTab('javacode')}
        >
          ☕ Full Java Source Code
        </button>
      </div>

      <div className="theory-content">
        {activeTab === 'algorithm' && (
          <div className="info-grid">
            <div className="info-card">
              <h3>📐 Array Index Representation</h3>
              <p>In a level-order array representation of a binary tree with 0-based indexing:</p>
              <ul>
                <li><strong>Root Node:</strong> Index <code>0</code></li>
                <li><strong>Left Child of node at index <code>i</code>:</strong> <code>2 * i + 1</code></li>
                <li><strong>Right Child of node at index <code>i</code>:</strong> <code>2 * i + 2</code></li>
                <li><strong>Parent of node at index <code>i</code>:</strong> <code>Math.floor((i - 1) / 2)</code></li>
              </ul>
            </div>

            <div className="info-card">
              <h3>🔄 Recursive Tree Construction</h3>
              <p>To construct the tree from an array:</p>
              <ul>
                <li><strong>Base Case:</strong> If <code>index &gt;= arr.length</code>, return <code>null</code>.</li>
                <li><strong>Create Node:</strong> <code>Node root = new Node(arr[index])</code></li>
                <li><strong>Recursive Left Subtree:</strong> <code>root.left = constructTree(arr, 2 * index + 1)</code></li>
                <li><strong>Recursive Right Subtree:</strong> <code>root.right = constructTree(arr, 2 * index + 2)</code></li>
                <li><strong>Return:</strong> Return <code>root</code> to parent caller.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'inorder' && (
          <div className="info-grid">
            <div className="info-card">
              <h3>🔄 Inorder Traversal (L &rarr; Root &rarr; R)</h3>
              <p>Inorder traversal visits nodes in the canonical sequence:</p>
              <div className="math-formula">Left Subtree &rarr; Current Node &rarr; Right Subtree</div>
              <p>For a complete binary tree created from <code>[1, 2, 3, 4, 5, 6, 7]</code>:</p>
              <ul>
                <li>Subtree 2's inorder: <code>[4, 2, 5]</code></li>
                <li>Root: <code>1</code></li>
                <li>Subtree 3's inorder: <code>[6, 3, 7]</code></li>
                <li><strong>Combined Inorder Result:</strong> <code>4, 2, 5, 1, 6, 3, 7</code></li>
              </ul>
            </div>

            <div className="info-card">
              <h3>⭐ Properties of Inorder Traversal</h3>
              <ul>
                <li><strong>Binary Search Trees (BST):</strong> An Inorder traversal of a BST yields elements in strictly sorted ascending order.</li>
                <li><strong>Expression Trees:</strong> Produces the standard algebraic infix notation (e.g. <code>(A + B) * C</code>).</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'complexity' && (
          <div className="math-grid">
            <div className="math-card">
              <h3>⏱️ Time Complexity</h3>
              <div className="math-formula">O(N) for Construction + O(N) for Traversal</div>
              <ul>
                <li><strong>Construction:</strong> Each array element from index <code>0</code> to <code>N-1</code> is visited exactly once, creating <code>N</code> tree nodes in <strong>O(N)</strong> total time.</li>
                <li><strong>Inorder Traversal:</strong> Each node in the tree is visited at most 3 times (enter, print, exit), running in <strong>O(N)</strong> time.</li>
              </ul>
            </div>

            <div className="math-card">
              <h3>💾 Space Complexity</h3>
              <div className="math-formula">O(H) = O(log N) Auxiliary Call Stack Space</div>
              <ul>
                <li><strong>Recursion Call Stack:</strong> Maximum stack depth equals the tree height $H = \lfloor \log_2 N \rfloor$, using <strong>O(log N)</strong> auxiliary space.</li>
                <li><strong>Tree Nodes Memory:</strong> Storing $N$ heap-allocated <code>Node</code> instances takes <strong>O(N)</strong> space.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'javacode' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Full reference implementation for the visualizer
              </span>
              <button
                className="btn-tool"
                onClick={handleCopy}
                style={{ width: 'auto', padding: '0.3rem 0.8rem', fontSize: '0.78rem' }}
              >
                {copied ? '✓ Copied to Clipboard!' : 'Copy Java Code'}
              </button>
            </div>
            <div className="code-snippet-box">
              <pre><code>{FULL_JAVA_CODE}</code></pre>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
