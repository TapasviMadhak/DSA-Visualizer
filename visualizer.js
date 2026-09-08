/**
 * Binary Strings Generator (DSA Visualizer)
 * High-performance state recorder, SVG tree engine, and Java execution debugger.
 * Powered by user's BinaryStringsRecursive.java implementation.
 */

// =============================================================================
// Java Code Snippets for Debugger & Reference Tabs
// =============================================================================
const JAVA_SNIPPETS = {
  recursive: [
    { num: 1, text: 'public static void generateBinary(int n, String current) {' },
    { num: 2, text: '    // 1. Base Case: The string has reached length N' },
    { num: 3, text: '    if (current.length() == n) {' },
    { num: 4, text: '        System.out.println(current);' },
    { num: 5, text: '        return;' },
    { num: 6, text: '    }' },
    { num: 7, text: '    // --- CHOICE 1: Place \'0\' at current position ---' },
    { num: 8, text: '    generateBinary(n, current + "0");' },
    { num: 9, text: '    // --- CHOICE 2: Place \'1\' at current position ---' },
    { num: 10, text: '    generateBinary(n, current + "1");' },
    { num: 11, text: '}' }
  ],
  backtrack: [
    { num: 1, text: 'public static void generate(int n) {' },
    { num: 2, text: '    char[] current = new char[n];' },
    { num: 3, text: '    backtrack(0, n, current);' },
    { num: 4, text: '}' },
    { num: 5, text: 'private static void backtrack(int index, int n, char[] current) {' },
    { num: 6, text: '    if (index == n) {' },
    { num: 7, text: '        System.out.println(new String(current));' },
    { num: 8, text: '        return;' },
    { num: 9, text: '    }' },
    { num: 10, text: '    current[index] = \'0\';' },
    { num: 11, text: '    backtrack(index + 1, n, current);' },
    { num: 12, text: '    current[index] = \'1\';' },
    { num: 13, text: '    backtrack(index + 1, n, current);' },
    { num: 14, text: '}' }
  ],
  bitwise: [
    { num: 1, text: 'public static void generateBitwise(int n) {' },
    { num: 2, text: '    int total = 1 << n; // 2^N' },
    { num: 3, text: '    for (int i = 0; i < total; i++) {' },
    { num: 4, text: '        StringBuilder sb = new StringBuilder(n);' },
    { num: 5, text: '        for (int bit = n - 1; bit >= 0; bit--) {' },
    { num: 6, text: '            sb.append((i & (1 << bit)) != 0 ? \'1\' : \'0\');' },
    { num: 7, text: '        }' },
    { num: 8, text: '        System.out.println(sb.toString());' },
    { num: 9, text: '    }' },
    { num: 10, text: '}' }
  ],
  bfs: [
    { num: 1, text: 'public static void generateBFS(int n) {' },
    { num: 2, text: '    Queue<String> q = new LinkedList<>();' },
    { num: 3, text: '    q.offer("");' },
    { num: 4, text: '    while (!q.isEmpty()) {' },
    { num: 5, text: '        String curr = q.poll();' },
    { num: 6, text: '        if (curr.length() == n) {' },
    { num: 7, text: '            System.out.println(curr);' },
    { num: 8, text: '        } else {' },
    { num: 9, text: '            q.offer(curr + "0");' },
    { num: 10, text: '            q.offer(curr + "1");' },
    { num: 11, text: '        }' },
    { num: 12, text: '    }' },
    { num: 13, text: '}' }
  ]
};

const FULL_JAVA_SNIPPETS = {
  'java-user-recursive': `import java.util.Scanner;

public class BinaryStringsRecursive {

    // Recursive function to generate binary strings
    public static void generateBinary(int n, String current) {
        // 1. Base Case: The string has reached length N
        if (current.length() == n) {
            System.out.println(current);
            return;
        }

        // --- CHOICE 1: Place '0' at current position ---
        generateBinary(n, current + "0");

        // --- CHOICE 2: Place '1' at current position ---
        generateBinary(n, current + "1");
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter length N of binary strings: ");
        int n = scanner.nextInt();

        if (n <= 0) {
            System.out.println("Please enter a positive integer greater than 0.");
        } else {
            System.out.println("All binary strings of length " + n + ":");
            // Start recursion with an empty string
            generateBinary(n, "");
        }

        scanner.close();
    }
}`,
  'java-backtrack': `// Backtracking with Character Array (Optimized Space)
public class BinaryStringsBacktrack {
    public static void generate(int n) {
        if (n <= 0) return;
        char[] current = new char[n];
        backtrack(0, n, current);
    }

    private static void backtrack(int index, int n, char[] current) {
        if (index == n) {
            System.out.println(new String(current));
            return;
        }
        current[index] = '0';
        backtrack(index + 1, n, current);

        current[index] = '1';
        backtrack(index + 1, n, current);
    }
}`,
  'java-bitwise': `// Bit Manipulation / Bitwise Counter
public class BinaryStringsBitwise {
    public static void generate(int n) {
        if (n <= 0 || n > 31) return;
        int total = 1 << n; // 2^N

        for (int i = 0; i < total; i++) {
            StringBuilder sb = new StringBuilder(n);
            for (int bit = n - 1; bit >= 0; bit--) {
                sb.append(((i & (1 << bit)) != 0) ? '1' : '0');
            }
            System.out.println(sb.toString());
        }
    }
}`,
  'java-bfs': `// Iterative BFS with Queue
import java.util.LinkedList;
import java.util.Queue;

public class BinaryStringsBFS {
    public static void generate(int n) {
        if (n <= 0) return;
        Queue<String> queue = new LinkedList<>();
        queue.offer("");

        while (!queue.isEmpty()) {
            String curr = queue.poll();
            if (curr.length() == n) {
                System.out.println(curr);
            } else {
                queue.offer(curr + "0");
                queue.offer(curr + "1");
            }
        }
    }
}`
};

