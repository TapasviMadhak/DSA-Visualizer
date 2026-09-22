import React, { useEffect, useMemo, useState } from 'react';
import PlaybackControls from '../common/PlaybackControls';
import NarrationBar from '../common/NarrationBar';
import CallStack from '../common/CallStack';
import JavaCodeViewer from '../common/JavaCodeViewer';

const JAVA_SOURCE = [
  'import java.util.Scanner;',
  '',
  'public class Main {',
  "    // Helper function 1: Recursively count frequency of character 'ch' in string 's'",
  '    public static int getFrequency(String s, char ch, int index) {',
  '        if (index == s.length()) {',
  '            return 0;',
  '        }',
  "        int count = (s.charAt(index) == ch) ? 1 : 0;",
  '        return count + getFrequency(s, ch, index + 1);',
  '    }',
  '',
  '    // Helper function 2: Recursively search right-to-left for the last non-repeating character',
  '    public static char findLastUnique(String s, int index) {',
  '        if (index < 0) {',
  "            return '1'; // Base case: reached left end without finding a unique character",
  '        }',
  '',
  '        char currentChar = s.charAt(index);',
  '',
  '        // Compute frequency recursively starting from index 0',
  '        if (getFrequency(s, currentChar, 0) == 1) {',
  '            return currentChar; // Found the last non-repeating character',
  '        }',
  '',
  '        // Move one step left',
  '        return findLastUnique(s, index - 1);',
  '    }',
  '',
  '    public static void main(String[] args) {',
  '        Scanner scanner = new Scanner(System.in);',
  '        if (!scanner.hasNextLine()) {',
  '            scanner.close();',
  '            return;',
  '        }',
  '',
  '        String s = scanner.nextLine().trim();',
  '',
  '        if (s.isEmpty()) {',
  '            System.out.println("-1");',
  '        } else {',
  '            // Start right-to-left scan from the last index (s.length() - 1)',
  '            char result = findLastUnique(s, s.length() - 1);',
  '',
  "            if (result != '1') {",
  '                System.out.println(result);',
  '            } else {',
  '                System.out.println("-1");',
  '            }',
  '        }',
  '',
  '        scanner.close();',
  '    }',
  '}'
].join('\n');

const JAVA_SNIPPET = JAVA_SOURCE.split('\n').map((text, index) => ({ num: index + 1, text }));

function calculateFrequencies(text) {
  return [...new Set(text)].sort().map((char) => ({
    char,
    count: text.split('').filter((value) => value === char).length
  }));
}

