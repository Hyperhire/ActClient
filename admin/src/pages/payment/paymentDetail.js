import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import ActEditor from 'components/organisms/Editor';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import { MEMBER_TYPE, PAYMENT_MENU_TYPE } from '../../constants/constant';
import useModal from '../../hooks/useModal';
import { request } from '../../utils/axiosClient';
import { downloadFile } from '../../utils/downloadFile';
import ActButton from '../../components/atoms/ActButton';
import ActRadioGroup from '../../components/atoms/ActRadioGroup';

const PaymentDetail = () => {
  const navigate = useNavigate();
  const { type = undefined, id = undefined } = useParams();
  if (type === undefined || id === undefined) navigate(-1);
  const { isFetching, isLoading, isSuccess, data, isError, error, refetch } = useReactQuery(
    `${type === PAYMENT_MENU_TYPE.PAYMENT ? 'order-detail-' : 'withdraw-detail-'}${id}`,
    type === PAYMENT_MENU_TYPE.PAYMENT ? api.order.detail(id) : api.withdraw.detail(id),
    {
      refetchOnWindowFocus: false,
      staleTime: 2000,
    },
  );
  const { showModal } = useModal();
  const [orderType, setOrderType] = useState(data?.targetType);
  const [withdrawRequestStatus, setWithdrawRequestStatus] = useState(data?.withdrawRequestStatus);

  const orderTypeOptions = [
    { label: '단체후원', value: 'ORG' },
    { label: '캠페인후원', value: 'CAMPAIGN' },
  ];
  const withdrawRequestStatusOptions = [
    { label: '정산요청대기', value: 'notyet' },
    { label: '정산요청완료', value: 'requested' },
  ];
  const [withdrawStatus, setWithdrawStatus] = useState(data?.status);
  const withdrawStatusOptions = [
    { label: '지급대기', value: 'PENDING' },
    { label: '지급완료', value: 'COMPLETE' },
  ];

  useEffect(() => {
    if (type === PAYMENT_MENU_TYPE.PAYMENT) {
      setWithdrawRequestStatus(data?.withdrawRequestStatus);
    } else {
      setWithdrawStatus(data?.status);
    }
  }, [data]);

  const handleConfirm = type => {
    request({
      url: type === PAYMENT_MENU_TYPE.PAYMENT ? api.order.patch(id) : api.withdraw.patch(id),
      method: 'patch',
      data:
        type === PAYMENT_MENU_TYPE.PAYMENT
          ? {
              withdrawRequestStatus,
            }
          : {
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
          url: type === PAYMENT_MENU_TYPE.PAYMENT ? api.user.delete(id) : api.organization.delete(id),
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
  const renderColumn = paymentType => {
    return paymentType === PAYMENT_MENU_TYPE.PAYMENT ? (
      <div className="col">
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '결제일시', content: data.createdAt })}</div>
            <div className="flex-1">{renderItem({ title: '카드번호', content: data.pg })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '후원자ID(일반회원)', content: data.user.email, link: true, onClickHandler: () => navigate(`/member/individual/${data.userId}`) })}</div>
            <div className="flex-1">{renderItem({ title: '후원자실명', content: data.user?.indInfo?.name || '' })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '후원ID(후원내용)', content: data._id, link: true, onClickHandler: () => navigate(`/donation/${data._id}`) })}</div>
            <div className="flex-1">{renderItem({ title: '결제유형', content: data.pg })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '후원단체명', content: data.org?.name, link: !!data.org?.name })}</div>
            <div className="flex-1">{renderItem({ title: '결제횟수', content: '' })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '결제금액', content: data.amount.toLocaleString() })}</div>
            <div className="flex-1">
              <div className="flex-1 row padding-16 align-center background-box justify-center">결제상태</div>
              <div className="flex-1 row padding-16">
                <ActRadioGroup options={withdrawRequestStatusOptions} state={withdrawRequestStatus} setState={setWithdrawRequestStatus} />
              </div>
            </div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 row padding-16 align-center background-box justify-center">후원형태</div>
              <div className="flex-1 row padding-16">
                <ActRadioGroup options={orderTypeOptions} state={orderType} setState={setOrderType} disabled={true} />
              </div>
            </div>
            <div className="flex-1">{renderItem({ title: '', content: '' })}</div>
          </div>
        </div>
      </div>
    ) : (
      <div className="col">
        <div className="bordered">
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '정산요청일시', content: data?.createdAt })}</div>
            <div className="flex-1">{renderItem({ title: '단체명', content: data?.org.name })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '단체회원ID(단체회원)', content: data.org.email, link: true, onClickHandler: () => navigate(`/member/organization/${data.org._id}`) })}</div>
            <div className="flex-1">{renderItem({ title: '정산요청금액', content: data?.amount || '' })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">{renderItem({ title: '은행', content: data?.org.bankDetail.bankName })}</div>
            <div className="flex-1">{renderItem({ title: '계좌번호', content: data?.org.bankDetail.accountNumber })}</div>
          </div>
          <div className="row border-bottom">
            <div className="flex-1">
              <div className="flex-1 row padding-16 align-center background-box justify-center">정산상태</div>
              <div className="flex-1 row padding-16">
                <ActRadioGroup options={withdrawStatusOptions} state={withdrawStatus} setState={setWithdrawStatus} />
              </div>
            </div>
            <div className="flex-1">{renderItem({ title: '계좌주', content: data?.org.bankDetail.accountHolder })}</div>
          </div>
        </div>
      </div>
    );
  };
  return isFetching || isLoading ? (
    <div>loading...</div>
  ) : (
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
export default PaymentDetail;
