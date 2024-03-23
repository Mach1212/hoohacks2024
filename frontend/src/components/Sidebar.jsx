import { IconButton, Select } from '@mui/material';
import React from 'react';
import SaveIcon from '@mui/icons-material/Save';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import { Option } from '@mui/base/Option';

export default function Sidebar() {
  return (
    <section className='p-10 max-w-[250px] bg-[#757575] rounded'>
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
      <Select>
        <Select defaultValue={10}>
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>
      </Select>
    </section>
  );
}
