import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ActButton from '../../components/atoms/ActButton';

const OrganizationPayment = ({ setOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) navigate('/', { replace: true });
  }, [location.state, navigate]);
  useEffect(() => {
    setOption({ title: '결제하기', subtitle: '후원 신청하기', description: '', back: true, menu: false });
  }, [setOption]);
  return (
    <div className="col">
      OrganizationPayment
      <ActButton handleOnClick={() => alert(`결제모듈 연동`)} label="결제하기" />
    </div>
  );
};
export default OrganizationPayment;
