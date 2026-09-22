import React, { useState } from 'react';
import Navbar from './components/common/Navbar';
import TreeFromArrayVisualizer from './components/binary-tree-array/TreeFromArrayVisualizer';
import BinaryStringsVisualizer from './components/binary-strings/BinaryStringsVisualizer';
import CoinChangeVisualizer from './components/coin-change/CoinChangeVisualizer';
import HouseRobberVisualizer from './components/house-robber/HouseRobberVisualizer';
import FirstUniqueCharacterVisualizer from './components/first-unique-character/FirstUniqueCharacterVisualizer';
import HomeDashboard from './components/home/HomeDashboard';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'home' ? (
        <HomeDashboard onSelectTopic={setActiveTab} />
      ) : activeTab === 'tree-array' ? (
        <TreeFromArrayVisualizer />
      ) : activeTab === 'binary-strings' ? (
        <BinaryStringsVisualizer />
      ) : activeTab === 'coin-change' ? (
        <CoinChangeVisualizer />
      ) : activeTab === 'house-robber' ? (
        <HouseRobberVisualizer />
      ) : (
        <FirstUniqueCharacterVisualizer />
      )}

      <footer className="app-footer">
        <p>Algoscope <span>•</span> Learn by tracing execution</p>
      </footer>
    </div>
  );
}
