import React, { forwardRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import ActCheckBox from './ActCheckBox';

const ActCheckBoxGroup = (props, ref) => {
  const { control, id, items, label, handleChangeChild, handleChange, errors } = props;
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 0 }}>
      {items.map((item, index) => {
        return <ActCheckBox key={item.label + index} checked={item.checked} disabled={true} handleChecked={e => handleChangeChild(e, item.key)} label={item.label} />;
      })}
    </Box>
  );

  return (
    <div ref={ref} className="act-check-box-group">
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange } }) => (
          <ActCheckBox
            checked={items.every(item => item.checked)}
            handleChecked={e => {
              handleChange(e);
              onChange(e.target.checked);
            }}
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
