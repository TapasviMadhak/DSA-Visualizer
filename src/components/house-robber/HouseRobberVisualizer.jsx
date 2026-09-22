import React, { useEffect, useMemo, useState } from 'react';
import PlaybackControls from '../common/PlaybackControls';
import NarrationBar from '../common/NarrationBar';
import CallStack from '../common/CallStack';
import JavaCodeViewer from '../common/JavaCodeViewer';

const JAVA_SOURCE = [
  'import java.util.Scanner;',
  '',
  'public class Main {',
  '    // Recursive function to find max money starting from index i',
  '    public static int robFrom(int[] nums, int i) {',
  '        // Base Case: No houses left to rob',
  '        if (i >= nums.length) {',
  '            return 0;',
  '        }',
  '',
  '        // Choice 1: Rob current house, jump to i + 2',
  '        int rob = nums[i] + robFrom(nums, i + 2);',
  '',
  '        // Choice 2: Skip current house, move to i + 1',
  '        int skip = robFrom(nums, i + 1);',
  '',
  '        // Return the best outcome',
  '        return Math.max(rob, skip);',
  '    }',
  '',
  '    public static void main(String[] args) {',
  '        Scanner scanner = new Scanner(System.in);',
  '',
  '        int n = scanner.nextInt();',
  '',
  '        int[] nums = new int[n];',
  '        for (int i = 0; i < n; i++) {',
  '            nums[i] = scanner.nextInt();',
  '        }',
  '',
  '        int maxLoot = robFrom(nums, 0);',
  '        System.out.println(maxLoot);',
  '',
  '        scanner.close();',
  '    }',
  '}'
].join('\n');

const JAVA_SNIPPET = JAVA_SOURCE.split('\n').map((text, index) => ({ num: index + 1, text }));

function buildSteps(nums) {
  const steps = [];
  let callId = 0;

  function walk(index, stack) {
    const id = ++callId;
    const frame = { id, func: 'robFrom', args: 'nums, i=' + index };
    const nextStack = [...stack, frame];
    const node = index + '-' + id;

    steps.push({
      id: node, index, depth: nextStack.length, stack: nextStack,
      line: 5, status: 'enter',
      narration: 'Enter <code>robFrom(nums, ' + index + ')</code>' + (index < nums.length ? ' for house <strong>#' + index + '</strong> with value <strong>' + nums[index] + '</strong>.' : '.')
    });

    if (index >= nums.length) {
      steps.push({
        id: node, index, depth: nextStack.length, stack: nextStack,
        line: 8, status: 'base',
        narration: 'No houses remain -> return <strong class="good-text">0</strong>.'
      });
      return 0;
    }

    steps.push({
      id: node, index, depth: nextStack.length, stack: nextStack,
      line: 12, status: 'include',
      narration: 'Rob house <strong>#' + index + '</strong> with value <strong>' + nums[index] + '</strong>, then jump to index <code>' + (index + 2) + '</code>.'
    });
    const rob = nums[index] + walk(index + 2, nextStack);

    steps.push({
      id: node, index, depth: nextStack.length, stack: nextStack,
      line: 15, status: 'skip',
      narration: 'Skip house <strong>#' + index + '</strong> and continue at index <code>' + (index + 1) + '</code>.'
    });
    const skip = walk(index + 1, nextStack);
    const total = Math.max(rob, skip);

    steps.push({
      id: node, index, depth: nextStack.length, stack: nextStack,
      line: 18, status: 'return', result: total,
      narration: 'Compare <code>rob = ' + rob + '</code> and <code>skip = ' + skip + '</code> -> return <strong>' + total + '</strong>.'
    });
    return total;
  }

  const result = walk(0, []);
  return { steps, result };
}

