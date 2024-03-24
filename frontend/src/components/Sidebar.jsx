import { IconButton, MenuItem, Select, Typography } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { Option } from '@mui/base/Option';
import { useEdgesState, useNodesState } from 'reactflow';

const functions = [
  { name: 'sin', type: 'formulaNode', mathJsInfo: 'sin(first)' },
  {
    name: 'cos',
    type: 'formulaNode',
    mathJsInfo: 'cos($1)',
  },
  {
    name: 'number',
    type: 'formulaNode',
    mathJsInfo: 'cos($1)',
  },
  {
    name: 'operation',
    type: 'operationNode',
    mathJsInfo: 'cos($1)',
  },
];

export default function Sidebar({ handlePlay }) {
  const onDragStart = (event, nodeData) => {
    event.dataTransfer.setData('application/reactflow.nodeType', nodeData.type);
    event.dataTransfer.setData('application/reactflow.name', nodeData.name);
    event.dataTransfer.setData(
      'application/reactflow.mathJsInfo',
      nodeData.mathJsInfo,
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <section className={'p-10 w-full max-w-[250px] bg-[#707070] rounded'}>
      <div className='flex flex-row justify-between'>
        <div>
          <IconButton className='bg-white rounded'>
            <AddIcon />
          </IconButton>
        </div>
        <IconButton className='bg-white rounded'>
          <SaveIcon />
        </IconButton>
        <IconButton className='bg-white rounded' onClick={handlePlay}>
          <PlayArrowIcon />
        </IconButton>
      </div>
      <Select className='w-full mt-10 bg-white' value={10}>
        <MenuItem value={10}>Values</MenuItem>
        <MenuItem value={20}>Functions</MenuItem>
      </Select>
      <div className='flex flex-col w-full mt-4 gap-4'>
        {functions.map((data) => (
          <Typography
            key={data.name}
            variant='body1'
            className='bg-white rounded w-full text-center py-4'
            onDragStart={(event) => onDragStart(event, data)}
            draggable>
            {data.name}
          </Typography>
        ))}
      </div>
    </section>
  );
}
