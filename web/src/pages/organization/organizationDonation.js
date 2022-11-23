import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ActButton from '../../components/atoms/ActButton';

const OrganizationDonation = ({ setOption }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setOption({ title: '후원하기', subtitle: '{후원단체}', description: '', back: true, menu: false });
  }, [setOption]);
  return (
    <div className="col">
      OrganizationDonation
      <ActButton handleOnClick={() => navigate(`./../payment`, { state: { type: 0, amount: 0 } })} label="결제하기" />
    </div>
  );
};
export default OrganizationDonation;
