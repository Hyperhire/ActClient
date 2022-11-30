import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getItem, USER_INFO } from 'utils/sessionStorage';
import DonationListItem from 'components/organisms/DonationListItem';
import ActTab from 'components/atoms/ActTab';
import { DONATION_HISTORY_TYPE } from 'constants/constant';

const DonationHistory = ({ setOption }) => {
  const navigate = useNavigate();
  const userInfo = getItem(USER_INFO);
  useEffect(() => {
    setOption({ title: '후원 내역', subtitle: '', description: '', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);

  const onHandleCancelRecurringPayment = id => {
    console.log('onHandleCancelRecurringPayment', id);
  };

  const onHandleClickNFT = id => {
    console.log('handleClickNFT', id);
  };

  const makeDummy = type => {
    let tmp = [];
    for (let i = 0; i < 20; i++) {
      tmp.push(
        type === DONATION_HISTORY_TYPE.ORGANIZATION
          ? {
              id: i,
              organization: `organization ${i}`,
              startDate: `fromData ${i}`,
              endDate: `endDate ${i}`,
              amount: `amount ${i}`,
              donationType: `donationType ${i}`,
              recurringPaymentDate: `recurringPaymentDate ${i}`,
              donationStatus: `${i % 5 && 'cancel'}`,
            }
          : {
              id: i,
              organization: `organization ${i}`,
              campaignTitle: `fromData ${i}`,
              startDate: `endDate ${i}`,
              amount: `amount ${i}`,
              donationType: `donationType ${i}`,
            },
      );
    }
    return tmp;
  };

  const data = [
    {
      index: 0,
      label: '단체후원',
      list: makeDummy(DONATION_HISTORY_TYPE.ORGANIZATION).map((item, index) => {
        return (
          <>
            <DonationListItem
              type={DONATION_HISTORY_TYPE.ORGANIZATION}
              key={index}
              item={item}
              handleCancelRecurringPayment={id => onHandleCancelRecurringPayment(id)}
              handleClickNFT={id => onHandleClickNFT(id)}
            />
            {index !== makeDummy(DONATION_HISTORY_TYPE.ORGANIZATION).length && <div className="divider" />}
          </>
        );
      }),
    },
    {
      index: 1,
      label: '캠페인후원',
      list: makeDummy(DONATION_HISTORY_TYPE.CAMPAIGN).map((item, index) => {
        return (
          <>
            <DonationListItem
              type={DONATION_HISTORY_TYPE.CAMPAIGN}
              key={index}
              item={item}
              handleCancelRecurringPayment={id => onHandleCancelRecurringPayment(id)}
              handleClickNFT={id => onHandleClickNFT(id)}
            />
            {index !== makeDummy(DONATION_HISTORY_TYPE.CAMPAIGN).length && <div className="divider" />}
          </>
        );
      }),
    },
  ];

  return (
    <div className="col">
      <ActTab data={data} />
    </div>
  );
};
export default DonationHistory;