// =============================================================================
// Visualizer Engine Class
// =============================================================================
class VisualizerEngine {
  constructor() {
    this.n = 3;
    this.algorithm = 'recursive'; // Set user's recursive code as default!
    this.speed = 1.0;
    this.isPlaying = false;
    this.timer = null;

    this.steps = [];
    this.currentStepIdx = 0;

    // Viewport transform
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.startX = 0;
    this.startY = 0;

    // DOM Elements
    this.dom = {
      algoSelect: document.getElementById('algoSelect'),
      nInput: document.getElementById('nInput'),
      nValueDisplay: document.getElementById('nValueDisplay'),
      nHint: document.getElementById('nHint'),
      totalStringsStat: document.getElementById('totalStringsStat'),
      btnPlay: document.getElementById('btnPlay'),
      playIcon: document.getElementById('playIcon'),
      pauseIcon: document.getElementById('pauseIcon'),
      playBtnText: document.getElementById('playBtnText'),
      btnPrev: document.getElementById('btnPrev'),
      btnNext: document.getElementById('btnNext'),
      btnReset: document.getElementById('btnReset'),
      speedSlider: document.getElementById('speedSlider'),
      speedLabel: document.getElementById('speedLabel'),
      currentStepNum: document.getElementById('currentStepNum'),
      totalStepsNum: document.getElementById('totalStepsNum'),
      progressBarFill: document.getElementById('progressBarFill'),
      narrationPhase: document.getElementById('narrationPhase'),
      narrationDetail: document.getElementById('narrationDetail'),
      treeContainer: document.getElementById('treeContainer'),
      treeSvg: document.getElementById('treeSvg'),
      treeRootGroup: document.getElementById('treeRootGroup'),
      btnZoomIn: document.getElementById('btnZoomIn'),
      btnZoomOut: document.getElementById('btnZoomOut'),
      btnFitTree: document.getElementById('btnFitTree'),
      bitSlotsContainer: document.getElementById('bitSlotsContainer'),
      currentFormedStr: document.getElementById('currentFormedStr'),
      javaCodeBlock: document.getElementById('javaCodeBlock'),
      activeLineBadge: document.getElementById('activeLineBadge'),
      stackContainer: document.getElementById('stackContainer'),
      stackDepthBadge: document.getElementById('stackDepthBadge'),
      resultsGrid: document.getElementById('resultsGrid'),
      resultsCountTag: document.getElementById('resultsCountTag'),
      btnCopyResults: document.getElementById('btnCopyResults'),
      fullJavaSnippet: document.getElementById('fullJavaSnippet'),
      memoryTypeLabel: document.getElementById('memoryTypeLabel')
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderJavaCodePanel();
    this.renderFullJavaSnippet('java-user-recursive');
    this.resetSimulation();
  }

  // ===========================================================================
  // Step Recording Engines
  // ===========================================================================
  generateSteps() {
    this.steps = [];
    const n = this.n;

    if (this.algorithm === 'recursive') {
      this.generateUserRecursiveSteps(n);
    } else if (this.algorithm === 'backtrack') {
      this.generateBacktrackSteps(n);
    } else if (this.algorithm === 'bitwise') {
      this.generateBitwiseSteps(n);
    } else if (this.algorithm === 'bfs') {
      this.generateBFSSteps(n);
    }
  }

  // User's Exact Code Step Recorder: generateBinary(int n, String current)
  generateUserRecursiveSteps(n) {
    const steps = this.steps;
    const results = [];
    const stack = [];
    let callId = 0;

    const recurse = (current) => {
      const currentCallId = ++callId;
      const nodeId = current === '' ? 'root' : `node-${current}`;
      const slots = current.split('').concat(new Array(Math.max(0, n - current.length)).fill(null));

      // 1. Enter function
      stack.push({
        id: currentCallId,
        func: 'generateBinary',
        args: `n=${n}, current="${current}"`
      });

      steps.push({
        line: 1,
        nodeId: nodeId,
        path: current,
        slots: [...slots],
        activeSlot: current.length < n ? current.length : n - 1,
        stack: [...stack],
        results: [...results],
        phase: 'CALL_ENTER',
        narration: `Call frame <code>generateBinary(${n}, "${current}")</code> pushed onto Call Stack. Depth = <strong>${stack.length}</strong>.`
      });

      // 3. Base case check
      steps.push({
        line: 3,
        nodeId: nodeId,
        path: current,
        slots: [...slots],
        activeSlot: current.length < n ? current.length : n - 1,
        stack: [...stack],
        results: [...results],
        phase: 'BASE_CHECK',
        narration: `Evaluating base condition: <code>current.length() (${current.length}) == n (${n})</code> &rarr; <strong>${current.length === n ? 'TRUE' : 'FALSE'}</strong>.`
      });

      if (current.length === n) {
        // 4. System.out.println(current)
        results.push(current);
        steps.push({
          line: 4,
          nodeId: nodeId,
          path: current,
          slots: [...slots],
          activeSlot: n - 1,
          stack: [...stack],
          results: [...results],
          phase: 'LEAF_FOUND',
          narration: `Base case reached! <code>System.out.println("${current}")</code> &rarr; Output added to results list (#${parseInt(current, 2)}).`
        });

        // 5. return
        steps.push({
          line: 5,
          nodeId: nodeId,
          path: current,
          slots: [...slots],
          activeSlot: n - 1,
          stack: [...stack],
          results: [...results],
          phase: 'RETURN',
          narration: `Returning from leaf node <code>"${current}"</code> back to caller.`
        });

        stack.pop();
        return;
      }

      // 8. CHOICE 1: generateBinary(n, current + "0")
      steps.push({
        line: 8,
        nodeId: nodeId,
        path: current,
        edgeTo: current + '0',
        slots: [...slots],
        activeSlot: current.length,
        stack: [...stack],
        results: [...results],
        phase: 'CHOICE_0',
        narration: `<strong>Choice 1:</strong> Appending <code>'0'</code> &rarr; Calling <code>generateBinary(${n}, "${current + '0'}")</code>.`
      });

      recurse(current + '0');

      // Backtracking to choice 2
      steps.push({
        line: 8,
        nodeId: nodeId,
        path: current,
        slots: [...slots],
        activeSlot: current.length,
        stack: [...stack],
        results: [...results],
        phase: 'BACKTRACK_0',
        narration: `Completed left subtree (<strong>'0'</strong> branch). Returning to <code>generateBinary(${n}, "${current}")</code>.`
      });

      // 10. CHOICE 2: generateBinary(n, current + "1")
      steps.push({
        line: 10,
        nodeId: nodeId,
        path: current,
        edgeTo: current + '1',
        slots: [...slots],
        activeSlot: current.length,
        stack: [...stack],
        results: [...results],
        phase: 'CHOICE_1',
        narration: `<strong>Choice 2:</strong> Appending <code>'1'</code> &rarr; Calling <code>generateBinary(${n}, "${current + '1'}")</code>.`
      });

      recurse(current + '1');

      // 11. Function End
      steps.push({
        line: 11,
        nodeId: nodeId,
        path: current,
        slots: [...slots],
        activeSlot: current.length > 0 ? current.length - 1 : 0,
        stack: [...stack],
        results: [...results],
        phase: 'RETURN',
        narration: `Finished both <strong>'0'</strong> and <strong>'1'</strong> choices for prefix <code>"${current}"</code>. Popping call frame.`
      });

      stack.pop();
    };

    recurse('');

    steps.push({
      line: 11,
      nodeId: 'root',
      path: '',
      slots: new Array(n).fill(null),
      activeSlot: -1,
      stack: [],
      results: [...results],
      phase: 'COMPLETED',
      narration: `🎉 Execution Complete! All <strong>${results.length}</strong> binary strings of length ${n} printed.`
    });
  }

  generateBacktrackSteps(n) {
    const steps = this.steps;
    const currentSlots = new Array(n).fill(null);
    const results = [];
    const stack = [];
    let callId = 0;

    const recurse = (index, path) => {
      const currentCallId = ++callId;
      const nodeId = path === '' ? 'root' : `node-${path}`;

      stack.push({
        id: currentCallId,
        func: 'backtrack',
        args: `index=${index}, n=${n}, current="${currentSlots.map(c => c === null ? '_' : c).join('')}"`
      });

      steps.push({
        line: 5,
        nodeId: nodeId,
        path: path,
        slots: [...currentSlots],
        activeSlot: index < n ? index : n - 1,
        stack: [...stack],
        results: [...results],
        phase: 'CALL_ENTER',
        narration: `Entering <code>backtrack(index = ${index})</code>.`
      });

      steps.push({
        line: 6,
        nodeId: nodeId,
        path: path,
        slots: [...currentSlots],
        activeSlot: index < n ? index : n - 1,
        stack: [...stack],
        results: [...results],
        phase: 'BASE_CHECK',
        narration: `Checking <code>index (${index}) == n (${n})</code>.`
      });

      if (index === n) {
        const formed = currentSlots.join('');
        results.push(formed);

        steps.push({
          line: 7,
          nodeId: nodeId,
          path: path,
          slots: [...currentSlots],
          activeSlot: n - 1,
          stack: [...stack],
          results: [...results],
          phase: 'LEAF_FOUND',
          narration: `Base case met! String: <strong>"${formed}"</strong>.`
        });

        steps.push({
          line: 8,
          nodeId: nodeId,
          path: path,
          slots: [...currentSlots],
          activeSlot: n - 1,
          stack: [...stack],
          results: [...results],
          phase: 'RETURN',
          narration: `Returning from leaf.`
        });

        stack.pop();
        return;
      }

      // Choice 0
      currentSlots[index] = '0';
      steps.push({
        line: 10,
        nodeId: nodeId,
        path: path,
        slots: [...currentSlots],
        activeSlot: index,
        stack: [...stack],
        results: [...results],
        phase: 'CHOOSE_0',
        narration: `Setting <code>current[${index}] = '0'</code>.`
      });

      steps.push({
        line: 11,
        nodeId: nodeId,
        path: path,
        edgeTo: path + '0',
        slots: [...currentSlots],
        activeSlot: index + 1,
        stack: [...stack],
        results: [...results],
        phase: 'RECURSE_0',
        narration: `Calling <code>backtrack(${index + 1}, ${n}, current)</code>.`
      });

      recurse(index + 1, path + '0');

      // Choice 1
      currentSlots[index] = '1';
      steps.push({
        line: 12,
        nodeId: nodeId,
        path: path,
        slots: [...currentSlots],
        activeSlot: index,
        stack: [...stack],
        results: [...results],
        phase: 'CHOOSE_1',
        narration: `Backtracking & Setting <code>current[${index}] = '1'</code>.`
      });

      steps.push({
        line: 13,
        nodeId: nodeId,
        path: path,
        edgeTo: path + '1',
        slots: [...currentSlots],
        activeSlot: index + 1,
        stack: [...stack],
        results: [...results],
        phase: 'RECURSE_1',
        narration: `Calling <code>backtrack(${index + 1}, ${n}, current)</code>.`
      });

      recurse(index + 1, path + '1');

      stack.pop();
    };

    recurse(0, '');

    steps.push({
      line: 4,
      nodeId: 'root',
      path: '',
      slots: new Array(n).fill(null),
      activeSlot: -1,
      stack: [],
      results: [...results],
      phase: 'COMPLETED',
      narration: `🎉 Completed backtracking for N = ${n}.`
    });
  }

  generateBitwiseSteps(n) {
    const steps = this.steps;
    const results = [];
    const total = 1 << n;

    steps.push({
      line: 2,
      nodeId: 'root',
      path: '',
      slots: new Array(n).fill(null),
      activeSlot: -1,
      stack: [{ id: 1, func: 'generateBitwise', args: `n=${n}, total=${total}` }],
      results: [],
      phase: 'INITIALIZATION',
      narration: `Total combinations: <code>1 &lt;&lt; ${n} = ${total}</code>.`
    });

    for (let i = 0; i < total; i++) {
      const currentSlots = new Array(n).fill(null);

      for (let bit = n - 1; bit >= 0; bit--) {
        const isSet = (i & (1 << bit)) !== 0;
        const char = isSet ? '1' : '0';
        const slotIdx = (n - 1) - bit;
        currentSlots[slotIdx] = char;

        steps.push({
          line: 6,
          nodeId: `node-${currentSlots.slice(0, slotIdx + 1).join('')}`,
          path: currentSlots.slice(0, slotIdx + 1).join(''),
          slots: [...currentSlots],
          activeSlot: slotIdx,
          stack: [{ id: 1, func: 'generateBitwise', args: `i=${i}, bit=${bit}` }],
          results: [...results],
          phase: 'BIT_TEST',
          narration: `Bit ${bit} test: <code>(${i} &amp; (1 &lt;&lt; ${bit}))</code> &rarr; <strong>'${char}'</strong>.`
        });
      }

      const str = currentSlots.join('');
      results.push(str);

      steps.push({
        line: 8,
        nodeId: `node-${str}`,
        path: str,
        slots: [...currentSlots],
        activeSlot: n - 1,
        stack: [{ id: 1, func: 'generateBitwise', args: `i=${i}` }],
        results: [...results],
        phase: 'LEAF_FOUND',
        narration: `Printed string for <code>i = ${i}</code>: <strong style="color:#10b981;">"${str}"</strong>.`
      });
    }

    steps.push({
      line: 10,
      nodeId: 'root',
      path: '',
      slots: new Array(n).fill(null),
      activeSlot: -1,
      stack: [],
      results: [...results],
      phase: 'COMPLETED',
      narration: `🎉 Bitwise generation complete.`
    });
  }

  generateBFSSteps(n) {
    const steps = this.steps;
    const results = [];
    const queue = [''];

    steps.push({
      line: 2,
      nodeId: 'root',
      path: '',
      slots: new Array(n).fill(null),
      activeSlot: -1,
      stack: [{ id: 1, func: 'Queue', args: `[""]` }],
      results: [],
      phase: 'INITIALIZATION',
      narration: `Queue initialized with empty root.`
    });

    while (queue.length > 0) {
      const curr = queue.shift();
      const nodeId = curr === '' ? 'root' : `node-${curr}`;
      const slots = curr.split('').concat(new Array(Math.max(0, n - curr.length)).fill(null));

      steps.push({
        line: 5,
        nodeId: nodeId,
        path: curr,
        slots: slots,
        activeSlot: curr.length > 0 ? curr.length - 1 : 0,
        stack: [{ id: 1, func: 'Queue', args: `[${queue.map(s => `"${s}"`).join(', ')}]` }],
        results: [...results],
        phase: 'DEQUEUE',
        narration: `Polled <code>"${curr}"</code> from queue.`
      });

      if (curr.length === n) {
        results.push(curr);
        steps.push({
          line: 7,
          nodeId: nodeId,
          path: curr,
          slots: slots,
          activeSlot: n - 1,
          stack: [{ id: 1, func: 'Queue', args: `[${queue.map(s => `"${s}"`).join(', ')}]` }],
          results: [...results],
          phase: 'LEAF_FOUND',
          narration: `Found binary string <strong style="color:#10b981;">"${curr}"</strong>.`
        });
      } else {
        queue.push(curr + '0');
        queue.push(curr + '1');
        steps.push({
          line: 9,
          nodeId: nodeId,
          path: curr,
          slots: slots,
          activeSlot: curr.length,
          stack: [{ id: 1, func: 'Queue', args: `[${queue.map(s => `"${s}"`).join(', ')}]` }],
          results: [...results],
          phase: 'ENQUEUE',
          narration: `Enqueued <code>"${curr}0"</code> and <code>"${curr}1"</code>.`
        });
      }
    }

    steps.push({
      line: 13,
      nodeId: 'root',
      path: '',
      slots: new Array(n).fill(null),
      activeSlot: -1,
      stack: [],
      results: [...results],
      phase: 'COMPLETED',
      narration: `🎉 Queue traversal complete.`
    });
  }

  // ===========================================================================
  // SVG Tree Layout Generator & Dynamic Rendering
  // ===========================================================================
  buildTreeLayout() {
    const n = this.n;
    const nodes = [];
    const edges = [];

    const totalLeaves = 1 << n;
    const leafSpacing = Math.max(70, Math.min(140, 700 / totalLeaves));
    const totalWidth = totalLeaves * leafSpacing + 100;
    const levelHeight = 75;
    const totalHeight = (n + 1) * levelHeight + 80;

    this.treeBounds = { width: totalWidth, height: totalHeight };

    const positionNode = (depth, path, minX, maxX) => {
      const x = (minX + maxX) / 2;
      const y = 40 + depth * levelHeight;
      const id = path === '' ? 'root' : `node-${path}`;

      nodes.push({
        id: id,
        path: path,
        depth: depth,
        x: x,
        y: y,
        label: path === '' ? 'ε' : path[path.length - 1],
        fullStr: path,
        isLeaf: depth === n
      });

      if (depth < n) {
        // Left child ('0')
        const leftPath = path + '0';
        edges.push({
          id: `edge-${id}-0`,
          from: id,
          to: `node-${leftPath}`,
          fromPos: { x, y },
          toPos: { x: (minX + x) / 2, y: 40 + (depth + 1) * levelHeight },
          label: '0',
          branch: 'left'
        });
        positionNode(depth + 1, leftPath, minX, x);

        // Right child ('1')
        const rightPath = path + '1';
        edges.push({
          id: `edge-${id}-1`,
          from: id,
          to: `node-${rightPath}`,
          fromPos: { x, y },
          toPos: { x: (x + maxX) / 2, y: 40 + (depth + 1) * levelHeight },
          label: '1',
          branch: 'right'
        });
        positionNode(depth + 1, rightPath, x, maxX);
      }
    };

    positionNode(0, '', 50, totalWidth - 50);

    this.treeNodes = nodes;
    this.treeEdges = edges;
    this.renderTreeSvg();
    this.fitTreeToView();
  }

  renderTreeSvg() {
    const root = this.dom.treeRootGroup;
    root.innerHTML = '';

    // Render Edges
    this.treeEdges.forEach(edge => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'tree-edge-group');
      g.setAttribute('id', edge.id);

      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', edge.fromPos.x);
      line.setAttribute('y1', edge.fromPos.y);
      line.setAttribute('x2', edge.toPos.x);
      line.setAttribute('y2', edge.toPos.y);
      line.setAttribute('class', `tree-edge edge-${edge.branch}`);
      line.setAttribute('id', `line-${edge.id}`);
      g.appendChild(line);

      const midX = (edge.fromPos.x + edge.toPos.x) / 2 + (edge.branch === 'left' ? -10 : 10);
      const midY = (edge.fromPos.y + edge.toPos.y) / 2;
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', midX);
      text.setAttribute('y', midY);
      text.setAttribute('class', 'edge-label-text');
      text.setAttribute('text-anchor', 'middle');
      text.textContent = edge.label;
      g.appendChild(text);

      root.appendChild(g);
    });

