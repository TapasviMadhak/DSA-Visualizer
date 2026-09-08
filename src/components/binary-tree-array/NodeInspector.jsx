import React from 'react';

export default function NodeInspector({ arr = [], activeIdx = -1 }) {
  if (activeIdx < 0 || activeIdx >= arr.length) {
    return (
      <div className="panel inspector-panel">
        <div className="panel-header">
          <div className="panel-title-wrap">
            <h2 className="panel-title">Node Inspector</h2>
            <span className="panel-tag">Index Math</span>
          </div>
        </div>
        <div className="inspector-body" style={{ display: 'block', textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>
          Select or hover a tree node to inspect its index mappings.
        </div>
      </div>
    );
  }

  const val = arr[activeIdx];
  const leftIdx = 2 * activeIdx + 1;
  const rightIdx = 2 * activeIdx + 2;
  const parentIdx = activeIdx === 0 ? -1 : Math.floor((activeIdx - 1) / 2);

  const leftVal = leftIdx < arr.length ? arr[leftIdx] : 'null (None)';
  const rightVal = rightIdx < arr.length ? arr[rightIdx] : 'null (None)';
  const parentVal = parentIdx >= 0 ? arr[parentIdx] : 'null (Root)';

  return (
    <div className="panel inspector-panel">
      <div className="panel-header">
        <div className="panel-title-wrap">
          <h2 className="panel-title">Node Inspector: Value {val}</h2>
          <span className="panel-tag tag-java">Index [{activeIdx}]</span>
        </div>
      </div>

      <div className="inspector-body">
        <div className="inspector-item">
          <span className="inspector-item-label">Left Child Index</span>
          <span className="inspector-item-val" style={{ color: '#38bdf8' }}>
            2 * {activeIdx} + 1 = {leftIdx} ({leftVal})
          </span>
        </div>

        <div className="inspector-item">
          <span className="inspector-item-label">Right Child Index</span>
          <span className="inspector-item-val" style={{ color: '#c084fc' }}>
            2 * {activeIdx} + 2 = {rightIdx} ({rightVal})
          </span>
        </div>

        <div className="inspector-item">
          <span className="inspector-item-label">Parent Index</span>
          <span className="inspector-item-val" style={{ color: 'var(--accent-amber)' }}>
            {parentIdx >= 0 ? `(${activeIdx}-1)/2 = ${parentIdx} (${parentVal})` : 'None (Root Node)'}
          </span>
        </div>

        <div className="inspector-item">
          <span className="inspector-item-label">Tree Level / Depth</span>
          <span className="inspector-item-val" style={{ color: 'var(--accent-cyan)' }}>
            Level {Math.floor(Math.log2(activeIdx + 1))}
          </span>
        </div>
      </div>
    </div>
  );
}
