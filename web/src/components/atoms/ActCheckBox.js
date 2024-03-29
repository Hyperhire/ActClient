import React, { forwardRef, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { ReactComponent as CheckedIcon } from 'styles/assets/icons/checked.svg';

const ActCheckBox = (props, ref) => {
  const {
    control,
    id,
    label,
    labelStyle = { fontFamily: 'Pretendard', fontWeight: 400, fontSize: '0.875rem', color: 'black' },
    errors,
    disabled,
    checked = false,
    handleChange,
    item,
    hideError = false,
  } = props;
  return (
    <div ref={ref} className="act-check-box-wrapper">
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange } }) => (
          <FormControlLabel
            control={
              <Checkbox
                icon={<div className="act-check-box-icon" />}
                checkedIcon={
                  <div className="act-check-box-checked-icon">
                    <CheckedIcon />
                  </div>
                }
                checked={!!checked}
                onChange={e => {
                  onChange(item ? { ...item, checked: e.target.checked } : e.target.checked);
                  handleChange && handleChange(e, id);
                }}
                disabled={disabled}
                sx={{ padding: 0.5, paddingLeft: 2 }}
              />
            }
            label={label && label}
            sx={{
              '.MuiFormControlLabel-label': {
                ...labelStyle,
              },
            }}
          />
        )}
      />
      {!hideError && <ErrorMessage errors={errors} name={id} render={({ message: validMessage }) => <div className="red font-size-10">{validMessage}</div>} />}
    </div>
  );
};
export default forwardRef(ActCheckBox);
