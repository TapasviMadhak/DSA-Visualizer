import React from 'react';

export default function CallStack({ stack = [], maxDepth = 8 }) {
  return (
    <div className="panel stack-panel">
      <div className="panel-header">
        <div className="panel-title-wrap">
          <h2 className="panel-title">Call Stack Frames</h2>
          <span className="panel-tag">Depth: {stack.length} / {maxDepth}</span>
        </div>
        <span className="stack-helper">LIFO Order</span>
      </div>

      <div className="stack-container">
        {stack.length === 0 ? (
          <div className="empty-stack-msg">Stack is idle. Start execution to view active frames.</div>
        ) : (
          stack.map((frame, idx) => {
            const isTop = idx === stack.length - 1;
            return (
              <div key={frame.id || idx} className={`stack-frame ${isTop ? 'top-frame' : ''}`}>
                <span className="frame-func">{frame.func}</span>
                <span className="frame-args">{frame.args}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
