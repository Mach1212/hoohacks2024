import { useCallback, useState } from 'react';
import ReactFlow, { 
    addEdge, 
    applyEdgeChanges, 
    applyNodeChanges,
    MiniMap,
    Controls,
    Background,
} from 'reactflow';
import 'reactflow/dist/style.css';

// import TextUpdaterNode from './TextUpdaterNode.jsx';
import FormulaNode from './FormulaNode.jsx';
import CalculateNode from './CalculateNode.jsx';

import './text-updater-node.css';

const rfStyle = {
    backgroundColor: '#8220a8',
};

const initialNodes = [
    { id: 'node-1', type: 'formulaNode', position: { x: 0, y: 0 }, data: { value: 123 } },
    { id: 'node-2', type: 'formulaNode', position: { x: 100, y: 100 }, data: { value: 123 } },
    { id: 'calculate-node', type: 'calculateNode', position: { x: 200, y: 100 }, data: { value: 123 } },
];

const initialEdges = [
    // { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
    // { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
];

const isValidConnection = (connection) => connection.target === 'calculate-node';
// const onConnectStart = (_, { nodeId, handleType }) =>
//   console.log('on connect start', { nodeId, handleType });
// const onConnectEnd = (event) => console.log('on connect end', event);

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { 
    // textUpdater: TextUpdaterNode, 
    formulaNode: FormulaNode, 
    calculateNode: CalculateNode,
};

export default function Formula() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => {
            setEdges((eds) => {addEdge(connection, eds); console.log(eds);});
            console.log(connection);
            col
        },
        [setEdges]
    );

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                isValidConnection={isValidConnection}
                nodeTypes={nodeTypes}
                fitView
                style={rfStyle}
            >
                <Controls />
                <MiniMap />
                <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}
