import React, { useState, useRef, useEffect, useCallback } from 'react';

export default function BinaryTreeCanvas({
  arr = [],
  treeNodes = [],
  treeEdges = [],
  visibleNodeIds = new Set(),
  visibleEdgeIds = new Set(),
  activeNodeIdx = -1,
  visitedInorderIndices = new Set(),
  activePhase = 'BUILD',
  onSelectNode
}) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const fitTree = useCallback(() => {
    if (!containerRef.current || treeNodes.length === 0) return;
    const cw = containerRef.current.clientWidth || 600;
    const ch = containerRef.current.clientHeight || 380;

    const maxDepth = Math.floor(Math.log2(Math.max(1, arr.length)));
    const totalLeaves = 1 << maxDepth;
    const totalWidth = Math.max(480, totalLeaves * 90 + 80);
    const totalHeight = (maxDepth + 1) * 80 + 70;

    const scaleX = (cw - 40) / totalWidth;
    const scaleY = (ch - 40) / totalHeight;
    const newZoom = Math.min(1.15, Math.max(0.45, Math.min(scaleX, scaleY)));

    setZoom(newZoom);
    setPan({
      x: (cw - totalWidth * newZoom) / 2,
      y: Math.max(20, (ch - totalHeight * newZoom) / 3)
    });
  }, [arr.length, treeNodes.length]);

  // Use ResizeObserver to auto-center when container mounts or resizes
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
    setZoom((prev) => Math.min(2.5, Math.max(0.35, prev * factor)));
  };

  return (
    <div className="panel tree-panel">
      <div className="panel-header">
        <div className="panel-title-wrap">
          <h2 className="panel-title">Binary Tree Topology &amp; Recursion Graph</h2>
          <span className={`panel-tag ${activePhase === 'INORDER' ? 'tag-emerald' : 'tag-java'}`}>
            {activePhase === 'INORDER' ? '🔄 Inorder Traversal Active' : '🌲 Tree Construction'}
          </span>
        </div>
        <div className="tree-controls">
          <button className="btn-tool" onClick={() => setZoom((z) => Math.min(2.5, z * 1.2))} title="Zoom In">+</button>
          <button className="btn-tool" onClick={() => setZoom((z) => Math.max(0.35, z / 1.2))} title="Zoom Out">&minus;</button>
          <button className="btn-tool" onClick={fitTree} title="Fit to Screen" style={{ width: 'auto', padding: '0 0.5rem' }}>Fit</button>
        </div>
      </div>

      <div className="tree-legend">
        <div className="legend-item"><span className="dot dot-active"></span> Active Frame</div>
        <div className="legend-item"><span className="dot dot-left"></span> Left (2i+1)</div>
        <div className="legend-item"><span className="dot dot-right"></span> Right (2i+2)</div>
        <div className="legend-item"><span className="dot dot-visited"></span> Inorder Visited</div>
        <div className="legend-item"><span className="dot" style={{ background: 'rgba(255,255,255,0.2)', border: '1px dashed #64748b' }}></span> Pending Slot</div>
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
            {/* Grid Pattern */}
            <pattern id="tree-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
            </pattern>
            {/* Glow Filters */}
            <filter id="glow-active" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-visited" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid Background */}
          <rect width="100%" height="100%" fill="url(#tree-grid)" />

          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* Tree Edges */}
            {treeEdges.map((edge) => {
              const isVisible = visibleEdgeIds.has(edge.id);
              const isLeft = edge.branch === 'left';
              const midX = (edge.fromPos.x + edge.toPos.x) / 2 + (isLeft ? -14 : 14);
              const midY = (edge.fromPos.y + edge.toPos.y) / 2;

              return (
                <g key={edge.id} className="tree-edge-group">
                  {/* Background Skeleton edge */}
                  <line
                    x1={edge.fromPos.x}
                    y1={edge.fromPos.y}
                    x2={edge.toPos.x}
                    y2={edge.toPos.y}
                    className="tree-edge"
                    style={{ stroke: 'rgba(255, 255, 255, 0.08)', strokeDasharray: '3 3' }}
                  />

                  {/* Active/Formed edge */}
                  {isVisible && (
                    <>
                      <line
                        x1={edge.fromPos.x}
                        y1={edge.fromPos.y}
                        x2={edge.toPos.x}
                        y2={edge.toPos.y}
                        className={`tree-edge edge-${edge.branch} edge-active`}
                      />
                      <text x={midX} y={midY} className="edge-label-text" textAnchor="middle">
                        {isLeft ? '2i+1' : '2i+2'}
                      </text>
                    </>
                  )}
                </g>
              );
            })}

            {/* Tree Nodes */}
            {treeNodes.map((node) => {
              const isCreated = visibleNodeIds.has(node.idx);
              const isActive = node.idx === activeNodeIdx;
              const isInorderVisited = visitedInorderIndices.has(node.idx);

              return (
                <g
                  key={node.idx}
                  transform={`translate(${node.x}, ${node.y})`}
                  className="tree-node-group"
                  onClick={() => onSelectNode && onSelectNode(node)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Node Circle */}
                  <circle
                    r={20}
                    className={
                      isActive
                        ? 'node-circle node-active'
                        : isInorderVisited
                        ? 'node-circle node-visited'
                        : isCreated
                        ? 'node-circle node-created'
                        : 'node-circle node-skeleton'
                    }
                    style={
                      !isCreated
                        ? {
                            fill: 'rgba(15, 23, 42, 0.4)',
                            stroke: 'rgba(255, 255, 255, 0.15)',
                            strokeDasharray: '3 3'
                          }
                        : {}
                    }
                    filter={isActive ? 'url(#glow-active)' : isInorderVisited ? 'url(#glow-visited)' : undefined}
                  />

                  {/* Node Value or Pending Placeholder */}
                  <text
                    className="node-text"
                    dy="-1"
                    style={{
                      fill: isCreated ? '#f8fafc' : 'rgba(148, 163, 184, 0.4)',
                      fontSize: '13px',
                      fontWeight: 800
                    }}
                  >
                    {isCreated ? node.val : '?'}
                  </text>

                  {/* Array Index Label */}
                  <text
                    className="node-idx-text"
                    dy="32"
                    style={{ fill: isActive ? 'var(--accent-cyan)' : '#64748b' }}
                  >
                    [{node.idx}]
                  </text>

                  <title>{`Node Value: ${node.val}\nArray Index: ${node.idx}\nLeft Child: ${2 * node.idx + 1}\nRight Child: ${2 * node.idx + 2}`}</title>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );
}