function buildSteps(text) {
  const steps = [];
  let callId = 0;
  const staticFrequencies = calculateFrequencies(text);

  function makeFrame(func, args) {
    callId += 1;
    return { id: callId, func, args };
  }

  function getFrequency(char, index, stack, searchIndex) {
    const frame = makeFrame('getFrequency', 'ch=' + char + ', index=' + index);
    const nextStack = [...stack, frame];
    steps.push({
      line: 5, phase: 'FREQUENCY_CALL', status: 'count', stack: nextStack,
      index: searchIndex, frequencyIndex: index, char, frequencies: staticFrequencies,
      narration: 'Enter <code>getFrequency(s, ' + char + ', ' + index + ')</code>.'
    });
    steps.push({
      line: 6, phase: 'FREQUENCY_BASE_CHECK', status: 'count', stack: nextStack,
      index: searchIndex, frequencyIndex: index, char, frequencies: staticFrequencies,
      narration: 'Check <code>index == s.length()</code> -> <strong>' + (index === text.length ? 'TRUE' : 'FALSE') + '</strong>.'
    });
    if (index === text.length) {
      steps.push({
        line: 7, phase: 'FREQUENCY_BASE_RETURN', status: 'base', stack: nextStack,
        index: searchIndex, frequencyIndex: index, char, frequencies: staticFrequencies, result: 0,
        narration: 'Reached the end of the string -> return <strong>0</strong>.'
      });
      return 0;
    }

    const count = text[index] === char ? 1 : 0;
    steps.push({
      line: 9, phase: 'FREQUENCY_MATCH', status: 'count', stack: nextStack,
      index: searchIndex, frequencyIndex: index, char, frequencies: staticFrequencies,
      narration: 'Compare <strong>' + text[index] + '</strong> with <strong>' + char + '</strong> -> <code>count = ' + count + '</code>.'
    });
    steps.push({
      line: 10, phase: 'FREQUENCY_RECURSE', status: 'count', stack: nextStack,
      index: searchIndex, frequencyIndex: index, char, frequencies: staticFrequencies,
      narration: 'Move right to <code>getFrequency(s, ' + char + ', ' + (index + 1) + ')</code>.'
    });
    const total = count + getFrequency(char, index + 1, nextStack, searchIndex);
    steps.push({
      line: 10, phase: 'FREQUENCY_RETURN', status: 'return', stack: nextStack,
      index: searchIndex, frequencyIndex: index, char, frequencies: staticFrequencies, result: total,
      narration: 'Return <code>' + count + ' + remaining = ' + total + '</code> for character <strong>' + char + '</strong>.'
    });
    return total;
  }

  function findLastUnique(index, stack) {
    const frame = makeFrame('findLastUnique', 'index=' + index);
    const nextStack = [...stack, frame];
    steps.push({
      line: 14, phase: 'SEARCH_CALL', status: 'scan', stack: nextStack,
      index, frequencyIndex: -1, char: '', frequencies: staticFrequencies,
      narration: 'Enter <code>findLastUnique(s, ' + index + ')</code>.'
    });
    steps.push({
      line: 15, phase: 'SEARCH_BASE_CHECK', status: 'scan', stack: nextStack,
      index, frequencyIndex: -1, char: '', frequencies: staticFrequencies,
      narration: 'Check <code>index &lt; 0</code> -> <strong>' + (index < 0 ? 'TRUE' : 'FALSE') + '</strong>.'
    });
    if (index < 0) {
      steps.push({
        line: 16, phase: 'NOT_FOUND', status: 'dead', stack: nextStack,
        index, frequencyIndex: -1, char: '', frequencies: staticFrequencies, result: '1',
        narration: 'No unique character exists -> return sentinel <strong>1</strong>.'
      });
      return '1';
    }

    const currentChar = text[index];
    steps.push({
      line: 19, phase: 'CURRENT_CHARACTER', status: 'scan', stack: nextStack,
      index, frequencyIndex: -1, char: currentChar, frequencies: staticFrequencies,
      narration: 'Set <code>currentChar</code> to <strong>' + currentChar + '</strong> at index <code>' + index + '</code>.'
    });
    steps.push({
      line: 22, phase: 'FREQUENCY_CHECK', status: 'count', stack: nextStack,
      index, frequencyIndex: 0, char: currentChar, frequencies: staticFrequencies,
      narration: 'Recursively calculate the frequency of <strong>' + currentChar + '</strong> from index <code>0</code>.'
    });
    const frequency = getFrequency(currentChar, 0, nextStack, index);
    steps.push({
      line: 22, phase: 'UNIQUE_CHECK', status: 'scan', stack: nextStack,
      index, frequencyIndex: -1, char: currentChar, frequencies: staticFrequencies,
      narration: 'Frequency of <strong>' + currentChar + '</strong> is <strong>' + frequency + '</strong> -> <strong>' + (frequency === 1 ? 'UNIQUE' : 'REPEATED') + '</strong>.'
    });
    if (frequency === 1) {
      steps.push({
        line: 23, phase: 'FOUND', status: 'base', stack: nextStack,
        index, frequencyIndex: -1, char: currentChar, frequencies: staticFrequencies, result: currentChar,
        narration: '<strong>' + currentChar + '</strong> is the last non-repeating character -> return it.'
      });
      return currentChar;
    }

    steps.push({
      line: 27, phase: 'MOVE_LEFT', status: 'skip', stack: nextStack,
      index, frequencyIndex: -1, char: currentChar, frequencies: staticFrequencies,
      narration: '<strong>' + currentChar + '</strong> repeats -> move left to index <code>' + (index - 1) + '</code>.'
    });
    return findLastUnique(index - 1, nextStack);
  }

  const result = findLastUnique(text.length - 1, []);
  return { steps, result, frequencies: staticFrequencies };
}

