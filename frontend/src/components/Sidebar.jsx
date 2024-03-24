import { IconButton, MenuItem, Select, Typography } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { Option } from '@mui/base/Option';
import { useEdgesState, useNodesState } from 'reactflow';

const functions = [
  { name: 'sin', type: 'number', value: '1' },
  {
    name: 'cos',
    type: 'function',
    func: 'cos()',
  },
];

export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    console.log(nodeType);
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <section className={'p-10 w-full max-w-[250px] bg-[#757575] rounded'}>
      <div className='flex flex-row justify-between'>
        <div>
          <IconButton className='bg-white rounded'>
            <AddIcon />
          </IconButton>
        </div>
        <IconButton className='bg-white rounded'>
          <SaveIcon />
        </IconButton>
        <IconButton className='bg-white rounded'>
          <PlayArrowIcon />
        </IconButton>
      </div>
      <Select className='w-full mt-10 bg-white' value={10}>
        <MenuItem value={10}>Values</MenuItem>
        <MenuItem value={20}>Trig</MenuItem>
        <MenuItem value={30}>Statistics</MenuItem>
      </Select>
      <div className='flex flex-col w-full mt-4 gap-4'>
        {functions.map((data) => (
          <Typography
            key={data}
            variant='body1'
            className='bg-white rounded w-full text-center py-4'
            onDragStart={(event) => onDragStart(event, data.name)}
            draggable>
            {data.name}
          </Typography>
        ))}
      </div>
    </section>
  );
}
