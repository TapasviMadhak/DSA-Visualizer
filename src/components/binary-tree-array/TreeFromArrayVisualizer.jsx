import React, { useState, useEffect, useRef } from 'react';
import PlaybackControls from '../common/PlaybackControls';
import NarrationBar from '../common/NarrationBar';
import CallStack from '../common/CallStack';
import JavaCodeViewer from '../common/JavaCodeViewer';
import ArrayMemoryView from './ArrayMemoryView';
import BinaryTreeCanvas from './BinaryTreeCanvas';
import InorderStream from './InorderStream';
import NodeInspector from './NodeInspector';
import TreeTheory from './TreeTheory';

const JAVA_CONSTRUCT_SNIPPET = [
  { num: 1, text: 'public static Node constructTree(int[] arr, int index) {' },
  { num: 2, text: '    if (index >= arr.length) {' },
  { num: 3, text: '        return null;' },
  { num: 4, text: '    }' },
  { num: 5, text: '    Node root = new Node(arr[index]);' },
  { num: 6, text: '    // Left child index: 2 * i + 1' },
  { num: 7, text: '    root.left = constructTree(arr, 2 * index + 1);' },
  { num: 8, text: '    // Right child index: 2 * i + 2' },
  { num: 9, text: '    root.right = constructTree(arr, 2 * index + 2);' },
  { num: 10, text: '    return root;' },
  { num: 11, text: '}' }
];

const JAVA_INORDER_SNIPPET = [
  { num: 1, text: 'public static void inOrder(Node root) {' },
  { num: 2, text: '    if (root == null) {' },
  { num: 3, text: '        return;' },
  { num: 4, text: '    }' },
  { num: 5, text: '    // 1. Traverse left subtree' },
  { num: 6, text: '    inOrder(root.left);' },
  { num: 7, text: '    // 2. Visit current root' },
  { num: 8, text: '    System.out.print(root.data + " ");' },
  { num: 9, text: '    // 3. Traverse right subtree' },
  { num: 10, text: '    inOrder(root.right);' },
  { num: 11, text: '}' }
];

const PRESETS = {
  'standard-7': [1, 2, 3, 4, 5, 6, 7],
  'nodes-6': [10, 20, 30, 40, 50, 60],
  'small-5': [5, 3, 8, 1, 9],
  'custom-9': [9, 4, 7, 1, 3, 6, 8, 2, 5]
};

function calculateTreeLayout(arr) {
  const nodes = [];
  const edges = [];
  const n = arr.length;
  if (n === 0) return { nodes, edges };

  const maxDepth = Math.floor(Math.log2(n));
  const totalLeaves = 1 << maxDepth;
  const totalWidth = Math.max(500, totalLeaves * 85 + 100);
  const levelHeight = 72;

  const positionNode = (i, depth, minX, maxX) => {
    if (i >= n) return;
    const x = (minX + maxX) / 2;
    const y = 35 + depth * levelHeight;

    nodes.push({
      idx: i,
      val: arr[i],
      depth,
      x,
      y
    });

    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;

    if (leftIdx < n) {
      edges.push({
        id: `edge-${i}-${leftIdx}`,
        fromIdx: i,
        toIdx: leftIdx,
        fromPos: { x, y },
        toPos: { x: (minX + x) / 2, y: 35 + (depth + 1) * levelHeight },
        branch: 'left'
      });
      positionNode(leftIdx, depth + 1, minX, x);
    }

    if (rightIdx < n) {
      edges.push({
        id: `edge-${i}-${rightIdx}`,
        fromIdx: i,
        toIdx: rightIdx,
        fromPos: { x, y },
        toPos: { x: (x + maxX) / 2, y: 35 + (depth + 1) * levelHeight },
        branch: 'right'
      });
      positionNode(rightIdx, depth + 1, x, maxX);
    }
  };

  positionNode(0, 0, 30, totalWidth - 30);
  return { nodes, edges };
}