    // Render Nodes
    this.treeNodes.forEach(node => {
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute('class', 'tree-node-group');
      g.setAttribute('id', `group-${node.id}`);
      g.setAttribute('transform', `translate(${node.x}, ${node.y})`);

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('r', node.isLeaf ? 16 : 14);
      circle.setAttribute('class', `node-circle ${node.isLeaf ? 'is-leaf' : ''}`);
      circle.setAttribute('id', `circle-${node.id}`);
      g.appendChild(circle);

      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('class', 'node-text');
      text.textContent = node.label;
      g.appendChild(text);

      const title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
      title.textContent = `Depth: ${node.depth}\nPath: "${node.fullStr || 'ε'}"`;
      g.appendChild(title);

      root.appendChild(g);
    });
  }

  // ===========================================================================
  // Step Application & Synchronization
  // ===========================================================================
  applyStep(stepIdx) {
    if (!this.steps || this.steps.length === 0) return;
    const step = this.steps[stepIdx];
    this.currentStepIdx = stepIdx;

    // 1. Progress Counters
    this.dom.currentStepNum.textContent = stepIdx + 1;
    this.dom.totalStepsNum.textContent = this.steps.length;
    const progressPct = ((stepIdx + 1) / this.steps.length) * 100;
    this.dom.progressBarFill.style.width = `${progressPct}%`;

    // 2. Narration Box
    this.dom.narrationPhase.textContent = step.phase.replace('_', ' ');
    this.dom.narrationDetail.innerHTML = step.narration;

    // 3. Highlight Java Code Line
    this.highlightCodeLine(step.line);

    // 4. Memory Bit Slots
    this.updateBitSlots(step.slots, step.activeSlot);

    // 5. Call Stack
    this.updateCallStack(step.stack);

    // 6. Results
    this.updateResultsGrid(step.results);

    // 7. Tree Node Highlights
    this.updateTreeHighlight(step);

    // 8. Navigation Buttons
    this.dom.btnPrev.disabled = stepIdx === 0;
    this.dom.btnNext.disabled = stepIdx === this.steps.length - 1;

    if (stepIdx === this.steps.length - 1 && this.isPlaying) {
      this.pause();
    }
  }

  updateTreeHighlight(step) {
    const allCircles = this.dom.treeRootGroup.querySelectorAll('.node-circle');
    allCircles.forEach(c => c.classList.remove('node-active', 'node-backtrack'));

    const allLines = this.dom.treeRootGroup.querySelectorAll('.tree-edge');
    allLines.forEach(l => l.classList.remove('edge-active'));

    const visitedSet = new Set();
    const leafSet = new Set();
    for (let i = 0; i <= this.currentStepIdx; i++) {
      const s = this.steps[i];
      if (s.nodeId) visitedSet.add(s.nodeId);
      if (s.phase === 'LEAF_FOUND' && s.nodeId) leafSet.add(s.nodeId);
    }

    visitedSet.forEach(id => {
      const circle = document.getElementById(`circle-${id}`);
      if (circle) circle.classList.add('node-visited');
    });

    leafSet.forEach(id => {
      const circle = document.getElementById(`circle-${id}`);
      if (circle) circle.classList.add('node-leaf');
    });

    if (step.nodeId) {
      const activeCircle = document.getElementById(`circle-${step.nodeId}`);
      if (activeCircle) {
        if (step.phase.startsWith('BACKTRACK')) {
          activeCircle.classList.add('node-backtrack');
        } else {
          activeCircle.classList.add('node-active');
        }
      }
    }

    if (step.edgeTo) {
      const targetEdge = this.treeEdges.find(e => e.from === step.nodeId && e.to === `node-${step.edgeTo}`);
      if (targetEdge) {
        const line = document.getElementById(`line-${targetEdge.id}`);
        if (line) line.classList.add('edge-active');
      }
    }
  }

  updateBitSlots(slots, activeSlot) {
    const container = this.dom.bitSlotsContainer;
    container.innerHTML = '';

    slots.forEach((val, idx) => {
      const slotEl = document.createElement('div');
      slotEl.className = `bit-slot ${idx === activeSlot ? 'active' : ''} ${val === '0' ? 'filled-0' : val === '1' ? 'filled-1' : ''}`;

      const box = document.createElement('div');
      box.className = 'slot-box';
      box.textContent = val !== null ? val : '_';
      slotEl.appendChild(box);

      const label = document.createElement('div');
      label.className = 'slot-idx';
      label.textContent = `[${idx}]`;
      slotEl.appendChild(label);

      container.appendChild(slotEl);
    });

    const formedStr = slots.map(v => v !== null ? v : '_').join('');
    this.dom.currentFormedStr.innerHTML = `String: <code>"${formedStr}"</code>`;
  }

  updateCallStack(stack) {
    const container = this.dom.stackContainer;
    container.innerHTML = '';
    this.dom.stackDepthBadge.textContent = `Depth: ${stack.length} / ${this.n + 1}`;

    if (!stack || stack.length === 0) {
      container.innerHTML = '<div class="empty-stack-msg">Stack is idle.</div>';
      return;
    }

    stack.forEach((frame, idx) => {
      const isTop = idx === stack.length - 1;
      const el = document.createElement('div');
      el.className = `stack-frame ${isTop ? 'top-frame' : ''}`;
      el.innerHTML = `
        <span class="frame-func">${frame.func}</span>
        <span class="frame-args">${frame.args}</span>
      `;
      container.appendChild(el);
    });
  }

  updateResultsGrid(results) {
    const grid = this.dom.resultsGrid;
    grid.innerHTML = '';
    const totalExpected = 1 << this.n;
    this.dom.resultsCountTag.textContent = `${results.length} / ${totalExpected}`;

    results.forEach((str) => {
      const badge = document.createElement('div');
      badge.className = 'result-badge';
      const dec = parseInt(str, 2);
      badge.innerHTML = `<span>${str}</span> <span class="dec-val">#${dec}</span>`;
      grid.appendChild(badge);
    });
  }

  highlightCodeLine(lineNum) {
    this.dom.activeLineBadge.textContent = `Line ${lineNum}`;
    const lines = this.dom.javaCodeBlock.querySelectorAll('.code-line');
    lines.forEach(l => {
      const num = parseInt(l.getAttribute('data-line'), 10);
      if (num === lineNum) {
        l.classList.add('active-line');
        l.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        l.classList.remove('active-line');
      }
    });
  }

  renderJavaCodePanel() {
    const lines = JAVA_SNIPPETS[this.algorithm] || JAVA_SNIPPETS.recursive;
    const block = this.dom.javaCodeBlock;
    block.innerHTML = '';

    lines.forEach(line => {
      const row = document.createElement('div');
      row.className = 'code-line';
      row.setAttribute('data-line', line.num);

      const numEl = document.createElement('span');
      numEl.className = 'code-line-num';
      numEl.textContent = line.num;
      row.appendChild(numEl);

      const contentEl = document.createElement('span');
      contentEl.className = 'code-line-content';
      contentEl.innerHTML = this.syntaxHighlight(line.text);
      row.appendChild(contentEl);

      block.appendChild(row);
    });
  }

  syntaxHighlight(text) {
    // 1. Escape HTML special characters
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 2. Single-pass regex token matching to prevent re-matching injected HTML spans
    const tokenRegex = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b(?:public|private|static|void|int|char|boolean|new|return|if|else|for|while)\b)|(\b(?:String|StringBuilder|Queue|LinkedList|System|Scanner)\b)|(\b(?:generateBinary|backtrack|generate|println|append|offer|poll|length)\b)/g;

    return escaped.replace(tokenRegex, (match, comment, str, kw, type, method) => {
      if (comment) return `<span class="syn-comment">${comment}</span>`;
      if (str) return `<span class="syn-string">${str}</span>`;
      if (kw) return `<span class="syn-keyword">${kw}</span>`;
      if (type) return `<span class="syn-type">${type}</span>`;
      if (method) return `<span class="syn-method">${method}</span>`;
      return match;
    });
  }

  renderFullJavaSnippet(key) {
    const snippet = FULL_JAVA_SNIPPETS[key] || FULL_JAVA_SNIPPETS['java-user-recursive'];
    this.dom.fullJavaSnippet.textContent = snippet;
  }

  // ===========================================================================
  // Viewport Zoom & Pan
  // ===========================================================================
  updateTransform() {
    this.dom.treeRootGroup.setAttribute(
      'transform',
      `translate(${this.panX}, ${this.panY}) scale(${this.zoom})`
    );
  }

  fitTreeToView() {
    if (!this.treeBounds) return;
    const container = this.dom.treeContainer;
    const cw = container.clientWidth || 600;
    const ch = container.clientHeight || 400;

    const scaleX = (cw - 60) / this.treeBounds.width;
    const scaleY = (ch - 60) / this.treeBounds.height;
    this.zoom = Math.min(1.2, Math.max(0.4, Math.min(scaleX, scaleY)));

    this.panX = (cw - this.treeBounds.width * this.zoom) / 2;
    this.panY = 20;
    this.updateTransform();
  }

  // ===========================================================================
  // Playback Control Methods
  // ===========================================================================
  play() {
    if (this.currentStepIdx >= this.steps.length - 1) {
      this.currentStepIdx = 0;
    }
    this.isPlaying = true;
    this.dom.playIcon.style.display = 'none';
    this.dom.pauseIcon.style.display = 'inline';
    this.dom.playBtnText.textContent = 'Pause';
    this.tick();
  }

  pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.dom.playIcon.style.display = 'inline';
    this.dom.pauseIcon.style.display = 'none';
    this.dom.playBtnText.textContent = 'Play';
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  tick() {
    if (!this.isPlaying) return;
    if (this.currentStepIdx < this.steps.length - 1) {
      this.applyStep(this.currentStepIdx + 1);
      const delay = Math.max(100, 700 / this.speed);
      this.timer = setTimeout(() => this.tick(), delay);
    } else {
      this.pause();
    }
  }

  stepForward() {
    this.pause();
    if (this.currentStepIdx < this.steps.length - 1) {
      this.applyStep(this.currentStepIdx + 1);
    }
  }

  stepBackward() {
    this.pause();
    if (this.currentStepIdx > 0) {
      this.applyStep(this.currentStepIdx - 1);
    }
  }

  resetSimulation() {
    this.pause();
    this.generateSteps();
    this.buildTreeLayout();
    this.applyStep(0);
  }

  // ===========================================================================
  // Event Listeners
  // ===========================================================================
  bindEvents() {
    // 1. Algo selection
    this.dom.algoSelect.addEventListener('change', (e) => {
      this.algorithm = e.target.value;
      this.renderJavaCodePanel();
      if (this.algorithm === 'recursive') {
        this.dom.memoryTypeLabel.textContent = 'String current = current + "0" / "1"';
      } else if (this.algorithm === 'backtrack') {
        this.dom.memoryTypeLabel.textContent = 'char[] current = new char[N]';
      } else if (this.algorithm === 'bitwise') {
        this.dom.memoryTypeLabel.textContent = 'Bitwise mask: (i & (1 << bit))';
      } else {
        this.dom.memoryTypeLabel.textContent = 'Queue<String> level elements';
      }
      this.resetSimulation();
    });

    // 2. N input slider
    this.dom.nInput.addEventListener('input', (e) => {
      this.n = parseInt(e.target.value, 10);
      this.dom.nValueDisplay.textContent = this.n;
      const count = 1 << this.n;
      this.dom.nHint.textContent = `Generates ${count} strings`;
      this.dom.totalStringsStat.innerHTML = `2<sup>${this.n}</sup> = ${count}`;
      this.resetSimulation();
    });

    // 3. Playback buttons
    this.dom.btnPlay.addEventListener('click', () => this.togglePlay());
    this.dom.btnNext.addEventListener('click', () => this.stepForward());
    this.dom.btnPrev.addEventListener('click', () => this.stepBackward());
    this.dom.btnReset.addEventListener('click', () => this.resetSimulation());

    // 4. Speed slider
    this.dom.speedSlider.addEventListener('input', (e) => {
      this.speed = parseFloat(e.target.value);
      this.dom.speedLabel.textContent = `${this.speed.toFixed(2)}x`;
    });

    // 5. Tree Zoom / Pan buttons
    this.dom.btnZoomIn.addEventListener('click', () => {
      this.zoom = Math.min(2.5, this.zoom * 1.25);
      this.updateTransform();
    });

    this.dom.btnZoomOut.addEventListener('click', () => {
      this.zoom = Math.max(0.3, this.zoom / 1.25);
      this.updateTransform();
    });

    this.dom.btnFitTree.addEventListener('click', () => this.fitTreeToView());

    // 6. Tree dragging & mouse wheel
    const container = this.dom.treeContainer;
    container.addEventListener('mousedown', (e) => {
      this.isPanning = true;
      this.startX = e.clientX - this.panX;
      this.startY = e.clientY - this.panY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isPanning) return;
      this.panX = e.clientX - this.startX;
      this.panY = e.clientY - this.startY;
      this.updateTransform();
    });

    window.addEventListener('mouseup', () => {
      this.isPanning = false;
    });

    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
      this.zoom = Math.min(2.5, Math.max(0.3, this.zoom * zoomFactor));
      this.updateTransform();
    }, { passive: false });

    // 7. Copy results
    this.dom.btnCopyResults.addEventListener('click', () => {
      const step = this.steps[this.currentStepIdx];
      const results = step.results || [];
      if (results.length === 0) {
        alert('No binary strings generated yet!');
        return;
      }
      navigator.clipboard.writeText(results.join('\n')).then(() => {
        const originalText = this.dom.btnCopyResults.innerHTML;
        this.dom.btnCopyResults.innerHTML = `✓ Copied!`;
        setTimeout(() => {
          this.dom.btnCopyResults.innerHTML = originalText;
        }, 1500);
      });
    });

    // 8. Theory Tabs
    document.querySelectorAll('.theory-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.theory-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-tab');
        const pane = document.getElementById(`pane-${target}`);
        if (pane) pane.classList.add('active');
      });
    });

    // 9. Java Code Subtabs
    document.querySelectorAll('.code-subtab').forEach(subtab => {
      subtab.addEventListener('click', () => {
        document.querySelectorAll('.code-subtab').forEach(s => s.classList.remove('active'));
        subtab.classList.add('active');
        const subcode = subtab.getAttribute('data-subcode');
        this.renderFullJavaSnippet(subcode);
      });
    });

    // 10. Keyboard Navigation
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        this.togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        this.stepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        this.stepBackward();
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        this.resetSimulation();
      }
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.fitTreeToView();
    });
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.visualizer = new VisualizerEngine();
});
