import React from 'react';
const ActButton = ({ type = 'button', disabled = false, label, handleOnClick }) => {
  const handleClick = e => {
    if (handleOnClick) handleOnClick(e);
  };
  return (
    <div>
      <button type={type} disabled={disabled} onClick={handleClick} className={`${disabled ? 'background-box' : 'background-black'}`}>
        <div className="white padding-4">{label}</div>
      </button>
    </div>
  );
};

export default ActButton;
