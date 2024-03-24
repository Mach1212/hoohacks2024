import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export default function CloseNode({ data, isConnectable }) {
  data.value = ')'

  return (
    <div className="text-updater-node">
      {/* <Handle type="target" position={Position.Top} isConnectable={isConnectable} /> */}
      <div>
        <label htmlFor="text">)</label>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="operation-in"
        // style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Right} id="formula-out" isConnectable={isConnectable} />
    </div>
  );
}
