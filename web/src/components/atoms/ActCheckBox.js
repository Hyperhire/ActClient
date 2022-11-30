import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ReactComponent as CheckedIcon } from 'styles/assets/icons/checked.svg';

const ActCheckBox = props => {
  const { label, checked = false, disabled, handleChecked } = props;
  return (
    <FormControlLabel
      control={
        <Checkbox
          icon={<div className="act-check-box-icon" />}
          checkedIcon={
            <div className="act-check-box-checked-icon">
              <CheckedIcon />
            </div>
          }
          checked={checked}
          onChange={handleChecked}
          disabled={disabled}
        />
      }
      label={label && label}
    />
  );
};
export default ActCheckBox;