export default function FirstUniqueCharacterVisualizer() {
  const [textInput, setTextInput] = useState('loveleetcode');
  const [text, setText] = useState('loveleetcode');
  const [inputError, setInputError] = useState('');
  const simulation = useMemo(() => buildSteps(text), [text]);
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
    const timer = window.setTimeout(() => setCurrentStep((value) => value + 1), 520 / speed);
    return () => window.clearTimeout(timer);
  }, [currentStep, isPlaying, simulation.steps.length, speed]);

  const applyInput = (event) => {
    event.preventDefault();
    const nextText = textInput.trim();
    if (!/^[a-z]{1,12}$/.test(nextText)) {
      setInputError('Use 1-12 lowercase English letters.');
      return;
    }
    setInputError('');
    setText(nextText);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const visibleTrace = simulation.steps.slice(Math.max(0, currentStep - 7), currentStep + 1);
  const isFound = simulation.result !== '1';

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
            <label className="input-label" htmlFor="unique-string">String</label>
            <input id="unique-string" className="custom-input input-coins" value={textInput} onChange={(event) => setTextInput(event.target.value)} spellCheck="false" />
            <button className="btn btn-secondary btn-apply" type="submit">Apply</button>
            {inputError && <span className="input-error">{inputError}</span>}
          </form>
        }
      />

      <NarrationBar icon="LU" phase="NESTED RECURSION" narration={step.narration} />

      <main className="coin-layout">
        <section className="panel coin-trace-panel">
          <div className="panel-header">
            <div className="panel-title-wrap">
              <h2 className="panel-title">Right-to-left unique search</h2>
              <span className="panel-tag">LeetCode #387</span>
            </div>
            <span className="panel-tag tag-emerald">Recursive</span>
          </div>
          <div className="coin-tree unique-workspace">
            <div className="character-row" aria-label="Input string">
              {text.split('').map((char, index) => (
                <div className={'character-token ' + (index === step.index ? 'active' : '') + (index > step.index ? ' visited' : '')} key={char + '-' + index}>
                  <strong>{char}</strong><span>{index}</span>
                </div>
              ))}
            </div>

            <div className="frequency-heading"><span>RECURSIVE FREQUENCY RESULTS</span><small>getFrequency(s, ch, 0)</small></div>
            <div className="frequency-table">
              {simulation.frequencies.map((entry) => (
                <div className={'frequency-cell ' + (step.char === entry.char ? 'active' : '')} key={entry.char}><span>{entry.char}</span><strong>{entry.count}</strong></div>
              ))}
            </div>

            <div className="trace-list">
              {visibleTrace.map((trace, index) => (
                <div className={'trace-row trace-' + trace.status + ' ' + (index === visibleTrace.length - 1 ? 'trace-current' : '')} key={trace.phase + '-' + (currentStep - visibleTrace.length + index)}>
                  <span className="trace-step">{currentStep - visibleTrace.length + index + 1}</span>
                  <span className="trace-branch">{trace.phase === 'FREQUENCY_CALL' ? '↳ count' : trace.phase === 'MOVE_LEFT' ? '↳ left' : trace.phase === 'FOUND' ? '↳ found' : trace.phase.toLowerCase().replaceAll('_', ' ')}</span>
                  <code>{trace.char ? trace.char + ', i = ' + trace.frequencyIndex : 'i = ' + trace.index}</code>
                  {trace.result !== undefined && <b>= {trace.result}</b>}
                </div>
              ))}
            </div>

            <div className="coin-result"><span>Last unique character</span><strong>{isFound ? simulation.result : '-1'}</strong><small>{isFound ? 'right-most non-repeating letter' : 'no unique character'}</small></div>
          </div>
        </section>

        <div className="coin-side-column">
          <JavaCodeViewer lines={JAVA_SNIPPET} activeLine={step.line} title="Main.java" />
          <CallStack stack={step.stack} maxDepth={text.length * 2 + 2} />
        </div>
      </main>
    </>
  );
}
