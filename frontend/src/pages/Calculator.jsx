import { useCallback, useRef, useState } from 'react';
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  getConnectedEdges,
  getIncomers,
  MiniMap,
  useEdgesState,
  useNodesState,
} from 'reactflow';
import { IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import 'reactflow/dist/style.css';
import Sidebar from '../components/Sidebar.jsx';
import {
  atan2,
  chain,
  derivative,
  e,
  evaluate,
  log,
  pi,
  pow,
  round,
  sqrt,
} from 'mathjs';

// import TextUpdaterNode from './TextUpdaterNode.jsx';
import FormulaNode from '../components/nodes/FormulaNode.jsx';
import CalculateNode from '../components/nodes/CalculateNode.jsx';
import OperationNode from '../components/nodes/OperationNode.jsx';

import './text-updater-node.css';
import DoubleInputNode from '../components/nodes/CalculateNode.jsx';

const rfStyle = {
  backgroundColor: '#8220a8',
};

const initialNodes = [
  {
    id: 'formula-node-1',
    type: 'formulaNode',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
  {
    id: 'operation-node-1',
    type: 'operationNode',
    position: { x: 50, y: 100 },
    data: { value: 123 },
  },
  {
    id: 'formula-node-2',
    type: 'formulaNode',
    position: { x: 0, y: 200 },
    data: { value: 123 },
  },
  {
    id: 'calculate-node',
    type: 'calculateNode',
    position: { x: 400, y: 50 },
    data: { value: 'No Input Yet' },
  },
];

const initialEdges = [
  // { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
  // { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
];

const isValidConnection = (connection) =>
  (connection.sourceHandle === 'formula-out' &&
    connection.targetHandle === 'calculation') ||
  (connection.sourceHandle === 'formula-out' &&
    connection.targetHandle === 'operation-in') ||
  (connection.sourceHandle === 'operation-out' &&
    connection.targetHandle === 'formula-in');
// const onConnectStart = (_, { nodeId, handleType }) =>
//   console.log('on connect start', { nodeId, handleType });
// const onConnectEnd = (event) => console.log('on connect end', event);

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = {
  // textUpdater: TextUpdaterNode,
  formulaNode: FormulaNode,
  operationNode: OperationNode,
  calculateNode: CalculateNode,
  doubleInputNode: DoubleInputNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Calculator() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialNodes);

  const onConnect = useCallback(
    (connection) => {
      setEdges((eds) => addEdge(connection, eds));
      //console.log(connection);
      // console.log(initialNodes.find(node => node.id === connection.source).data.value);
    },
    [setEdges],
  );

  const callOtherFunction = (n, e) => {
    // console.log(n);
    // console.log(e);
    // console.log(getConnectedEdges(n, e));
    // for (let i = getConnectedEdges(n, e).length - 1; i >= 0; i--) {
    var node_values = [];
    for (let i = 0; i < getConnectedEdges(n, e).length; i++) {
      node_values.push(
        n
          .find((node) => node.id === getConnectedEdges(n, e)[i].source)
          .data.value.trim(),
      );
      // console.log(n.find(node => node.id === getConnectedEdges(n, e)[i].source).data.value);
    }
    // console.log(node_values);
    // console.log(node_values.join(' '));
    return node_values.join(' ');
  };
  const handlePlay = () => {
    const calculateNode = initialNodes[initialNodes.length - 1];

    const makeMathString = (node) => {
      const incomingNodes = getIncomers(node, nodes, edges);
      if (incomingNodes.length == 0) {
        console.log(node.data.value);
        return node.data.value.toString();
      }
      console.log(incomingNodes);

      let mathString = incomingNodes
        .map((node) => makeMathString(node))
        .join(' ');
      mathString = mathString.concat(node.data.value);
      console.log(mathString);
      return mathString;
    };

    const incomingNodes = getIncomers(calculateNode, nodes, edges);
    const mathString = makeMathString(incomingNodes[0]);
    console.log('Final mathstring');
    console.log(mathString);

    const solution = evaluate(mathString).toFixed(2);

    // set the calculate result to the result of the math
    initialNodes.find((node) => node.id === 'calculate-node').data.value =
      solution;

    document.getElementById('calculate-result').innerHTML = initialNodes.find(
      (node) => node.id === 'calculate-node',
    ).data.value;
  };

  const handlePlays = () => {
    // console.log(initialNodes.find(node => node.id === connection.source).data.value);
    //console.log(initialNodes.find(node => node.id === 'calculate-node'));
    const mathString = callOtherFunction(nodes, edges);
    console.log(mathString);

    // DO MATH HERE WITH THE mathString
    const solution = evaluate(mathString).toFixed(2);

    // set the calculate result to the result of the math
    initialNodes.find((node) => node.id === 'calculate-node').data.value =
      solution;

    document.getElementById('calculate-result').innerHTML = initialNodes.find(
      (node) => node.id === 'calculate-node',
    ).data.value;
    // console.log(allN);
    // const connectedEdges = getConnectedEdges(useNodes(), useEdges());
    // console.log(connectedEdges);
  };

  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow.nodeType');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const name = event.dataTransfer.getData('application/reactflow.name');
      const mathJsInfo = event.dataTransfer.getData(
        'application/reactflow.mathJsInfo',
      );

      // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${name}`, mathJsInfo: mathJsInfo },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  return (
    <main className='flex flex-row'>
      <Sidebar handlePlay={handlePlay} />
      <div style={{ width: '100vw', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          style={rfStyle}>
          <Controls />
          <MiniMap />
          <Background variant='dots' gap={12} size={1} />
        </ReactFlow>
      </div>
    </main>
  );
}
