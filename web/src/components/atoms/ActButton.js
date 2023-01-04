import React from 'react';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
const ActButton = ({ type = 'button', className = 'button-medium', label, handleOnClick, disabled, isDonating = false, radius = 4 }) => {
  const handleClick = e => {
    if (handleOnClick) handleOnClick(e);
  };
  return (
    <div>
      <button type={type} disabled={disabled} onClick={handleClick} className={`border-radius-${radius} ${className && className} `}>
        <div>{label}</div>
        {isDonating && (
          <div className="act-button-chip">
            <Give />
          </div>
        )}
      </button>
    </div>
  );
};
export default ActButton;
