import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

export default memo(({ data }) => {
  return (
    <div style={{backgroundColor: "lightblue", border: '2px solid'}} >
      <div style={{ padding: '10px 20px' }}>
        {data.label}
      </div>
      <Handle type="target" position={Position.Left}/>
    </div>
  );
});
