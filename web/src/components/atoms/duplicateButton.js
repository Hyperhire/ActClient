import React, { useState } from 'react';
import ActButton from './ActButton';

const DuplicateButton = ({ id, label, resultCallBack, disabled = true }) => {
  const [valid, setValid] = useState(true);
  const checkDuplicated = () => {
    setTimeout(() => {
      setValid(true);
      resultCallBack({ result: true, message: '사용가능!' });
    }, 1);
  };
  return <ActButton className="button-small" label={label} disabled={disabled} handleOnClick={checkDuplicated} />;
};
export default DuplicateButton;
