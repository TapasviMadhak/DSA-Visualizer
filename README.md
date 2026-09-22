# DSA Visualizer

An interactive learning workspace for stepping through data structures and algorithms. The active web app is intentionally small: React, Vite, and local CSS.

---

## Features

### 1. 🔀 Binary Strings of Length N (Recursion & Backtracking)
- **Interactive Tree & Stack Visualization**: Step through recursive decision trees with synchronized bit-slot arrays.
- **Code execution tracer**: Line-by-line code highlighting showing exact execution state, recursion depth, and call stack parameters.
- **Play/Pause, Step-by-Step, & Speed Controls**: Scrub through the algorithm at your own pace.

### 2. 🌲 Binary Tree from Array (Level-Order / `2*i + 1`, `2*i + 2`)
- **Array Memory vs. Tree Canvas**: Interactive array highlighting showing `parent(i)`, `left = 2*i + 1`, and `right = 2*i + 2`.
- **Node-by-Node Construction**: Watch recursion allocate nodes, connect parent-child pointers, and link left/right subtrees.
- **Inorder Traversal Animation**: Live traversal stream (`Left -> Root -> Right`) highlighting visited nodes in real time.
- **Interactive Node Inspector**: Click on any node in the tree to inspect its index, value, parent, children, depth, and memory address.
- **Preset Configurations & Custom Inputs**: Test with balanced trees, skew trees, single nodes, and custom arrays.

---

## Tech stack

- **Frontend**: React and Vite
- **Design**: Local CSS design system, no external UI framework or font runtime
- **Reference**: Algorithm snippets embedded in the visualizer

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**

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

Vite opens the app at [http://localhost:3000](http://localhost:3000).

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
│   └── index.css                 # Local design system and responsive layout
├── index.html                    # Root HTML
├── package.json
└── vite.config.js
```

---

## 📄 License
MIT License
