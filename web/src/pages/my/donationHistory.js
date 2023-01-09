import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { get } from 'react-hook-form';
import DonationListItem from 'components/organisms/DonationListItem';
import ActTab from 'components/atoms/ActTab';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { usersAtom } from '../../state';
import { DONATION_PAYMENT_TYPE, DONATION_STATUS, DONATION_STATUS_VALUE, GENDER, MEMBER_TYPE } from '../../constants/constant';
import OrgDonationListItem from '../../components/organisms/OrgDonationListItem';
import ActSelect from 'components/atoms/ActSelect';
import BasicSelect from '../../components/atoms/BasicSelect';

const DonationHistory = ({ setOption }) => {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const location = useLocation();
  const user = useRecoilValue(usersAtom);
  const [selectedValue, setSelectedValue] = useState(DONATION_STATUS[0].value);

  useEffect(() => {
    setOption({ title: '후원 내역', subtitle: '', description: '', back: true, menu: true });
    return () => setOption({});
  }, [setOption]);
  const { isSuccess, data, refetch } = useReactQuery('donation-history', api.my.donationHistory);

  const unsubscribe = async item => {
    request({
      url: api.order.unsubscribe,
      method: 'post',
      data: { id: item._id },
    })
      .then(res => {
        showModal({
          open: true,
          message: res.status === 200 ? '해지 되었습니다.' : '해지 실패하였습니다.',
        });
      })
      .catch(() => {
        showModal({
          open: true,
          message: '해지 실패하였습니다.',
        });
      })
      .finally(() => {
        refetch();
      });
  };

  const onHandleCancelRegularPayment = item => {
    showModal({
      open: true,
      message: `정말 해지하시겠습니까?`,
      handleConfirm: () => unsubscribe(item),
      handleCancel: () => {},
    });
  };

  const onHandleClickNFT = item => {
    navigate(`/nft`, { state: { item } });
  };
  let currentList = [];
  const getList = () => {
    currentList = [];
    let list;
    switch (selectedValue) {
      case DONATION_STATUS_VALUE.ACTIVE:
        list = data.orgs.filter(item => item.paymentType === DONATION_PAYMENT_TYPE.SUBSCRIPTION && item.active);
        break;

      case DONATION_STATUS_VALUE.INACTIVE:
        list = data.orgs.filter(item => item.paymentType === DONATION_PAYMENT_TYPE.SUBSCRIPTION && !item.active);
        break;

      case DONATION_STATUS_VALUE.SINGLE:
        list = data.orgs.filter(item => item.paymentType === DONATION_PAYMENT_TYPE.SINGLE);
        break;

      default:
        list = data.orgs;
        break;
    }
    return list.length === 0 ? (
      <div className="row align-center justify-center">
        <div>후원 내역이 없습니다.</div>
      </div>
    ) : (
      list.map((item, index) => {
        currentList.push(item);
        return (
          <div key={index}>
            <OrgDonationListItem key={index} item={item} handleCancelRegularPayment={id => onHandleCancelRegularPayment(id)} handleClickNFT={item => onHandleClickNFT(item)} />
            <div className="divider" />
          </div>
        );
      })
    );
  };

  const parseData = [
    {
      index: 0,
      label: '단체후원',
      header: (
        <div className="padding-row-24 padding-top-24">
          <BasicSelect selectedValue={selectedValue} setSelectedValue={setSelectedValue} options={DONATION_STATUS} />
        </div>
      ),
      list:
        user.userType === MEMBER_TYPE.INDIVIDUAL
          ? data.orgs.map((item, index) => {
              return (
                <div key={index}>
                  <DonationListItem key={index} item={item} handleCancelRegularPayment={id => onHandleCancelRegularPayment(id)} handleClickNFT={item => onHandleClickNFT(item)} />
                  <div className="divider" />
                </div>
              );
            })
          : getList(),
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

  return (
    <div className="donation-history-wrapper">
      {isSuccess && data && (
        <>
          <ActTab initialTab={location.state?.type} data={parseData} />
          {user.userType === MEMBER_TYPE.ORGANIZATION && (
            <div className="donation-history-footer-wrapper">
              <div className="donation-history-footer-item-wrapper">
                <div className="donation-history-footer-item-label">누적 총 후원금액</div>
                <div className="donation-history-footer-item-content">{`${(data.orgs.reduce((a, b) => a + b.amount, 0) + data.campaigns.reduce((a, b) => a + b.amount, 0)).toLocaleString()}원`}</div>
              </div>
              <div className="donation-history-footer-item-wrapper">
                <div className="donation-history-footer-item-label">단체 정기후원/일반후원 건수</div>
                <div className="donation-history-footer-item-content">{`${data.orgs.filter(item => item.paymentType === DONATION_PAYMENT_TYPE.SUBSCRIPTION).length}/${
                  data.orgs.filter(item => item.paymentType === DONATION_PAYMENT_TYPE.SINGLE).length
                } 건`}</div>
              </div>
              <div className="donation-history-footer-item-wrapper">
                <div className="donation-history-footer-item-label">단체 정기후원금액(진행중)</div>
                <div className="donation-history-footer-item-content">{`${data.orgs
                  .filter(item => item.paymentType === DONATION_PAYMENT_TYPE.SUBSCRIPTION && item.active)
                  .reduce((a, b) => a + b.amount, 0)
                  .toLocaleString()}(${data.orgs.filter(item => item.paymentType === DONATION_PAYMENT_TYPE.SUBSCRIPTION && item.active).length}건)`}</div>
              </div>
              <div className="donation-history-footer-item-wrapper">
                <div className="donation-history-footer-item-label">캠페인 후원</div>
                <div className="donation-history-footer-item-content">{`${data.campaigns.reduce((a, b) => a + b.amount, 0).toLocaleString()}(${data.campaigns.length}건)`}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default DonationHistory;
