import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

export default function FormulaNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    // console.log(evt.target.value);
    data.value = evt.target.value;
    // console.log(data.value);
  }, []);

  return (
    <div className="text-updater-node">
      {/* <Handle type="target" position={Position.Top} isConnectable={isConnectable} /> */}
      <div>
        <label htmlFor="text">Enter a number</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="formula-in"
        // style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle type="source" position={Position.Right} id="formula-out" isConnectable={isConnectable} />
    </div>
  );
}
