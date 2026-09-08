import React from 'react';

export default function PlaybackControls({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrev,
  onReset,
  onStepChange,
  speed,
  onSpeedChange,
  currentStep,
  totalSteps,
  customControls
}) {
  const progressPct = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <section className="control-panel" aria-label="Visualizer Controls">
      {customControls}

      <div className="control-group playback-group">
        <button
          className="btn btn-icon"
          onClick={onPrev}
          disabled={currentStep <= 0}
          title="Step Backward (Left Arrow)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <polygon points="19,20 9,12 19,4 19,20" fill="currentColor" />
            <line x1="5" y1="4" x2="5" y2="20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <button
          className="btn btn-primary btn-play"
          onClick={onTogglePlay}
          title="Play / Pause (Spacebar)"
        >
          {isPlaying ? (
            <>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <rect x="6" y="4" width="4" height="16" fill="currentColor" />
                <rect x="14" y="4" width="4" height="16" fill="currentColor" />
              </svg>
              <span>Pause</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <polygon points="6,4 20,12 6,20" fill="currentColor" />
              </svg>
              <span>Play</span>
            </>
          )}
        </button>

        <button
          className="btn btn-icon"
          onClick={onNext}
          disabled={currentStep >= totalSteps - 1}
          title="Step Forward (Right Arrow)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <polygon points="5,4 15,12 5,20 5,4" fill="currentColor" />
            <line x1="19" y1="4" x2="19" y2="20" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <button
          className="btn btn-secondary btn-icon"
          onClick={onReset}
          title="Reset Simulation (R)"
        >
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path
              d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="control-group speed-group">
        <label className="control-label">Speed: {speed.toFixed(2)}x</label>
        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={speed}
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          className="custom-range speed-range"
        />
      </div>

      {/* Step Scrubber Slider */}
      <div className="step-progress-wrapper" style={{ minWidth: 180 }}>
        <div className="step-counter">
          <span>Step: </span>
          <strong style={{ color: 'var(--accent-cyan)' }}>{totalSteps > 0 ? currentStep + 1 : 0}</strong> / {totalSteps}
        </div>
        <input
          type="range"
          min="0"
          max={Math.max(0, totalSteps - 1)}
          value={currentStep}
          onChange={(e) => onStepChange && onStepChange(parseInt(e.target.value, 10))}
          className="custom-range"
          style={{ height: '5px' }}
        />
      </div>

      <div className="kbd-shortcut-hint">
        <span className="kbd-pill">Space</span> Play
        <span className="kbd-pill" style={{ marginLeft: 6 }}>&larr; / &rarr;</span> Step
        <span className="kbd-pill" style={{ marginLeft: 6 }}>R</span> Reset
      </div>
    </section>
  );
}
