import React, { useEffect, useRef } from 'react';

function highlightSyntax(text) {
  // 1. Escape HTML special characters
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // 2. Single-pass regex token matching to prevent nested markup corruption
  const tokenRegex = /(\/\/[^\n]*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\b(?:public|private|static|void|int|char|boolean|new|return|if|else|for|while|class)\b)|(\b(?:String|StringBuilder|Queue|LinkedList|System|Scanner|Node|TreeNode)\b)|(\b(?:constructTree|inOrder|generateBinary|backtrack|generate|println|print|append|offer|poll|length)\b)/g;

  return escaped.replace(tokenRegex, (match, comment, str, kw, type, method) => {
    if (comment) return `<span class="syn-comment">${comment}</span>`;
    if (str) return `<span class="syn-string">${str}</span>`;
    if (kw) return `<span class="syn-keyword">${kw}</span>`;
    if (type) return `<span class="syn-type">${type}</span>`;
    if (method) return `<span class="syn-method">${method}</span>`;
    return match;
  });
}

export default function JavaCodeViewer({ lines = [], activeLine = 1, title = "Java Execution Tracer" }) {
  const activeLineRef = useRef(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [activeLine]);

  return (
    <div className="panel code-panel">
      <div className="panel-header">
        <div className="panel-title-wrap">
          <h2 className="panel-title">{title}</h2>
          <span className="panel-tag tag-java">Java 17+</span>
        </div>
        <span className="panel-tag" style={{ color: 'var(--accent-cyan)', background: 'rgba(0, 242, 254, 0.1)', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
          Line {activeLine}
        </span>
      </div>

      <div className="code-container">
        <pre>
          <code>
            {lines.map((line) => {
              const isActive = line.num === activeLine;
              return (
                <div
                  key={line.num}
                  ref={isActive ? activeLineRef : null}
                  className={`code-line ${isActive ? 'active-line' : ''}`}
                >
                  <span className="code-line-num">{line.num}</span>
                  <span
                    className="code-line-content"
                    dangerouslySetInnerHTML={{ __html: highlightSyntax(line.text) }}
                  />
                </div>
              );
            })}
          </code>
        </pre>
      </div>
    </div>
  );
}
