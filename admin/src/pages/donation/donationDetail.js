import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ActEditor from 'components/organisms/Editor';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import { DONATION_MENU_TYPE, MEMBER_TYPE, PAYMENT_MENU_TYPE } from '../../constants/constant';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { downloadFile } from '../../utils/downloadFile';
import ActButton from '../../components/atoms/ActButton';
import ActRadioGroup from '../../components/atoms/ActRadioGroup';

const DonationDetail = () => {
  const navigate = useNavigate();
  const { type = undefined, id = undefined } = useParams();
  if (type === undefined || id === undefined) navigate(-1);
  const { isLoading, isSuccess, data, isError, error, refetch } = useReactQuery(
    `${type === DONATION_MENU_TYPE.ORG ? 'donation-org-detail-' : 'donation-campaign-detail-'}${id}`,
    type === DONATION_MENU_TYPE.ORG ? api.donationOrg.detail(id) : api.donationCampaign.detail(id),
    {
      refetchOnWindowFocus: false,
      staleTime: 2000,
    },
  );
  const { showModal } = useModal();
  const [subscriptionOn, setSubscriptionOn] = useState(data.subscriptionOn || 1);
  const [orderType, setOrderType] = useState(data.active);
  const [donationStatus, setDonationStatus] = useState(data.active && !data.inactivatedAt);

  useEffect(() => {
    console.log('subscriptionOn', subscriptionOn);
  }, [subscriptionOn]);
  const subscriptionOnOptions = [
    { label: '1일', value: 1 },
    { label: '10일', value: 10 },
    { label: '20일', value: 20 },
  ];

  const orderTypeOptions = [
    { label: '일시후원', value: false },
    { label: '정기후원', value: true },
  ];
  const donationStatusOptions = [
    { label: '진행중', value: true },
    { label: '종료', value: false },
  ];

  const [withdrawStatus, setWithdrawStatus] = useState(data.status);
  const withdrawStatusOptions = [
    { label: '지급대기', value: 'PENDING' },
    { label: '지급완료', value: 'COMPLETE' },
  ];
  const handleConfirm = type => {
    request({
      url: type === DONATION_MENU_TYPE.ORG ? api.donationOrg.patch(id) : api.donationCampaign.patch(id),
      method: 'patch',
      data: {
        ...data,
        status: withdrawStatus,
      },
    }).then(() => navigate(-1));
  };
  const handleDelete = type => {
    showModal({
      open: true,
      message: {
        type: 'text',
        content: '삭제하시겠습니까?',
      },
      handleConfirm: () => {
        request({
          url: type === DONATION_MENU_TYPE.ORG ? api.donationOrg.delete(id) : api.donationCampaign.delete(id),
          method: 'delete',
        });
      },
      handleCancel: () => {
        console.log('cancel delete ');
      },
    });
  };

  const showImageModal = address => {
    showModal({
      open: true,
      message: {
        type: 'image',
        content: (
          <div className="max-width max-height">
            <img className="display-block object-fit-cover max-width auto-height" src={address} />
          </div>
        ),
      },
    });
  };

  const onHandleClickDownload = async url => {
    await downloadFile(url);
  };

  const renderItem = ({ title, content, link = false, onClickHandler }) => {
    return (
      <div className="flex-1">
        <div className="flex-1 padding-16 row align-center background-box justify-center">{title}</div>
        <div className={`${link && 'underlined-link'} flex-1 align-center padding-16 row`} onClick={() => link && onClickHandler()}>
          {content}
        </div>
      </div>
    );
  };

  const renderColumn = donationType => {
    return donationType === DONATION_MENU_TYPE.ORG ? (
      <div className="col">
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '후원시작일시', content: dayjs(data.startedAt).format('YYYY.MM.DD') })}</div>
            <div className="flex-1">{renderItem({ title: '후원ID', content: data._id })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '후원종료일시', content: data.active ? '-' : dayjs(data.inactivatedAt).format('YYYY.MM.DD') })}</div>
            <div className="flex-1">{renderItem({ title: '후원자ID', content: data.user?.email || '' })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '단체명', content: data.org?.name })}</div>
            <div className="flex-1">{renderItem({ title: 'NFT ID', content: '' })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '결제금액', content: data.amount.toLocaleString() })}</div>
            <div className="flex-1">{renderItem({ title: '후원자실명', content: data.user?.indInfo?.name })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 row padding-16 align-center background-box justify-center">정기결제일</div>
              <div className="flex-1 row padding-16">
                <ActRadioGroup options={subscriptionOnOptions} state={subscriptionOn} setState={setSubscriptionOn} />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex-1 row padding-16 align-center background-box justify-center">후원형태</div>
              <div className="flex-1 row padding-16">
                <ActRadioGroup options={orderTypeOptions} state={orderType} setState={setOrderType} disabled={true} />
              </div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '정기후원횟수', content: '' })}</div>
            <div className="flex-1">
              <div className="flex-1 row padding-16 align-center background-box justify-center">정기후원상태</div>
              <div className="flex-1 row padding-16">
                <ActRadioGroup options={donationStatusOptions} state={donationStatus} setState={setDonationStatus} disabled={!data.isRecurring} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="col">
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '후원시작일시', content: dayjs(data.startedAt).format('YYYY.MM.DD') })}</div>
            <div className="flex-1">{renderItem({ title: '후원자ID', content: data.user.email })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '후원종료일시', content: dayjs(data.startedAt).format('YYYY.MM.DD') })}</div>
            <div className="flex-1">{renderItem({ title: 'NFT ID', content: '' })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '단체명', content: data.org?.name })}</div>
            <div className="flex-1">{renderItem({ title: '후원자실명', content: data.user?.indInfo?.name })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '캠페인명', content: data.campaign.title })}</div>
            <div className="flex-1">{renderItem({ title: '후원형태', content: '일시후원' })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '결제금액', content: data.amount.toLocaleString() })}</div>
            <div className="flex-1">{renderItem({ title: '', content: '' })}</div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="col gap-16">
      {renderColumn(type)}
      <div className="divider-thick-primary-4" />
      <div className="row">
        <div className="flex-1 align-center justify-start">
          <ActButton label={<div className="padding-row-24">삭제</div>} handleOnClick={() => handleDelete(type)} />
        </div>
        <div className="flex-1 align-center justify-center">
          <ActButton label={<div className="padding-row-24">확인</div>} handleOnClick={() => handleConfirm(type)} />
        </div>
        <div className="flex-1" />
      </div>
    </div>
  );
};
export default DonationDetail;
