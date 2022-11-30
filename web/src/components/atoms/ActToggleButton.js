import React, { forwardRef, useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

const ActToggleButton = props => {
  const { control, id, items, errors } = props;
  const [selected, setSelected] = useState(undefined);

  const handleChange = (event, selectedItem) => {
    setSelected(selectedItem);
  };

  return (
    <div className="act-toggle-button-wrapper">
      <Controller
        name={id}
        control={control}
        render={({ field: { onChange } }) => (
          <ToggleButtonGroup
            fullWidth
            value={selected}
            exclusive
            onChange={(e, selectedItem) => {
              if (selectedItem !== null) {
                handleChange(e, selectedItem);
                onChange(selectedItem);
              }
            }}
          >
            {items?.map(item => {
              return (
                <ToggleButton
                  key={item}
                  value={item}
                  sx={{
                    color: 'black',
                    fontFamily: 'Pretendard',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    '&.Mui-selected, &.Mui-selected:hover': {
                      color: '#949494',
                      borderColor: '#efefef',
                      backgroundColor: '#fafafa',
                    },
                  }}
                >
                  <div>{item}</div>
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        )}
      />
      <ErrorMessage errors={errors} name={id} render={({ message: validMessage }) => <div className="error-text">{validMessage}</div>} />
    </div>
  );
};
export default ActToggleButton;
