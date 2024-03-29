import React, { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import ActButton from 'components/atoms/ActButton';
import ActToggleButton from 'components/atoms/ActToggleButton';
import { donationCampaignYup, donationOrganizationYup } from 'utils/yupSchema';
import { ReactComponent as SubscriptionIcon } from 'styles/assets/icons/label/regular_scheduled.svg';
import { ReactComponent as SingleIcon } from 'styles/assets/icons/label/temp.svg';
import { ReactComponent as DotGray } from 'styles/assets/icons/dots/gray.svg';
import kakkoPaymentIcon from 'styles/assets/images/icons/payment_kakao_logo.png';
import NaverPaymentIcon from 'styles/assets/images/icons/payment_naver_logo.png';

import { DONATION_PAYMENT_TYPE, DONATION_TYPE, PAYMENT_PG_TYPE } from 'constants/constant';
import { request } from 'utils/axiosClient';
import { api } from 'repository';
import ActSpinner from '../../components/atoms/ActSpinner';
import useModal from '../../hooks/useModal';

const Donation = ({ setOption }) => {
  const { showModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const { type, item } = location.state;
  useEffect(() => {
    if (!location.state) navigate('/', { replace: true });
  }, [location.state, navigate]);

  useEffect(() => {
    setOption({ title: type === DONATION_TYPE.ORGANIZATION ? '단체 후원하기' : '캠페인 후원하기', subtitle: item.title, description: '', back: true, menu: false, date: true });
  }, [setOption]);

  const [donationType, setDonationType] = useState(undefined);
  const [donationAmount, setDonationAmount] = useState(undefined);
  const [donationDate, setDonationDate] = useState(undefined);
  const [pgType, setPgType] = useState(undefined);

  const DonationCampaignForm = {
    donationType: undefined,
    donationAmount: undefined,
    donationDate: undefined,
  };

  const DonationOrganizationForm = {
    ...DonationCampaignForm,
    donationDate: undefined,
  };

  const formOptions = {
    mode: 'onChange',
    defaultValues: type === DONATION_TYPE.CAMPAIGN ? DonationCampaignForm : DonationOrganizationForm,
    resolver: yupResolver(type === DONATION_TYPE.CAMPAIGN ? donationCampaignYup : donationOrganizationYup),
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isValid, isSubmitting, errors },
  } = useForm(formOptions);

  useEffect(() => {
    if (donationType === DONATION_PAYMENT_TYPE.SINGLE) {
      setValue('donationDate', undefined, { shouldValidate: true });
    }
  }, [donationType]);

  const onSubmit = data => {
    if (data.pg === PAYMENT_PG_TYPE.NAVER) {
      showModal({
        open: true,
        message: `현재 카카오페이만 지원합니다.`,
      });
      return;
    }
    let paymentData;
    paymentData = {
      targetType: type,
      targetId: item._id,
      pg: data.pg,
      paymentType: data.donationType,
      amount: data.donationAmount,
    };
    if (data.donationType === DONATION_PAYMENT_TYPE.SUBSCRIPTION) {
      paymentData = { ...paymentData, subscriptionOn: data.donationDate };
    }

    const isMobile = navigator.userAgent.indexOf('Mobi') > -1;
    request({
      url: api.order.make,
      method: 'post',
      data: paymentData,
    })
      .then(response => {
        navigate('/redirect', { state: { url: isMobile ? response.data.data.redirectURLS.mobile : response.data.data.redirectURLS.web }, replace: true });
      })
      .catch(() => {
        showModal({
          open: true,
          message: `결제에 실패하였습니다.`,
        });
      });
  };

  const getDonationTypeItems = () => {
    const items = [{ value: DONATION_PAYMENT_TYPE.SINGLE, label: '일시후원' }];
    if (type === DONATION_TYPE.ORGANIZATION) {
      items.unshift({ value: DONATION_PAYMENT_TYPE.SUBSCRIPTION, label: '정기후원' });
    }
    return items;
  };

  const donationAmountItems = [
    { value: 10_000, label: '1만원' },
    { value: 20_000, label: '2만원' },
    { value: 30_000, label: '3만원' },
    { value: 50_000, label: '5만원' },
    { value: 100_000, label: '10만원' },
    { value: 200_000, label: '20만원' },
  ];
  const donationDateItems = [
    { value: 1, label: '1일' },
    { value: 10, label: '10일' },
    { value: 20, label: '20일' },
  ];

  const pgItems = [
    {
      value: PAYMENT_PG_TYPE.KAKAO,
      label: (
        <div className="max-width">
          <img className="display-block max-width object-fit-cover height-30" src={kakkoPaymentIcon} alt="" />
        </div>
      ),
    },
    {
      value: PAYMENT_PG_TYPE.NAVER,
      label: (
        <div className="max-width">
          <img className="display-block max-width object-fit-cover height-30" src={NaverPaymentIcon} alt="" />
        </div>
      ),
    },
  ];

  const getNote = () => {
    const note = ['결제된 금액은 환불되지 않습니다.', '후원한 금액은 국세청 연말정산 간소화 서비스에서 기부금 영수증을 발급 가능합니다.'];
    if (type === DONATION_TYPE.ORGANIZATION) {
      note.unshift('정기후원은 언제든지 해지가 가능합니다.');
    }
    return note;
  };

  return (
    <div className="donation-wrapper">
      <div className="left-24 divider-thick-primary-2" />
      {type === DONATION_TYPE.CAMPAIGN && (
        <div className="donation-campaign-wrapper">
          <div className="donation-campaign-label">캠페인명</div>
          <div className="donation-campaign-title">{item.title}</div>
        </div>
      )}
      <form className="donation-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="donation-form-toggle-wrapper">
          <ActToggleButton
            {...register('donationType')}
            label="후원방식"
            errors={errors}
            control={control}
            items={getDonationTypeItems()}
            id="donationType"
            selectedItem={setDonationType}
            columns={type === DONATION_TYPE.CAMPAIGN ? 1 : 2}
            defaultValue={2}
          />
          <ActToggleButton
            {...register('donationAmount')}
            label="후원금액"
            errors={errors}
            control={control}
            items={donationAmountItems}
            id="donationAmount"
            columns={3}
            selectedItem={setDonationAmount}
          />
          {type === DONATION_TYPE.ORGANIZATION && donationType === DONATION_PAYMENT_TYPE.SUBSCRIPTION && (
            <ActToggleButton
              {...register('donationDate')}
              label="정기 결제일"
              errors={errors}
              control={control}
              items={donationDateItems}
              id="donationDate"
              columns={3}
              selectedItem={setDonationDate}
              disabled={donationType === DONATION_PAYMENT_TYPE.SINGLE}
            />
          )}
          <ActToggleButton {...register('pg')} label="결제방법" errors={errors} control={control} items={pgItems} id="pg" selectedItem={setPgType} columns={2} defaultValue="kakao" />
        </div>
        <div className="divider" />
        {isValid && (
          <div className="donation-form-summary-wrapper">
            <div className="donation-form-summary-chip-wrapper">
              {type === DONATION_TYPE.CAMPAIGN ? <SingleIcon /> : donationType === DONATION_PAYMENT_TYPE.SUBSCRIPTION ? <SubscriptionIcon /> : <SingleIcon />}
            </div>
            <div className="donation-form-summary-amount-wrapper">
              <div className="donation-form-summary-regular-payment">{donationType === DONATION_PAYMENT_TYPE.SUBSCRIPTION && '매월'}</div>
              <div className="donation-form-summary-amount">{donationAmount?.toLocaleString()}원</div>
            </div>
          </div>
        )}
        <div className="padding-24">
          <ActButton type="submit" disabled={!isValid} className="tertiary-button-x-large" label="결제하기" />
        </div>
      </form>
      <div className="donation-note-wrapper">
        {getNote().map((note, index) => {
          return (
            <div className="donation-note-item" key={index}>
              <div className="donation-note-item-icon-wrapper">
                <div className="donation-note-item-icon">
                  <DotGray />
                </div>
              </div>
              <div className="donation-note-item-content flex-1">{note}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Donation;
