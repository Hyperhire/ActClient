import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, USER_INFO } from 'utils/sessionStorage';
import DonationListItem from 'components/organisms/DonationListItem';
import ActTab from 'components/atoms/ActTab';
import { DONATION_TYPE } from 'constants/constant';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';

const DonationHistory = ({ setOption }) => {
  const navigate = useNavigate();
  const userInfo = getItem(USER_INFO);
  useEffect(() => {
    setOption({ title: '후원 내역', subtitle: '', description: '', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);
  const { isSuccess, data } = useReactQuery('donation-history', api.my.donationHistory);

  const onHandleCancelRegularPayment = id => {
    console.log('onHandleCancelRegularPayment', id);
  };

  const onHandleClickNFT = id => {
    console.log('handleClickNFT', id);
    navigate(`../nft/${id}`);
  };

  const parseData = [
    {
      index: 0,
      label: '단체후원',
      list: data
        .filter(item => item.targetType === 'ORG')
        .map((item, index) => {
          return (
            <div key={index}>
              <DonationListItem
                type={DONATION_TYPE.ORGANIZATION}
                key={index}
                item={item}
                handleCancelRegularPayment={id => onHandleCancelRegularPayment(id)}
                handleClickNFT={id => onHandleClickNFT(id)}
              />
              <div className="divider" />
            </div>
          );
        }),
    },
    {
      index: 1,
      label: '캠페인후원',
      list: data
        .filter(item => item.targetType === 'CAMPAIGN')
        .map((item, index) => {
          return (
            <div key={index}>
              <DonationListItem type={DONATION_TYPE.CAMPAIGN} key={index} item={item} handleCancelRegularPayment={id => onHandleCancelRegularPayment(id)} handleClickNFT={id => onHandleClickNFT(id)} />
              <div className="divider" />
            </div>
          );
        }),
    },
  ];

  return <div className="col">{isSuccess && <ActTab data={parseData} />}</div>;
};
export default DonationHistory;
