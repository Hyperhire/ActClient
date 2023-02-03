import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FaqDetail from '../../components/organisms/FaqDetail';
const OperationDetail = () => {
  const navigate = useNavigate();
  const { type = undefined, id = undefined } = useParams();
  if (type === undefined || id === undefined) navigate(-1);
  return <FaqDetail id={id} />;
};
export default OperationDetail;
