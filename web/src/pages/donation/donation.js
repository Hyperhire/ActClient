import React, { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import ActButton from 'components/atoms/ActButton';
import ActToggleButton from 'components/atoms/ActToggleButton';
import { donationCampaignYup, donationOrganizationYup } from 'utils/yupSchema';
import { ReactComponent as RegularIcon } from 'styles/assets/icons/label/regular_scheduled.svg';
import { ReactComponent as TempIcon } from 'styles/assets/icons/label/temp.svg';
import { ReactComponent as DotGray } from 'styles/assets/icons/dots/gray.svg';
import { DONATION_PAYMENT_TYPE, DONATION_TYPE } from 'constants/constant';
import { requestKakao } from 'utils/axiosClient';
import { api } from 'repository';
import ActSpinner from '../../components/atoms/ActSpinner';

const Donation = ({ setOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { type, organization, campaign = '' } = location.state;

  useEffect(() => {
    if (!location.state) navigate('/', { replace: true });
  }, [location.state, navigate]);

  useEffect(() => {
    setOption({ title: type === DONATION_TYPE.ORGANIZATION ? '단체 후원하기' : '캠페인 후원하기', subtitle: organization, description: '', back: true, menu: false, date: true });
  }, [setOption]);

  const [donationType, setDonationType] = useState(undefined);
  const [donationAmount, setDonationAmount] = useState(undefined);
  const [donationDate, setDonationDate] = useState(undefined);

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
    formState: { isValid, isSubmitting, errors },
  } = useForm(formOptions);
  let status = 'pending';
  let result;

  const onSubmit = data => {
    console.log('onSubmit', data);
    // navigate(`payment`, { state: { data } });
    const paymentData = {
      cid: 'TC0ONETIME',
      partner_order_id: '1',
      partner_user_id: 'lucas',
      item_name: '일시 후원',
      quantity: 1,
      total_amount: 100000,
      tax_free_amount: 100000,
      approval_url: 'https://www.act-donation.co.kr/payment-success',
      cancel_url: 'https://www.act-donation.co.kr/payment-cancel',
      fail_url: 'https://www.act-donation.co.kr/payment-fail',
      payment_method_type: 'CARD',
    };

    const rk = requestKakao({
      url: api.payment.kakao,
      method: 'post',
      headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`, 'Content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      data: paymentData,
    }).then(
      response => {
        status = 'success';
        result = response;
        /* response
         * {
         * "tid": "T1234567890123456789",
         *  "next_redirect_app_url": "https://mockup-pg-web.kakao.com/v1/xxxxxxxxxx/aInfo",
         *  "next_redirect_mobile_url": "https://mockup-pg-web.kakao.com/v1/xxxxxxxxxx/mInfo",
         *  "next_redirect_pc_url": "https://mockup-pg-web.kakao.com/v1/xxxxxxxxxx/info",
         *  "android_app_scheme": "kakaotalk://kakaopay/pg?url=https://mockup-pg-web.kakao.com/v1/xxxxxxxxxx/order",
         *  "ios_app_scheme": "kakaotalk://kakaopay/pg?url=https://mockup-pg-web.kakao.com/v1/xxxxxxxxxx/order",
         *  "created_at": "2016-11-15T21:18:22"
         * }
         */
        // navigate('/redirect', { state: { url: response.data.next_redirect_mobile_url } }, { replace: true });
      },
      e => {
        status = 'error';
        result = e;
      },
    );
    return {
      read() {
        if (status === 'pending') {
          throw rk;
        } else if (status === 'error') {
          throw result;
        } else if (status === 'success') {
          return result;
        }
      },
    };
  };

  const getDonationTypeItems = () => {
    const items = [{ value: DONATION_PAYMENT_TYPE.TEMP, label: '일시후원' }];
    if (type === DONATION_TYPE.ORGANIZATION) {
      items.unshift({ value: DONATION_PAYMENT_TYPE.REGULAR, label: '정기후원' });
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

  const getNote = () => {
    const note = ['결제된 금액은 환불되지 않습니다.', '후원한 금액은 국세청 연말정산 간소화 서비스에서 기부금 영수증을 발급 가능합니다.'];
    if (type === DONATION_TYPE.ORGANIZATION) {
      note.unshift('정기후원은 언제든지 해지가 가능합니다.');
    }
    return note;
  };

  return (
    <Suspense fallback={<ActSpinner />}>
      <div className="donation-wrapper">
        <div className="left-24 divider-thick-primary-2" />
        {type === DONATION_TYPE.CAMPAIGN && (
          <div className="donation-campaign-wrapper">
            <div className="donation-campaign-label">캠페인명</div>
            <div className="donation-campaign-title">{campaign}</div>
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
            {type === DONATION_TYPE.ORGANIZATION && (
              <ActToggleButton
                {...register('donationDate')}
                label="정기 결제일"
                errors={errors}
                control={control}
                items={donationDateItems}
                id="donationDate"
                columns={3}
                selectedItem={setDonationDate}
                disabled={donationType === DONATION_PAYMENT_TYPE.TEMP}
              />
            )}
          </div>
          <div className="divider" />
          {isValid && (
            <div className="donation-form-summary-wrapper">
              <div className="donation-form-summary-chip-wrapper">
                {type === DONATION_TYPE.CAMPAIGN ? <TempIcon /> : donationType === DONATION_PAYMENT_TYPE.REGULAR ? <RegularIcon /> : <TempIcon />}
              </div>
              <div className="donation-form-summary-amount-wrapper">
                <div className="donation-form-summary-regular-payment">{donationType === DONATION_PAYMENT_TYPE.REGULAR && '매월'}</div>
                <div className="donation-form-summary-amount">{donationAmount?.toLocaleString()}원</div>
              </div>
            </div>
          )}
          <div className="padding-row-24">
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
    </Suspense>
  );
};
export default Donation;
