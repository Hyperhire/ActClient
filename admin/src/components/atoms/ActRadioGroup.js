import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function ActRadioGroup({ options, state, setState }) {
  const handleChange = event => {
    // setValue(event.target.value);
    setState(event.target.value);
  };
  return (
    <FormControl>
      <RadioGroup row aria-labelledby="demo-controlled-radio-buttons-group" name="controlled-radio-buttons-group" value={state} onChange={handleChange}>
        {options.map((option, index) => {
          return <FormControlLabel key={index} value={option.value} control={<Radio />} label={option.label} />;
        })}
      </RadioGroup>
    </FormControl>
  );
}
