import React, { forwardRef } from 'react';

import ActInput from './ActInput';

const ActSelect = props => {
  const { register, id } = props;
  const style = {
    '& .MuiSelect-outlined': {
      '&.MuiSelect-select': {
        padding: 1,
      },
    },
  };
  return <ActInput {...register(id)} type="select" style={style} {...props} />;
};

export default ActSelect;
