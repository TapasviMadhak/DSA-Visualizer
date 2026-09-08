import React from 'react';

export default function NarrationBar({ phase, narration, icon = '💡' }) {
  return (
    <section className="narration-bar">
      <div className="narration-icon">{icon}</div>
      <div className="narration-content">
        {phase && <span className="narration-title">{phase.replace(/_/g, ' ')}</span>}
        <p className="narration-text" dangerouslySetInnerHTML={{ __html: narration || 'Ready to start simulation.' }} />
      </div>
    </section>
  );
}
