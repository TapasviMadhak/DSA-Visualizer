import React, { useEffect, useMemo, useState } from 'react';
import PlaybackControls from '../common/PlaybackControls';
import NarrationBar from '../common/NarrationBar';
import CallStack from '../common/CallStack';
import JavaCodeViewer from '../common/JavaCodeViewer';

const JAVA_SOURCE = `import java.util.Scanner;

public class CoinChange2 {
    // Pure Recursive Function
    public static int countWays(int[] coins, int index, int amount) {
        // Base Case 1: Target achieved
        if (amount == 0) {
            return 1;
        }

        // Base Case 2: Target exceeded (invalid path)
        if (amount < 0) {
            return 0;
        }

        // Base Case 3: No more coins left to pick from
        if (index == coins.length) {
            return 0;
        }

        // Choice 1: Take the current coin (stay at index to allow reuse)
        int take = countWays(coins, index, amount - coins[index]);

        // Choice 2: Skip the current coin (move to the next coin)
        int skip = countWays(coins, index + 1, amount);

        // Total ways is the sum of both choices
        return take + skip;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter target amount: ");
        int amount = scanner.nextInt();

        System.out.print("Enter number of coin types: ");
        int n = scanner.nextInt();

        int[] coins = new int[n];
        System.out.println("Enter coin denominations:");
        for (int i = 0; i < n; i++) {
            coins[i] = scanner.nextInt();
        }

        int result = countWays(coins, 0, amount);
        System.out.println("Total combinations: " + result);

        scanner.close();
    }
}`;

const JAVA_SNIPPET = JAVA_SOURCE.split('\n').map((text, index) => ({ num: index + 1, text }));

function buildSteps(amount, coins) {
  const steps = [];
  let callId = 0;

  const walk = (remaining, index, stack) => {
    const id = ++callId;
    const frame = { id, func: 'countWays', args: `coins, index=${index}, amount=${remaining}` };
    const nextStack = [...stack, frame];
    const node = `${remaining}-${index}-${id}`;

    steps.push({
      id: node,
      remaining,
      index,
      depth: nextStack.length,
      stack: nextStack,
      line: 5,
      status: 'enter',
      narration: `Enter <code>countWays(coins, ${index}, ${remaining})</code> with coin ${index < coins.length ? `<strong>${coins[index]}</strong>` : 'out of range'}.`
    });

    if (remaining === 0) {
      steps.push({
        id: node, remaining, index, depth: nextStack.length, stack: nextStack,
        line: 8, status: 'base',
        narration: 'Target achieved -> this branch contributes <strong class="good-text">1 combination</strong>.'
      });
      return 1;
    }

    if (remaining < 0 || index === coins.length) {
      const exceededTarget = remaining < 0;
      steps.push({
        id: node, remaining, index, depth: nextStack.length, stack: nextStack,
        line: exceededTarget ? 13 : 18, status: 'dead',
        narration: exceededTarget
          ? 'Target exceeded -> this invalid branch contributes <strong>0 combinations</strong>.'
          : 'No coin types remain -> this branch contributes <strong>0 combinations</strong>.'
      });
      return 0;
    }

    steps.push({
      id: node, remaining, index, depth: nextStack.length, stack: nextStack,
      line: 22, status: 'include',
      narration: `Take coin <code>${coins[index]}</code>: keep the index so this denomination can be reused.`
    });
    const take = walk(remaining - coins[index], index, nextStack);

    steps.push({
      id: node, remaining, index, depth: nextStack.length, stack: nextStack,
      line: 25, status: 'skip',
      narration: `Skip coin <code>${coins[index]}</code>: advance to the next denomination.`
    });
    const skip = walk(remaining, index + 1, nextStack);
    const total = take + skip;

    steps.push({
      id: node, remaining, index, depth: nextStack.length, stack: nextStack,
      line: 28, status: 'return', result: total,
      narration: `Return <code>${take} + ${skip} = ${total}</code> for state <code>(${remaining}, ${index})</code>.`
    });
    return total;
  };

  const result = walk(amount, 0, []);
  return { steps, result };
}

