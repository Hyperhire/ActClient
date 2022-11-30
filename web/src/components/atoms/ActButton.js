import React from 'react';
const ActButton = ({ type = 'button', className, label, handleOnClick, disabled }) => {
  return (
    <button type={type} disabled={disabled} onClick={handleOnClick} className={`button-medium ${className && className}`}>
      <div>{label}</div>
    </button>
  );
};
export default ActButton;