export default function HouseRobberVisualizer() {
  const [housesInput, setHousesInput] = useState('2, 7, 9, 3, 1');
  const [houses, setHouses] = useState([2, 7, 9, 3, 1]);
  const [inputError, setInputError] = useState('');
  const simulation = useMemo(() => buildSteps(houses), [houses]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const step = simulation.steps[currentStep] || simulation.steps[0];

  useEffect(() => {
    if (!isPlaying) return undefined;
    if (currentStep >= simulation.steps.length - 1) {
      setIsPlaying(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setCurrentStep((value) => value + 1), 900 / speed);
    return () => window.clearTimeout(timer);
  }, [currentStep, isPlaying, simulation.steps.length, speed]);

  const applyInput = (event) => {
    event.preventDefault();
    const nextHouses = housesInput.split(',').map((value) => Number.parseInt(value.trim(), 10)).filter((value) => Number.isInteger(value) && value >= 0);
    if (nextHouses.length === 0 || nextHouses.length > 12) {
      setInputError('Use 1-12 non-negative house values, separated by commas.');
      return;
    }
    setInputError('');
    setIsPlaying(false);
    setHouses(nextHouses);
    setCurrentStep(0);
  };

  const activeHouse = step.index < houses.length ? step.index : -1;
  const visibleTrace = simulation.steps.slice(Math.max(0, currentStep - 7), currentStep + 1);

  return (
    <>
      <PlaybackControls
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((value) => !value)}
        onNext={() => setCurrentStep((value) => Math.min(value + 1, simulation.steps.length - 1))}
        onPrev={() => setCurrentStep((value) => Math.max(value - 1, 0))}
        onReset={() => { setIsPlaying(false); setCurrentStep(0); }}
        onStepChange={setCurrentStep}
        speed={speed}
        onSpeedChange={setSpeed}
        currentStep={currentStep}
        totalSteps={simulation.steps.length}
        customControls={
          <form className="control-group coin-inputs" onSubmit={applyInput}>
            <label className="input-label" htmlFor="house-values">House values</label>
            <input id="house-values" className="custom-input input-coins" value={housesInput} onChange={(event) => setHousesInput(event.target.value)} />
            <button className="btn btn-secondary btn-apply" type="submit">Apply</button>
            {inputError && <span className="input-error">{inputError}</span>}
          </form>
        }
      />

      <NarrationBar icon="HR" phase="ROBBERY DECISION" narration={step.narration} />

      <main className="coin-layout">
        <section className="panel coin-trace-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <h2 className="panel-title">Rob / skip recursion tree</h2>
              <span className="panel-tag tag-emerald">LeetCode #198</span>
            </div>
            <span className="panel-tag">Pure recursion</span>
          </div>
          <div className="coin-tree">
            <div className="house-row" aria-label="House values">
              {houses.map((value, index) => (
                <div className={'house-card ' + (index === activeHouse ? 'active' : '')} key={index + '-' + value}>
                  <span>House {index}</span><strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="coin-state-hero">
              <span className="state-label">CURRENT STATE</span>
              <strong>robFrom(nums, {step.index})</strong>
              <span>{activeHouse === -1 ? 'past the last house' : 'house ' + activeHouse + ' · value ' + houses[activeHouse]} · depth {step.depth}</span>
            </div>
            <div className="trace-list">
              {visibleTrace.map((trace, index) => (
                <div className={'trace-row trace-' + trace.status + ' ' + (index === visibleTrace.length - 1 ? 'trace-current' : '')} key={trace.id + '-' + (currentStep - visibleTrace.length + index)}>
                  <span className="trace-step">{currentStep - visibleTrace.length + index + 1}</span>
                  <span className="trace-branch">{trace.status === 'include' ? '↳ rob' : trace.status === 'skip' ? '↳ skip' : trace.status}</span>
                  <code>i = {trace.index}</code>
                  {trace.result !== undefined && <b>= {trace.result}</b>}
                </div>
              ))}
            </div>
            <div className="coin-result"><span>Maximum loot</span><strong>{simulation.result}</strong><small>best non-adjacent total</small></div>
          </div>
        </section>

        <div className="coin-side-column">
          <JavaCodeViewer lines={JAVA_SNIPPET} activeLine={step.line} title="Main.java" />
          <CallStack stack={step.stack} maxDepth={houses.length + 1} />
        </div>
      </main>
    </>
  );
}