function generateExecutionSteps(arr, mode) {
  const steps = [];
  const n = arr.length;
  if (n === 0) return steps;

  const visibleNodes = new Set();
  const visibleEdges = new Set();
  const processedIndices = new Set();
  const inorderStream = [];
  const inorderVisitedSet = new Set();
  const stack = [];
  let callId = 0;

  // Initial Step
  steps.push({
    phase: 'INITIALIZATION',
    codeType: 'construct',
    line: 1,
    activeRootIdx: 0,
    activeLeftIdx: 1 < n ? 1 : -1,
    activeRightIdx: 2 < n ? 2 : -1,
    visibleNodes: new Set(visibleNodes),
    visibleEdges: new Set(visibleEdges),
    processedIndices: new Set(processedIndices),
    inorderStream: [...inorderStream],
    inorderVisitedSet: new Set(inorderVisitedSet),
    stack: [{ id: 0, func: 'main', args: `arr.length=${n}` }],
    narration: `Ready to construct Binary Tree from array of ${n} elements. Click <strong>Play</strong> or <strong>Step Forward</strong> to watch the recursion.`
  });

  // Phase 1: Construction Steps
  if (mode === 'all' || mode === 'construct') {
    const build = (index, parentIdx, branch) => {
      const currentCallId = ++callId;
      const leftIdx = 2 * index + 1;
      const rightIdx = 2 * index + 2;

      stack.push({
        id: currentCallId,
        func: 'constructTree',
        args: `arr, index=${index}`
      });

      steps.push({
        phase: 'CALL_ENTER',
        codeType: 'construct',
        line: 1,
        activeRootIdx: index < n ? index : parentIdx,
        activeLeftIdx: leftIdx < n ? leftIdx : -1,
        activeRightIdx: rightIdx < n ? rightIdx : -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Entering <code>constructTree(arr, index = ${index})</code>.`
      });

      steps.push({
        phase: 'BASE_CHECK',
        codeType: 'construct',
        line: 2,
        activeRootIdx: index < n ? index : parentIdx,
        activeLeftIdx: leftIdx < n ? leftIdx : -1,
        activeRightIdx: rightIdx < n ? rightIdx : -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Evaluating: <code>index (${index}) >= arr.length (${n})</code> &rarr; <strong>${index >= n ? 'TRUE (Index Out of Bounds)' : 'FALSE'}</strong>.`
      });

      if (index >= n) {
        steps.push({
          phase: 'RETURN_NULL',
          codeType: 'construct',
          line: 3,
          activeRootIdx: parentIdx,
          activeLeftIdx: -1,
          activeRightIdx: -1,
          visibleNodes: new Set(visibleNodes),
          visibleEdges: new Set(visibleEdges),
          processedIndices: new Set(processedIndices),
          inorderStream: [...inorderStream],
          inorderVisitedSet: new Set(inorderVisitedSet),
          stack: [...stack],
          narration: `Index <code>${index} &gt;= ${n}</code> &rarr; Returning <code>null</code> pointer.`
        });
        stack.pop();
        return;
      }

      // Create Node
      visibleNodes.add(index);
      processedIndices.add(index);
      if (parentIdx !== null) {
        visibleEdges.add(`edge-${parentIdx}-${index}`);
      }

      steps.push({
        phase: 'CREATE_NODE',
        codeType: 'construct',
        line: 5,
        activeRootIdx: index,
        activeLeftIdx: leftIdx < n ? leftIdx : -1,
        activeRightIdx: rightIdx < n ? rightIdx : -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Instantiated <code>Node root = new Node(arr[${index}])</code> with value <strong style="color:var(--accent-cyan);">${arr[index]}</strong>.`
      });

      // Recurse Left
      steps.push({
        phase: 'RECURSE_LEFT',
        codeType: 'construct',
        line: 7,
        activeRootIdx: index,
        activeLeftIdx: leftIdx,
        activeRightIdx: rightIdx < n ? rightIdx : -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Left child formula: <code>2 * ${index} + 1 = ${leftIdx}</code>. Calling <code>constructTree(arr, ${leftIdx})</code>.`
      });

      build(leftIdx, index, 'left');

      // Recurse Right
      steps.push({
        phase: 'RECURSE_RIGHT',
        codeType: 'construct',
        line: 9,
        activeRootIdx: index,
        activeLeftIdx: leftIdx < n ? leftIdx : -1,
        activeRightIdx: rightIdx,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Right child formula: <code>2 * ${index} + 2 = ${rightIdx}</code>. Calling <code>constructTree(arr, ${rightIdx})</code>.`
      });

      build(rightIdx, index, 'right');

      // Return node
      steps.push({
        phase: 'RETURN_NODE',
        codeType: 'construct',
        line: 10,
        activeRootIdx: index,
        activeLeftIdx: leftIdx < n ? leftIdx : -1,
        activeRightIdx: rightIdx < n ? rightIdx : -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Subtrees for Node(<strong>${arr[index]}</strong>) completed. Returning <code>root</code> reference.`
      });

      stack.pop();
    };

    build(0, null, null);
  } else {
    for (let i = 0; i < n; i++) visibleNodes.add(i);
    for (let i = 0; i < n; i++) {
      if (2 * i + 1 < n) visibleEdges.add(`edge-${i}-${2 * i + 1}`);
      if (2 * i + 2 < n) visibleEdges.add(`edge-${i}-${2 * i + 2}`);
    }
  }

  // Phase 2: Inorder Traversal
  if (mode === 'all' || mode === 'inorder') {
    steps.push({
      phase: 'INORDER_START',
      codeType: 'inorder',
      line: 1,
      activeRootIdx: 0,
      activeLeftIdx: -1,
      activeRightIdx: -1,
      visibleNodes: new Set(visibleNodes),
      visibleEdges: new Set(visibleEdges),
      processedIndices: new Set(processedIndices),
      inorderStream: [...inorderStream],
      inorderVisitedSet: new Set(inorderVisitedSet),
      stack: [{ id: ++callId, func: 'main', args: `inOrder(root)` }],
      narration: `🚀 Starting <strong>Inorder Traversal</strong> (Left &rarr; Root &rarr; Right) from Root Node(<strong>${arr[0]}</strong>).`
    });

    const traverseInorder = (index) => {
      const currentCallId = ++callId;
      stack.push({
        id: currentCallId,
        func: 'inOrder',
        args: `root=${index < n ? `Node(${arr[index]})` : 'null'}`
      });

      steps.push({
        phase: 'INORDER_ENTER',
        codeType: 'inorder',
        line: 1,
        activeRootIdx: index < n ? index : -1,
        activeLeftIdx: -1,
        activeRightIdx: -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Entering <code>inOrder(${index < n ? `Node(${arr[index]})` : 'null'})</code>.`
      });

      steps.push({
        phase: 'INORDER_CHECK',
        codeType: 'inorder',
        line: 2,
        activeRootIdx: index < n ? index : -1,
        activeLeftIdx: -1,
        activeRightIdx: -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Checking: <code>root == null</code> &rarr; <strong>${index >= n ? 'TRUE (null)' : 'FALSE'}</strong>.`
      });

      if (index >= n) {
        steps.push({
          phase: 'INORDER_RETURN_NULL',
          codeType: 'inorder',
          line: 3,
          activeRootIdx: -1,
          activeLeftIdx: -1,
          activeRightIdx: -1,
          visibleNodes: new Set(visibleNodes),
          visibleEdges: new Set(visibleEdges),
          processedIndices: new Set(processedIndices),
          inorderStream: [...inorderStream],
          inorderVisitedSet: new Set(inorderVisitedSet),
          stack: [...stack],
          narration: `Reached <code>null</code> &rarr; returning.`
        });
        stack.pop();
        return;
      }

      // Left
      const leftIdx = 2 * index + 1;
      steps.push({
        phase: 'INORDER_LEFT',
        codeType: 'inorder',
        line: 6,
        activeRootIdx: index,
        activeLeftIdx: leftIdx < n ? leftIdx : -1,
        activeRightIdx: -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Node(<strong>${arr[index]}</strong>): Traversing Left Subtree first &rarr; calling <code>inOrder(root.left)</code>.`
      });
      traverseInorder(leftIdx);

      // Visit
      inorderVisitedSet.add(index);
      inorderStream.push({ idx: index, val: arr[index] });

      steps.push({
        phase: 'INORDER_VISIT',
        codeType: 'inorder',
        line: 8,
        activeRootIdx: index,
        activeLeftIdx: -1,
        activeRightIdx: -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `🎯 <strong>Visited Node(${arr[index]}):</strong> <code>System.out.print(${arr[index]} + " ")</code> &rarr; Appended to stream.`
      });

      // Right
      const rightIdx = 2 * index + 2;
      steps.push({
        phase: 'INORDER_RIGHT',
        codeType: 'inorder',
        line: 10,
        activeRootIdx: index,
        activeLeftIdx: -1,
        activeRightIdx: rightIdx < n ? rightIdx : -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Node(<strong>${arr[index]}</strong>): Traversing Right Subtree &rarr; calling <code>inOrder(root.right)</code>.`
      });
      traverseInorder(rightIdx);

      // Exit
      steps.push({
        phase: 'INORDER_RETURN',
        codeType: 'inorder',
        line: 11,
        activeRootIdx: index,
        activeLeftIdx: -1,
        activeRightIdx: -1,
        visibleNodes: new Set(visibleNodes),
        visibleEdges: new Set(visibleEdges),
        processedIndices: new Set(processedIndices),
        inorderStream: [...inorderStream],
        inorderVisitedSet: new Set(inorderVisitedSet),
        stack: [...stack],
        narration: `Finished left, root, and right subtrees for Node(<strong>${arr[index]}</strong>). Popping frame.`
      });

      stack.pop();
    };

    traverseInorder(0);
  }

  steps.push({
    phase: 'COMPLETED',
    codeType: mode === 'inorder' ? 'inorder' : 'construct',
    line: mode === 'inorder' ? 11 : 10,
    activeRootIdx: -1,
    activeLeftIdx: -1,
    activeRightIdx: -1,
    visibleNodes: new Set(visibleNodes),
    visibleEdges: new Set(visibleEdges),
    processedIndices: new Set(processedIndices),
    inorderStream: [...inorderStream],
    inorderVisitedSet: new Set(inorderVisitedSet),
    stack: [],
    narration: `🎉 Execution Completed! Inorder Traversal sequence: <strong>[${inorderStream.map(s => s.val).join(', ')}]</strong>.`
  });

  return steps;
}

