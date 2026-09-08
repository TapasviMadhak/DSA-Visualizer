import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import TreeFromArrayVisualizer from './components/binary-tree-array/TreeFromArrayVisualizer';
import BinaryStringsVisualizer from './components/binary-strings/BinaryStringsVisualizer';

export default function App() {
  const [activeTab, setActiveTab] = useState('tree-array'); // 'tree-array' or 'binary-strings'

  const stats = activeTab === 'tree-array'
    ? [
        { label: 'Left Child Formula', value: '2 &times; i + 1', highlightClass: 'highlight-cyan' },
        { label: 'Right Child Formula', value: '2 &times; i + 2', highlightClass: 'highlight-amber' },
        { label: 'Time Complexity', value: 'O(N)', highlightClass: 'highlight-emerald' },
        { label: 'Auxiliary Stack Space', value: 'O(log N)', highlightClass: 'highlight-cyan' }
      ]
    : [
        { label: 'Total Strings', value: '2<sup>N</sup>', highlightClass: 'highlight-cyan' },
        { label: 'Time Complexity', value: 'O(2<sup>N</sup> &times; N)', highlightClass: 'highlight-amber' },
        { label: 'Auxiliary Stack Space', value: 'O(N) Stack', highlightClass: 'highlight-cyan' }
      ];

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        stats={stats}
      />

      {activeTab === 'tree-array' ? (
        <TreeFromArrayVisualizer />
      ) : (
        <BinaryStringsVisualizer />
      )}

      <footer className="app-footer">
        <p>Java DSA Visualizer Hub &bull; Built with React + Vite &bull; Interactive Algorithm Visualizations</p>
      </footer>
    </div>
  );
}
