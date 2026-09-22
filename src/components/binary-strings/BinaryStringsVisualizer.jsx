import React, { useState, useEffect, useRef } from 'react';
import PlaybackControls from '../common/PlaybackControls';
import NarrationBar from '../common/NarrationBar';
import CallStack from '../common/CallStack';
import JavaCodeViewer from '../common/JavaCodeViewer';
import BinaryStringsTree from './BinaryStringsTree';
import BitSlots from './BitSlots';

const JAVA_SNIPPETS = {
  recursive: [
    { num: 1, text: 'public static void generateBinary(int n, String current) {' },
    { num: 2, text: '    // 1. Base Case: The string has reached length N' },
    { num: 3, text: '    if (current.length() == n) {' },
    { num: 4, text: '        System.out.println(current);' },
    { num: 5, text: '        return;' },
    { num: 6, text: '    }' },
    { num: 7, text: "    // --- CHOICE 1: Place '0' at current position ---" },
    { num: 8, text: '    generateBinary(n, current + "0");' },
    { num: 9, text: "    // --- CHOICE 2: Place '1' at current position ---" },
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
    { num: 10, text: "    current[index] = '0';" },
    { num: 11, text: '    backtrack(index + 1, n, current);' },
    { num: 12, text: "    current[index] = '1';" },
    { num: 13, text: '    backtrack(index + 1, n, current);' },
    { num: 14, text: '}' }
  ]
};

function buildBinaryTreeLayout(n) {
  const nodes = [];
  const edges = [];
  const totalLeaves = 1 << n;
  const leafSpacing = Math.max(65, Math.min(130, 680 / totalLeaves));
  const totalWidth = totalLeaves * leafSpacing + 80;
  const levelHeight = 72;

  const positionNode = (depth, path, minX, maxX) => {
    const x = (minX + maxX) / 2;
    const y = 35 + depth * levelHeight;
    const id = path === '' ? 'root' : `node-${path}`;

    nodes.push({
      id,
      path,
      depth,
      x,
      y,
      label: path === '' ? 'ε' : path[path.length - 1],
      fullStr: path,
      isLeaf: depth === n
    });

    if (depth < n) {
      const leftPath = path + '0';
      edges.push({
        id: `edge-${id}-0`,
        from: id,
        to: `node-${leftPath}`,
        fromPos: { x, y },
        toPos: { x: (minX + x) / 2, y: 35 + (depth + 1) * levelHeight },
        label: '0',
        branch: 'left'
      });
      positionNode(depth + 1, leftPath, minX, x);

      const rightPath = path + '1';
      edges.push({
        id: `edge-${id}-1`,
        from: id,
        to: `node-${rightPath}`,
        fromPos: { x, y },
        toPos: { x: (x + maxX) / 2, y: 35 + (depth + 1) * levelHeight },
        label: '1',
        branch: 'right'
      });
      positionNode(depth + 1, rightPath, x, maxX);
    }
  };

  positionNode(0, '', 40, totalWidth - 40);
  return { nodes, edges };
}

