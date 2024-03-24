import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export default function CosNode({ data, isConnectable }) {
  data.value = 'cos'

  return (
    <div className="text-updater-node">
      {/* <Handle type="target" position={Position.Top} isConnectable={isConnectable} /> */}
      <div>
        <label htmlFor="text">cos</label>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="operation-in"
        // style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Right} id="operation-out" isConnectable={isConnectable} />
    </div>
  );
}
