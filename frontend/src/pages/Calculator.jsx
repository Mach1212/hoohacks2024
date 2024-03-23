import React, { useCallback } from 'react';
import ReactFlow, { addEdge, useEdgesState, useNodesState } from 'reactflow';

import 'reactflow/dist/style.css';
import NumberNode from '../components/Nodes/NumberNode.jsx';
import ResultNode from '../components/Nodes/ResultNode.jsx';
import Sidebar from '../components/sidebar.jsx';

const initialNodes = [
  {
    id: '1',
    type: 'number',
    label: '1',
    position: { x: 0, y: 0 },
    data: { label: 'ee er' },
  },
  {
    id: '2',
    type: 'result',
    label: '2',
    position: { x: 200, y: 0 },
    data: { label: 'I hate this' },
  },
];

const nodeTypes = {
  number: NumberNode,
  result: ResultNode,
};

const initialEdges = [];

export default function Calculator() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <main className='flex flex-row'>
      <Sidebar />
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        />
      </div>
    </main>
  );
}
