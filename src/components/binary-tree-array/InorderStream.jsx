import React, { useState } from 'react';

export default function InorderStream({ stream = [], expectedTotal = 0 }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (stream.length === 0) return;
    navigator.clipboard.writeText(stream.map(s => s.val).join(' ')).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <div className="inorder-stream-section">
      <span className="inorder-stream-label">
        Inorder Stream (Left &rarr; Root &rarr; Right):
      </span>

      <div className="inorder-stream-list">
        {stream.length === 0 ? (
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            Awaiting Inorder Traversal...
          </span>
        ) : (
          stream.map((item, idx) => (
            <div key={idx} className="inorder-item-badge">
              <span>{item.val}</span>
              <span style={{ fontSize: '0.62rem', color: '#6ee7b7', marginLeft: 4 }}>#{idx + 1}</span>
            </div>
          ))
        )}
      </div>

      {stream.length > 0 && (
        <button
          className="btn-tool"
          onClick={handleCopy}
          style={{ width: 'auto', padding: '0.2rem 0.6rem', fontSize: '0.72rem', marginLeft: 'auto' }}
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      )}
    </div>
  );
}
