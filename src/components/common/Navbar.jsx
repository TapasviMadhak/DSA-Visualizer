import React from 'react';

export default function Navbar({ activeTab, onTabChange, stats }) {
  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-left">
          <div className="logo-mark">
            {activeTab === 'tree-array' ? '🌲' : '01'}
          </div>
          <div>
            <div className="logo-title-row">
              <h1 className="logo-title">
                {activeTab === 'tree-array'
                  ? 'Binary Tree from Array & Inorder Traversal'
                  : 'Binary Strings Generator (Length N)'}
              </h1>
              <span className="badge badge-primary">Java DSA Visualizer</span>
              <span className={`badge ${activeTab === 'tree-array' ? 'badge-emerald' : 'badge-accent'}`}>
                {activeTab === 'tree-array' ? 'Recursion + Traversal' : 'Backtracking & Bitwise'}
              </span>
            </div>
            <p className="logo-subtitle">
              {activeTab === 'tree-array'
                ? 'Recursive Array Mapping: 2*i+1 & 2*i+2 • Inorder Traversal • Call Stack Tracer'
                : 'Interactive Binary Decision Tree • State Space Backtracking • Real-time Call Stack'}
            </p>
          </div>
        </div>

        <div className="header-stats">
          {stats && stats.map((st, i) => (
            <div className="stat-pill" key={i}>
              <span className="stat-label">{st.label}</span>
              <span className={`stat-val ${st.highlightClass || ''}`} dangerouslySetInnerHTML={{ __html: st.value }} />
            </div>
          ))}
        </div>
      </div>

      <nav className="nav-tab-bar">
        <button
          className={`nav-tab-btn ${activeTab === 'tree-array' ? 'active-tree' : ''}`}
          onClick={() => onTabChange('tree-array')}
        >
          <span>🌲</span>
          <span>1. Binary Tree from Array &amp; Inorder</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'binary-strings' ? 'active' : ''}`}
          onClick={() => onTabChange('binary-strings')}
        >
          <span>✨</span>
          <span>2. Binary Strings Generator (Length N)</span>
        </button>
      </nav>
    </header>
  );
}