export default function CoinChangeVisualizer() {
  const [amountInput, setAmountInput] = useState('5');
  const [coinsInput, setCoinsInput] = useState('1, 2, 5');
  const [amount, setAmount] = useState(5);
  const [coins, setCoins] = useState([1, 2, 5]);
  const [inputError, setInputError] = useState('');
  const simulation = useMemo(() => buildSteps(amount, coins), [amount, coins]);
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

  const reset = () => { setIsPlaying(false); setCurrentStep(0); };
  const applyInput = (event) => {
    event.preventDefault();
    const nextAmount = Number.parseInt(amountInput, 10);
    const nextCoins = coinsInput
      .split(',')
      .map((coin) => Number.parseInt(coin.trim(), 10))
      .filter((coin) => Number.isInteger(coin) && coin > 0);

    if (!Number.isInteger(nextAmount) || nextAmount < 0 || nextAmount > 20 || nextCoins.length === 0) {
      setInputError('Use an amount from 0-20 and at least one positive coin.');
      return;
    }

    setInputError('');
    setIsPlaying(false);
    setAmount(nextAmount);
    setCoins([...new Set(nextCoins)].sort((a, b) => a - b));
    setCurrentStep(0);
  };

  const visibleTrace = simulation.steps.slice(Math.max(0, currentStep - 7), currentStep + 1);

  return (
    <>
      <PlaybackControls
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying((value) => !value)}
        onNext={() => setCurrentStep((value) => Math.min(value + 1, simulation.steps.length - 1))}
        onPrev={() => setCurrentStep((value) => Math.max(value - 1, 0))}
        onReset={reset}
        onStepChange={setCurrentStep}
        speed={speed}
        onSpeedChange={setSpeed}
        currentStep={currentStep}
        totalSteps={simulation.steps.length}
        customControls={
          <form className="control-group coin-inputs" onSubmit={applyInput}>
            <label className="input-label" htmlFor="coin-amount">Amount</label>
            <input id="coin-amount" className="custom-input input-compact" value={amountInput} onChange={(event) => setAmountInput(event.target.value)} inputMode="numeric" />
            <label className="input-label" htmlFor="coin-list">Coins</label>
            <input id="coin-list" className="custom-input input-coins" value={coinsInput} onChange={(event) => setCoinsInput(event.target.value)} />
            <button className="btn btn-secondary btn-apply" type="submit">Apply</button>
            {inputError && <span className="input-error">{inputError}</span>}
          </form>
        }
      />

      <NarrationBar icon="CC" phase="RECURSION INSIGHT" narration={step.narration} />

      <main className="coin-layout">
        <section className="panel coin-trace-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <h2 className="panel-title">Take / Skip call tree</h2>
              <span className="panel-tag tag-amber">Recursive</span>
            </div>
            <span className="panel-tag">Coin Change II</span>
          </div>
          <div className="coin-tree">
            <div className="coin-state-hero">
              <span className="state-label">CURRENT STATE</span>
              <strong>countWays({step.index}, {step.remaining})</strong>
              <span>depth {step.depth} · {step.status}</span>
            </div>
            <div className="trace-list">
              {visibleTrace.map((trace, index) => (
                <div className={`trace-row trace-${trace.status} ${index === visibleTrace.length - 1 ? 'trace-current' : ''}`} key={`${trace.id}-${currentStep - visibleTrace.length + index}`}>
                  <span className="trace-step">{currentStep - visibleTrace.length + index + 1}</span>
                  <span className="trace-branch">{trace.status === 'include' ? '↳ take' : trace.status === 'skip' ? '↳ skip' : trace.status}</span>
                  <code>({trace.index}, {trace.remaining})</code>
                  {trace.result !== undefined && <b>= {trace.result}</b>}
                </div>
              ))}
            </div>
            <div className="coin-result"><span>Answer</span><strong>{simulation.result}</strong><small>unique combinations for amount {amount}</small></div>
          </div>
        </section>

        <div className="coin-side-column">
          <JavaCodeViewer lines={JAVA_SNIPPET} activeLine={step.line} title="CoinChange2.java" />
          <CallStack stack={step.stack} maxDepth={amount + coins.length + 1} />
        </div>
      </main>
    </>
  );
}
