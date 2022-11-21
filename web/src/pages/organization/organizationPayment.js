import React, { useEffect } from 'react';
import ActButton from '../../components/atoms/ActButton';

const OrganizationPayment = ({ setOption }) => {
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
