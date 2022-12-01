import React from 'react';
import { ReactComponent as Give } from 'styles/assets/icons/label/give.svg';
const ActButton = ({ type = 'button', className = 'button-medium', label, handleOnClick, disabled, isDonation = false }) => {
  return (
    <div className="act-button">
      <button type={type} disabled={disabled} onClick={handleOnClick} className={`${className && className}`}>
        <div>{label}</div>
      </button>
      {isDonation && (
        <div className="act-button-chip">
          <Give />
        </div>
      )}
    </div>
  );
};
export default ActButton;
