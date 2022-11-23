import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, USER_INFO } from 'utils/sessionStorage';

const DonationHistory = ({ setOption }) => {
  const navigate = useNavigate();
  const userInfo = getItem(USER_INFO);
  useEffect(() => {
    setOption({ title: '', subtitle: '후원 내역', description: '', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);

  return <div className="col">{`DonationHistory ${userInfo.userName}`}</div>;
};
export default DonationHistory;
