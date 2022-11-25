import React, { forwardRef, useState } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const ActCheckBoxGroup = (props, ref) => {
  const { control, id, items, label, handleChangeChild, handleChange, errors } = props;
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0 }}>
      {items.map((item, index) => {
        return <FormControlLabel key={item.label + index} label={item.label} control={<Checkbox disabled checked={item.checked} onChange={e => handleChangeChild(e, item.key)} />} />;
      })}
    </Box>
  );

  return (
    <div className="col max-width align-start justify-center padding-col-8">
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange } }) => (
          <FormControlLabel
            control={
              <Checkbox
                ref={ref}
                checked={items.every(item => item.checked)}
                onChange={e => {
                  handleChange(e);
                  onChange(e.target.checked);
                }}
              />
            }
            label={label}
          />
        )}
      />
      {children}
      <ErrorMessage errors={errors} name={id} render={({ message: validMessage }) => <div className="red font-size-10">{validMessage}</div>} />
    </div>
  );
};

export default forwardRef(ActCheckBoxGroup);
