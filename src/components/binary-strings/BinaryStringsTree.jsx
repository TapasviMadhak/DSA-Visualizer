import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function BinaryStringsTree({
  n,
  treeNodes = [],
  treeEdges = [],
  activeNodeId,
  visitedNodeIds = new Set(),
  leafNodeIds = new Set(),
  activeEdgeId,
  isBacktracking
}) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 25 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const fitTree = useCallback(() => {
    if (!containerRef.current || treeNodes.length === 0) return;
    const cw = containerRef.current.clientWidth || 600;
    const ch = containerRef.current.clientHeight || 380;
    const totalLeaves = 1 << n;
    const leafSpacing = Math.max(65, Math.min(130, 680 / totalLeaves));
    const totalWidth = totalLeaves * leafSpacing + 80;
    const totalHeight = (n + 1) * 75 + 70;

    const scaleX = (cw - 40) / totalWidth;
    const scaleY = (ch - 40) / totalHeight;
    const newZoom = Math.min(1.15, Math.max(0.4, Math.min(scaleX, scaleY)));

    setZoom(newZoom);
    setPan({
      x: (cw - totalWidth * newZoom) / 2,
      y: Math.max(15, (ch - totalHeight * newZoom) / 3)
    });
  }, [n, treeNodes.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    fitTree();

    const resizeObserver = new ResizeObserver(() => {
      fitTree();
    });
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [fitTree]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((prev) => Math.min(2.5, Math.max(0.3, prev * factor)));
  };

  return (
    <div className="panel tree-panel">
      <div className="panel-header">
        <div className="panel-title-wrap">
          <h2 className="panel-title">Binary Decision Recursion Tree</h2>
          <span className="panel-tag">2<sup>{n}</sup> = {1 << n} Leaves</span>
        </div>
        <div className="tree-controls">
          <button className="btn-tool" onClick={() => setZoom((z) => Math.min(2.5, z * 1.2))} title="Zoom In">+</button>
          <button className="btn-tool" onClick={() => setZoom((z) => Math.max(0.3, z / 1.2))} title="Zoom Out">&minus;</button>
          <button className="btn-tool" onClick={fitTree} title="Reset Viewport" style={{ width: 'auto', padding: '0 0.5rem' }}>Fit</button>
        </div>
      </div>

      <div className="tree-legend">
        <div className="legend-item"><span className="dot dot-active"></span> Active Frame</div>
        <div className="legend-item"><span className="dot dot-left"></span> '0' Branch</div>
        <div className="legend-item"><span className="dot dot-right"></span> '1' Branch</div>
        <div className="legend-item"><span className="dot dot-leaf"></span> Leaf Solution</div>
        <div className="legend-item"><span className="dot dot-backtrack"></span> Backtracking</div>
      </div>

      <div
        ref={containerRef}
        className="tree-viewport-container"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <svg className="tree-svg" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <pattern id="strings-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#strings-grid)" />

          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Edges */}
            {treeEdges.map((edge) => {
              const isActive = edge.id === activeEdgeId;
              const midX = (edge.fromPos.x + edge.toPos.x) / 2 + (edge.branch === 'left' ? -10 : 10);
              const midY = (edge.fromPos.y + edge.toPos.y) / 2;

              return (
                <g key={edge.id} className="tree-edge-group">
                  <line
                    x1={edge.fromPos.x}
                    y1={edge.fromPos.y}
                    x2={edge.toPos.x}
                    y2={edge.toPos.y}
                    className={`tree-edge edge-${edge.branch} ${isActive ? 'edge-active' : ''}`}
                  />
                  <text x={midX} y={midY} className="edge-label-text" textAnchor="middle">
                    {edge.label}
                  </text>
                </g>
              );
            })}

            {/* Nodes */}
            {treeNodes.map((node) => {
              const isActive = node.id === activeNodeId;
              const isVisited = visitedNodeIds.has(node.id);
              const isLeaf = leafNodeIds.has(node.id);

              let circleClass = 'node-circle';
              if (isActive) {
                circleClass += isBacktracking ? ' node-backtrack' : ' node-active';
              } else if (isLeaf) {
                circleClass += ' node-leaf';
              } else if (isVisited) {
                circleClass += ' node-visited';
              }

              return (
                <g key={node.id} transform={`translate(${node.x}, ${node.y})`} className="tree-node-group">
                  <circle r={node.isLeaf ? 16 : 14} className={circleClass} />
                  <text className="node-text">{node.label}</text>
                  <title>{`Depth: ${node.depth}\nPath: "${node.fullStr || 'ε'}"`}</title>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
