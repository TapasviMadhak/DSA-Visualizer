import React from 'react';

export default function BitSlots({ slots = [], activeSlot = -1, label = 'char[] current = new char[N]' }) {
  const formedStr = slots.map(v => (v !== null && v !== undefined ? v : '_')).join('');

  return (
    <div className="memory-slots-section">
      <div className="slots-header">
        <span className="slots-title">
          Current Memory State: <code>{label}</code>
        </span>
        <span className="slots-sub">
          String: <code>"{formedStr}"</code>
        </span>
      </div>

      <div className="slots-container">
        {slots.map((val, idx) => {
          const isActive = idx === activeSlot;
          const isZero = val === '0';
          const isOne = val === '1';

          return (
            <div
              key={idx}
              className={`bit-slot ${isActive ? 'active' : ''} ${isZero ? 'filled-0' : isOne ? 'filled-1' : ''}`}
            >
              <div className="slot-box">{val !== null && val !== undefined ? val : '_'}</div>
              <div className="slot-idx">[{idx}]</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
