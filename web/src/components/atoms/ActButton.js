import React from 'react';
const ActButton = ({ type = 'button', label, handleOnClick, disabled }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleOnClick}
      className={`padding-row-12 padding-col-8 border-none border-radius-6 ${disabled ? 'disabled background-neutrals-4 white' : 'background-primary white background-primary-hover link'}`}
    >
      <div>{label}</div>
    </button>
  );
};
export default ActButton;
