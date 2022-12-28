import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DonationListItem from 'components/organisms/DonationListItem';
import ActTab from 'components/atoms/ActTab';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import useModal from '../../hooks/useModal';

const DonationHistory = ({ setOption }) => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const location = useLocation();

  useEffect(() => {
    setOption({ title: '후원 내역', subtitle: '', description: '', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);
  const { isSuccess, data } = useReactQuery('donation-history', api.my.donationHistory);
  const onHandleCancelRegularPayment = id => {
    showModal({
      open: true,
      message: `정말 해지하시겠습니까?`,
      handleConfirm: () => console.log('yes'),
    });
  };

  const onHandleClickNFT = item => {
    navigate(`../nft`, { state: { item } });
  };

  const parseData = [
    {
      index: 0,
      label: '단체후원',
      list: data.orgs.map((item, index) => {
        return (
          <div key={index}>
            <DonationListItem key={index} item={item} handleCancelRegularPayment={id => onHandleCancelRegularPayment(id)} handleClickNFT={id => onHandleClickNFT(id)} />
            <div className="divider" />
          </div>
        );
      }),
    },
    {
      index: 1,
      label: '캠페인후원',
      list: data.campaigns.map((item, index) => {
        return (
          <div key={index}>
            <DonationListItem key={index} item={item} handleCancelRegularPayment={id => onHandleCancelRegularPayment(id)} handleClickNFT={item => onHandleClickNFT(item)} />
            <div className="divider" />
          </div>
        );
      }),
    },
  ];

  return <div className="col">{isSuccess && <ActTab initialTab={location.state?.type} data={parseData} />}</div>;
};
export default DonationHistory;
