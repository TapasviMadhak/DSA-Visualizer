import React from 'react';

export default function ArrayMemoryView({
  arr = [],
  activeRootIdx = -1,
  activeLeftIdx = -1,
  activeRightIdx = -1,
  processedIndices = new Set()
}) {
  return (
    <div className="array-memory-section">
      <div className="array-header">
        <span className="slots-title">
          Input Array: <code>int[] arr = &#123; {arr.join(', ')} &#125;</code> (Size: {arr.length})
        </span>

        <div className="array-formula-pills">
          <span className="formula-pill pill-root">
            Current: <strong>i = {activeRootIdx >= 0 ? activeRootIdx : '-'}</strong>
          </span>
          <span className="formula-pill pill-left">
            Left: <strong>2*i + 1 = {activeLeftIdx >= 0 ? activeLeftIdx : '-'}</strong>
          </span>
          <span className="formula-pill pill-right">
            Right: <strong>2*i + 2 = {activeRightIdx >= 0 ? activeRightIdx : '-'}</strong>
          </span>
        </div>
      </div>

      <div className="array-cells-container">
        {arr.map((val, idx) => {
          const isRoot = idx === activeRootIdx;
          const isLeft = idx === activeLeftIdx;
          const isRight = idx === activeRightIdx;
          const isProcessed = processedIndices.has(idx);

          let cellClass = 'array-cell';
          if (isRoot) cellClass += ' active-root';
          else if (isLeft) cellClass += ' active-left';
          else if (isRight) cellClass += ' active-right';
          else if (isProcessed) cellClass += ' processed';

          return (
            <div key={idx} className={cellClass}>
              <div className="cell-box">
                {val}
              </div>
              <div className="cell-idx">[{idx}]</div>
              {isRoot && <span className="cell-role-tag" style={{ background: 'var(--accent-cyan)', color: '#000' }}>Root (i)</span>}
              {isLeft && <span className="cell-role-tag" style={{ background: '#38bdf8', color: '#000' }}>2i+1</span>}
              {isRight && <span className="cell-role-tag" style={{ background: '#c084fc', color: '#000' }}>2i+2</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
