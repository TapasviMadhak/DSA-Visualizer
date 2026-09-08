# 🚀 DSA Visualizer Hub

An interactive, high-performance Data Structures & Algorithms visualizer built with **React**, **Vite**, and **Java reference implementations**.

![DSA Visualizer Banner](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Java](https://img.shields.io/badge/Java-Algorithms-ED8B00?logo=openjdk&logoColor=white)

---

## 🌟 Features

### 1. 🔀 Binary Strings of Length N (Recursion & Backtracking)
- **Interactive Tree & Stack Visualization**: Step through recursive decision trees with synchronized bit-slot arrays.
- **Java Debugger Synchronizer**: Line-by-line code highlighting showing exact execution state, recursion depth, and call stack parameters.
- **Play/Pause, Step-by-Step, & Speed Controls**: Scrub through the algorithm at your own pace.

### 2. 🌲 Binary Tree from Array (Level-Order / `2*i + 1`, `2*i + 2`)
- **Array Memory vs. Tree Canvas**: Interactive array highlighting showing `parent(i)`, `left = 2*i + 1`, and `right = 2*i + 2`.
- **Node-by-Node Construction**: Watch recursion allocate nodes, connect parent-child pointers, and link left/right subtrees.
- **Inorder Traversal Animation**: Live traversal stream (`Left -> Root -> Right`) highlighting visited nodes in real time.
- **Interactive Node Inspector**: Click on any node in the tree to inspect its index, value, parent, children, depth, and memory address.
- **Preset Configurations & Custom Inputs**: Test with balanced trees, skew trees, single nodes, and custom arrays.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Modern Vanilla CSS (Glassmorphism & Cyber/Dark theme)
- **Backend / Reference**: Standalone Java algorithms (`BinaryTreeFromArray.java`, `BinaryStringsRecursive.java`)
- **Visuals**: Canvas API, SVG vector graph layouts, CSS animations

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- **Java JDK** (optional, to run standalone Java files)

### Installation

```bash
# Clone the repository
git clone https://github.com/TapasviMadhak/DSA-Visualizer.git

# Navigate to the project directory
cd DSA-Visualizer

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to explore the visualizers!

### Running Java Code Directly

```bash
# Compile and run Binary Strings generator
javac BinaryStringsRecursive.java
java BinaryStringsRecursive

# Compile and run Binary Tree from Array
javac BinaryTreeFromArray.java
java BinaryTreeFromArray
```

---

## 📂 Project Structure

```
├── src/
│   ├── components/
│   │   ├── binary-strings/       # Binary string recursion tree & bit slots
│   │   ├── binary-tree-array/    # Array memory, tree canvas & inorder stream
│   │   └── common/               # Navbar, controls, code viewer & call stack
│   ├── App.jsx                   # Main visualizer switchboard
│   ├── main.jsx                  # React DOM root
│   └── index.css                 # Theme & glassmorphic design system
├── BinaryStringsRecursive.java   # Standalone Java recursive solution
├── BinaryTreeFromArray.java      # Standalone Java tree construction solution
├── index.html                    # Root HTML
├── package.json
└── vite.config.js
```

---

## 📄 License
MIT License
