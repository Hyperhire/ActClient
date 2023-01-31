import React from 'react';
import { ReactComponent as Act } from 'styles/assets/icons/logo/act.svg';

const ActSpinner = ({ size = '1rem', value }) => {
  return (
    <div className="act-spinner-wrapper">
      <div className="act-spinner">
        <Act />
      </div>
    </div>
  );
};

export default ActSpinner;