function generateStepsForBinaryStrings(n, algo) {
  const steps = [];
  const results = [];
  const stack = [];
  let callId = 0;

  if (algo === 'recursive') {
    const recurse = (current) => {
      const currentCallId = ++callId;
      const nodeId = current === '' ? 'root' : `node-${current}`;
      const slots = current.split('').concat(new Array(Math.max(0, n - current.length)).fill(null));

      stack.push({
        id: currentCallId,
        func: 'generateBinary',
        args: `n=${n}, current="${current}"`
      });

      steps.push({
        line: 1,
        nodeId,
        path: current,
        slots: [...slots],
        activeSlot: current.length < n ? current.length : n - 1,
        stack: [...stack],
        results: [...results],
        phase: 'CALL_ENTER',
        narration: `Call frame <code>generateBinary(${n}, "${current}")</code> pushed. Depth = <strong>${stack.length}</strong>.`
      });

      steps.push({
        line: 3,
        nodeId,
        path: current,
        slots: [...slots],
        activeSlot: current.length < n ? current.length : n - 1,
        stack: [...stack],
        results: [...results],
        phase: 'BASE_CHECK',
        narration: `Evaluating: <code>current.length() (${current.length}) == n (${n})</code> &rarr; <strong>${current.length === n ? 'TRUE' : 'FALSE'}</strong>.`
      });

      if (current.length === n) {
        results.push(current);
        steps.push({
          line: 4,
          nodeId,
          path: current,
          slots: [...slots],
          activeSlot: n - 1,
          stack: [...stack],
          results: [...results],
          phase: 'LEAF_FOUND',
          narration: `Base case reached! Output: <strong style="color:#10b981;">"${current}"</strong> (Decimal #${parseInt(current, 2)}).`
        });

        steps.push({
          line: 5,
          nodeId,
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

      steps.push({
        line: 8,
        nodeId,
        path: current,
        edgeTo: current + '0',
        slots: [...slots],
        activeSlot: current.length,
        stack: [...stack],
        results: [...results],
        phase: 'CHOICE_0',
        narration: `<strong>Choice 1:</strong> Recursing with <code>'0'</code> appended &rarr; <code>generateBinary(${n}, "${current + '0'}")</code>.`
      });
      recurse(current + '0');

      steps.push({
        line: 8,
        nodeId,
        path: current,
        slots: [...slots],
        activeSlot: current.length,
        stack: [...stack],
        results: [...results],
        phase: 'BACKTRACK_0',
        narration: `Backtracking to <code>generateBinary(${n}, "${current}")</code> after left subtree.`
      });

      steps.push({
        line: 10,
        nodeId,
        path: current,
        edgeTo: current + '1',
        slots: [...slots],
        activeSlot: current.length,
        stack: [...stack],
        results: [...results],
        phase: 'CHOICE_1',
        narration: `<strong>Choice 2:</strong> Recursing with <code>'1'</code> appended &rarr; <code>generateBinary(${n}, "${current + '1'}")</code>.`
      });
      recurse(current + '1');

      steps.push({
        line: 11,
        nodeId,
        path: current,
        slots: [...slots],
        activeSlot: current.length > 0 ? current.length - 1 : 0,
        stack: [...stack],
        results: [...results],
        phase: 'RETURN',
        narration: `Finished both branches for prefix <code>"${current}"</code>. Popping frame.`
      });
      stack.pop();
    };

    recurse('');
  } else {
    const currentSlots = new Array(n).fill(null);
    const recurse = (index, path) => {
      const currentCallId = ++callId;
      const nodeId = path === '' ? 'root' : `node-${path}`;

      stack.push({
        id: currentCallId,
        func: 'backtrack',
        args: `index=${index}, n=${n}`
      });

      steps.push({
        line: 5,
        nodeId,
        path,
        slots: [...currentSlots],
        activeSlot: index < n ? index : n - 1,
        stack: [...stack],
        results: [...results],
        phase: 'CALL_ENTER',
        narration: `Entering <code>backtrack(index = ${index})</code>.`
      });

      steps.push({
        line: 6,
        nodeId,
        path,
        slots: [...currentSlots],
        activeSlot: index < n ? index : n - 1,
        stack: [...stack],
        results: [...results],
        phase: 'BASE_CHECK',
        narration: `Checking base: <code>index (${index}) == n (${n})</code>.`
      });

      if (index === n) {
        const formed = currentSlots.join('');
        results.push(formed);
        steps.push({
          line: 7,
          nodeId,
          path,
          slots: [...currentSlots],
          activeSlot: n - 1,
          stack: [...stack],
          results: [...results],
          phase: 'LEAF_FOUND',
          narration: `Base case met! String: <strong>"${formed}"</strong>.`
        });
        steps.push({
          line: 8,
          nodeId,
          path,
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

      currentSlots[index] = '0';
      steps.push({
        line: 10,
        nodeId,
        path,
        slots: [...currentSlots],
        activeSlot: index,
        stack: [...stack],
        results: [...results],
        phase: 'CHOOSE_0',
        narration: `Setting <code>current[${index}] = '0'</code>.`
      });
      recurse(index + 1, path + '0');

      currentSlots[index] = '1';
      steps.push({
        line: 12,
        nodeId,
        path,
        slots: [...currentSlots],
        activeSlot: index,
        stack: [...stack],
        results: [...results],
        phase: 'CHOOSE_1',
        narration: `Backtracking & Setting <code>current[${index}] = '1'</code>.`
      });
      recurse(index + 1, path + '1');

      stack.pop();
    };
    recurse(0, '');
  }

  steps.push({
    line: algo === 'recursive' ? 11 : 4,
    nodeId: 'root',
    path: '',
    slots: new Array(n).fill(null),
    activeSlot: -1,
    stack: [],
    results: [...results],
    phase: 'COMPLETED',
    narration: `🎉 All ${results.length} binary strings of length ${n} generated.`
  });

  return steps;
}

export default function BinaryStringsVisualizer() {
  const [n, setN] = useState(3);
  const [algo, setAlgo] = useState('recursive');
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const [copied, setCopied] = useState(false);
  const timerRef = useRef(null);

  const treeData = buildBinaryTreeLayout(n);
  const steps = generateStepsForBinaryStrings(n, algo);
  const currentStep = steps[stepIdx] || steps[0];

  useEffect(() => {
    setStepIdx(0);
    setIsPlaying(false);
  }, [n, algo]);

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

  const visitedSet = new Set();
  const leafSet = new Set();
  for (let i = 0; i <= stepIdx; i++) {
    const s = steps[i];
    if (s.nodeId) visitedSet.add(s.nodeId);
    if (s.phase === 'LEAF_FOUND' && s.nodeId) leafSet.add(s.nodeId);
  }

  const handleCopy = () => {
    if (currentStep.results.length === 0) return;
    navigator.clipboard.writeText(currentStep.results.join('\n')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const customControls = (
    <>
      <div className="control-group">
        <label className="control-label">Algorithm</label>
        <select
          value={algo}
          onChange={(e) => setAlgo(e.target.value)}
          className="custom-select"
        >
          <option value="recursive">1. Recursive: generateBinary(n, current)</option>
          <option value="backtrack">2. Backtracking: backtrack(index, n, char[])</option>
        </select>
      </div>

      <div className="control-group" style={{ minWidth: 160 }}>
        <label className="control-label">
          Length (N): <span className="n-badge" style={{ color: 'var(--accent-cyan)' }}>{n}</span> (2<sup>{n}</sup> = {1 << n})
        </label>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value, 10))}
          className="custom-range"
        />
      </div>
    </>
  );

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
      />

      <main className="visualizer-grid">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <BinaryStringsTree
            n={n}
            treeNodes={treeData.nodes}
            treeEdges={treeData.edges}
            activeNodeId={currentStep.nodeId}
            visitedNodeIds={visitedSet}
            leafNodeIds={leafSet}
            activeEdgeId={currentStep.edgeTo ? `edge-${currentStep.nodeId}-${currentStep.edgeTo[currentStep.edgeTo.length - 1]}` : null}
            isBacktracking={currentStep.phase.startsWith('BACKTRACK')}
          />

          <BitSlots
            slots={currentStep.slots}
            activeSlot={currentStep.activeSlot}
            label={algo === 'recursive' ? 'String current (Concatenation)' : 'char[] current = new char[N]'}
          />
        </div>

        <aside className="sidebar-column">
          <JavaCodeViewer
            lines={JAVA_SNIPPETS[algo]}
            activeLine={currentStep.line}
            title={algo === 'recursive' ? 'Recursive source' : 'Backtracking source'}
          />

          <CallStack stack={currentStep.stack} maxDepth={n + 1} />

          <div className="panel results-panel">
            <div className="panel-header">
              <div className="panel-title-wrap">
                <h2 className="panel-title">Generated Strings</h2>
                <span className="panel-tag">{currentStep.results.length} / {1 << n}</span>
              </div>
              <button className="btn-tool" onClick={handleCopy} style={{ width: 'auto', padding: '0.2rem 0.5rem', fontSize: '0.72rem' }}>
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>

            <div className="results-grid">
              {currentStep.results.map((str) => (
                <div key={str} className="result-badge">
                  <span>{str}</span>
                  <span className="dec-val">#{parseInt(str, 2)}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
