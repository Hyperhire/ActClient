import React from 'react';
import { useNavigate } from 'react-router-dom';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Back = ({ size }) => {
  const navigate = useNavigate();

  return (
    <div className="link row left-16 align-center justify-center" onClick={() => navigate(-1)}>
      <ArrowBackIosIcon sx={{ fontSize: size }} />
    </div>
  );
};
export default Back;
