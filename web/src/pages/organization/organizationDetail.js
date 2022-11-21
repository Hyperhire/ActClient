import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ActButton from '../../components/atoms/ActButton';

const OrganizationDetail = ({ setOption }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setOption({ title: '기부 단체', subtitle: '', description: '', back: true, menu: false });
  }, [setOption]);

  return (
    <div className="col">
      {`OrganizationDetail ${id}`}
      <ActButton handleOnClick={() => navigate(`donation`)} label="후원하기" />
    </div>
  );
};
export default OrganizationDetail;