export default function TreeFromArrayVisualizer() {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7]);
  const [customInput, setCustomInput] = useState('1, 2, 3, 4, 5, 6, 7');
  const [mode, setMode] = useState('all');
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [selectedNode, setSelectedNode] = useState(null);
  const timerRef = useRef(null);

  const treeLayout = calculateTreeLayout(arr);
  const steps = generateExecutionSteps(arr, mode);
  const currentStep = steps[stepIdx] || steps[0];

  useEffect(() => {
    setStepIdx(0);
    setIsPlaying(false);
    setSelectedNode(null);
  }, [arr, mode]);

  useEffect(() => {
    if (!isPlaying) return;
    if (stepIdx < steps.length - 1) {
      const delay = Math.max(100, 700 / speed);
      timerRef.current = setTimeout(() => {
        setStepIdx((prev) => prev + 1);
      }, delay);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, stepIdx, speed, steps.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setIsPlaying(false);
        setStepIdx((i) => Math.min(steps.length - 1, i + 1));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        setStepIdx((i) => Math.max(0, i - 1));
      } else if (e.code === 'KeyR') {
        e.preventDefault();
        setIsPlaying(false);
        setStepIdx(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [steps.length]);

  const handleApplyCustom = (e) => {
    e.preventDefault();
    const parsed = customInput
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n));

    if (parsed.length === 0) {
      alert('Please enter valid comma-separated integers.');
      return;
    }
    if (parsed.length > 15) {
      alert('For clean visual representation, maximum recommended array length is 15.');
      return;
    }
    setArr(parsed);
  };

  const handleSelectPreset = (key) => {
    const preset = PRESETS[key];
    if (preset) {
      setArr(preset);
      setCustomInput(preset.join(', '));
    }
  };

  const customControls = (
    <>
      <div className="control-group">
        <label className="control-label">Pipeline Mode</label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="custom-select"
        >
          <option value="all">1. Full Pipeline (Build + Inorder)</option>
          <option value="construct">2. Phase 1: Construction Only</option>
          <option value="inorder">3. Phase 2: Inorder Only</option>
        </select>
      </div>

      <div className="control-group">
        <label className="control-label">Presets</label>
        <select
          onChange={(e) => handleSelectPreset(e.target.value)}
          defaultValue="standard-7"
          className="custom-select"
        >
          <option value="standard-7">[1, 2, 3, 4, 5, 6, 7] (3 Levels)</option>
          <option value="nodes-6">[10, 20, 30, 40, 50, 60] (6 Nodes)</option>
          <option value="small-5">[5, 3, 8, 1, 9] (5 Nodes)</option>
          <option value="custom-9">[9, 4, 7, 1, 3, 6, 8, 2, 5] (9 Nodes)</option>
        </select>
      </div>

      <form onSubmit={handleApplyCustom} className="control-group" style={{ minWidth: 160 }}>
        <label className="control-label">Custom Array</label>
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            className="custom-input"
            style={{ width: 110 }}
            placeholder="1, 2, 3..."
          />
          <button type="submit" className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem' }}>
            Set
          </button>
        </div>
      </form>
    </>
  );

  const inspectedIdx = selectedNode !== null ? selectedNode.idx : currentStep.activeRootIdx;

  return (
    <div>
      <PlaybackControls
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((p) => !p)}
        onNext={() => { setIsPlaying(false); setStepIdx((i) => Math.min(steps.length - 1, i + 1)); }}
        onPrev={() => { setIsPlaying(false); setStepIdx((i) => Math.max(0, i - 1)); }}
        onReset={() => { setIsPlaying(false); setStepIdx(0); }}
        onStepChange={(step) => { setIsPlaying(false); setStepIdx(step); }}
        speed={speed}
        onSpeedChange={setSpeed}
        currentStep={stepIdx}
        totalSteps={steps.length}
        customControls={customControls}
      />

      <NarrationBar
        phase={currentStep.phase}
        narration={currentStep.narration}
        icon={currentStep.codeType === 'inorder' ? '🔄' : '🌲'}
      />

      <main className="visualizer-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <BinaryTreeCanvas
            arr={arr}
            treeNodes={treeLayout.nodes}
            treeEdges={treeLayout.edges}
            visibleNodeIds={currentStep.visibleNodes}
            visibleEdgeIds={currentStep.visibleEdges}
            activeNodeIdx={currentStep.activeRootIdx}
            visitedInorderIndices={currentStep.inorderVisitedSet}
            activePhase={currentStep.codeType === 'inorder' ? 'INORDER' : 'BUILD'}
            onSelectNode={(node) => setSelectedNode(node)}
          />

          <ArrayMemoryView
            arr={arr}
            activeRootIdx={currentStep.activeRootIdx}
            activeLeftIdx={currentStep.activeLeftIdx}
            activeRightIdx={currentStep.activeRightIdx}
            processedIndices={currentStep.processedIndices}
          />

          <InorderStream
            stream={currentStep.inorderStream}
            expectedTotal={arr.length}
          />
        </div>

        <aside className="sidebar-column">
          <JavaCodeViewer
            lines={currentStep.codeType === 'inorder' ? JAVA_INORDER_SNIPPET : JAVA_CONSTRUCT_SNIPPET}
            activeLine={currentStep.line}
            title={currentStep.codeType === 'inorder' ? 'inOrder(Node root)' : 'constructTree(int[] arr, int index)'}
          />

          <CallStack stack={currentStep.stack} maxDepth={Math.floor(Math.log2(arr.length)) + 2} />

          <NodeInspector arr={arr} activeIdx={inspectedIdx} />
        </aside>
      </main>

      <TreeTheory />
    </div>
  );
}
