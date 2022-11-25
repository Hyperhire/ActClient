import React, { forwardRef } from 'react';

import ActInput from './ActInput';

const ActSelect = props => {
  const { register, id } = props;
  return <ActInput {...register(id)} type="select" {...props} />;
};

export default ActSelect;
