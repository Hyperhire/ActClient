import React, { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import { ReactComponent as Down } from 'styles/assets/icons/dropdown/down.svg';

const BasicSelect = ({ selectedValue, setSelectedValue, options }) => {
  const handleChange = event => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <Select input={<OutlinedInput />} value={selectedValue} onChange={handleChange} inputProps={{ 'aria-label': 'Without label' }}>
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default BasicSelect;
