import React from 'react';
const ActButton = ({ label, handleOnClick }) => {
  return (
    <button onClick={handleOnClick} className="height-40 padding-row-12 padding-col-8 bottom-16 border-none border-radius-10 background-primary white background-primary-hover link">
      <div>{label}</div>
    </button>
  );
};
export default ActButton;
