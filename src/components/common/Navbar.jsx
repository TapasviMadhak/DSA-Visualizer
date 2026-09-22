import React from 'react';
import { Binary, CircleDollarSign, House, Landmark, Network, Search } from 'lucide-react';

export default function Navbar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Library', icon: House },
    { id: 'tree-array', label: 'Tree from array', icon: Network },
    { id: 'binary-strings', label: 'Binary strings', icon: Binary },
    { id: 'coin-change', label: 'Coin change', icon: CircleDollarSign },
    { id: 'house-robber', label: 'House robber', icon: Landmark },
    { id: 'first-unique', label: 'Last unique', icon: Search }
  ];

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-left">
          <div className="logo-mark">∿</div>
          <div>
            <div className="logo-title-row">
              <h1 className="logo-title">Algo<span>scope</span></h1>
              <span className="header-context">Interactive study lab</span>
            </div>
            <p className="logo-subtitle">Build intuition one state at a time.</p>
          </div>
        </div>
        {activeTab !== 'home' && <span className="header-status"><i />Live simulation</span>}
      </div>
      <nav className="nav-tab-bar" aria-label="Visualizers">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`nav-tab-btn ${activeTab === id ? 'active' : ''}`} onClick={() => onTabChange(id)} aria-current={activeTab === id ? 'page' : undefined}>
            <Icon size={15} strokeWidth={2} /> <span>{label}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
