import React from 'react';
import { ArrowRight, BarChart3, Code2, Layers3, Network, Binary, Coins, Landmark, Search } from 'lucide-react';

const TOPICS = [
  {
    id: 'tree-array',
    icon: Network,
    label: 'Binary Trees',
    title: 'Array to Binary Tree',
    description: 'Trace heap-style index mapping and watch an inorder traversal unfold.',
    difficulty: 'Core',
    accent: 'emerald',
    metric: '2 visual modes'
  },
  {
    id: 'binary-strings',
    icon: Binary,
    label: 'Backtracking',
    title: 'Binary Strings',
    description: 'Explore every decision branch with a synchronized call stack.',
    difficulty: 'Core',
    accent: 'cyan',
    metric: '2ⁿ states'
  },
  {
    id: 'coin-change',
    icon: Coins,
    label: 'Dynamic Programming',
    title: 'Coin Change II',
    description: 'Understand combinations by expanding the include / skip recursion.',
    difficulty: 'Medium',
    accent: 'amber',
    metric: 'LeetCode #518'
  },
  {
    id: 'house-robber',
    icon: Landmark,
    label: 'Dynamic Programming',
    title: 'House Robber',
    description: 'Compare rob and skip choices while tracing the recursive search.',
    difficulty: 'Medium',
    accent: 'purple',
    metric: 'LeetCode #198'
  },
  {
    id: 'first-unique',
    icon: Search,
    label: 'Strings & Arrays',
    title: 'Last Unique Character',
    description: 'Use nested recursion to count frequencies and scan right-to-left.',
    difficulty: 'Easy',
    accent: 'cyan',
    metric: 'LeetCode #387'
  }
];

export default function HomeDashboard({ onSelectTopic }) {
  return (
    <main className="home-dashboard">
      <section className="hero-section">
        <div className="hero-copy">
          <div className="eyebrow">Interactive computer science lab</div>
          <h1>Understand the<br /><span>execution, not just the answer.</span></h1>
          <p>Step through recursive calls, data structures, and decisions one frame at a time. A focused workspace for building algorithm intuition.</p>
          <button className="btn btn-primary hero-cta" onClick={() => onSelectTopic('coin-change')}>
            Open Coin Change II <ArrowRight size={16} />
          </button>
        </div>
        <div className="hero-note">
          <span className="hero-note-number">01</span>
          <div><strong>Trace the idea</strong><p>Play, pause, or scrub through every state.</p></div>
          <span className="hero-note-line" />
          <span className="hero-note-number">02</span>
          <div><strong>Read the code</strong><p>Follow the exact Java line in execution.</p></div>
        </div>
      </section>

      <section className="dashboard-heading">
        <div>
          <div className="section-kicker">Your learning lab</div>
          <h2>Choose a visualizer</h2>
        </div>
        <div className="dashboard-summary"><BarChart3 size={16} /> 3 interactive modules <span>•</span> Java reference code</div>
      </section>

      <section className="topic-grid">
        {TOPICS.map((topic) => (
          <button key={topic.id} className={`topic-card topic-${topic.accent}`} onClick={() => onSelectTopic(topic.id)}>
            <div className="topic-card-top">
              <span className="topic-icon"><topic.icon size={19} strokeWidth={1.8} /></span>
              <span className="topic-difficulty">{topic.difficulty}</span>
            </div>
            <div className="topic-label">{topic.label}</div>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
            <div className="topic-card-footer">
              <span>{topic.metric}</span><ArrowRight size={16} />
            </div>
          </button>
        ))}
      </section>

      <section className="dashboard-callout">
        <div className="callout-icon"><Layers3 size={20} /></div>
        <div>
          <strong>How to use the lab</strong>
          <p>Press play for a guided run, or step one frame at a time to connect the highlighted Java line to the visual state.</p>
        </div>
        <div className="callout-code"><Code2 size={15} /> line-by-line execution</div>
      </section>
    </main>
  );
}
