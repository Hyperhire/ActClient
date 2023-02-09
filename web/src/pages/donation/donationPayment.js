import React, { Suspense, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import ActButton from 'components/atoms/ActButton';
import { DONATION_PAYMENT_TYPE, DONATION_TYPE } from '../../constants/constant';
import { donationPaymentYup } from '../../utils/yupSchema';
import ActInput from 'components/atoms/ActInput';
import ActCheckBox from 'components/atoms/ActCheckBox';
import { ReactComponent as DotGray } from 'styles/assets/icons/dots/gray.svg';
import { ReactComponent as SubscriptionIcon } from 'styles/assets/icons/label/regular_scheduled.svg';
import { ReactComponent as SingleIcon } from 'styles/assets/icons/label/temp.svg';
import ActSpinner from '../../components/atoms/ActSpinner';
import Logger from 'utils/logger';

const DonationPayment = ({ setOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSaveCardInformation, setIsSaveCardInformation] = useState(false);
  const onHandleChange = (e, id) => {
    setIsSaveCardInformation(e.target.checked);
  };
  useEffect(() => {
    if (!location.state) navigate('/', { replace: true });
  }, [location.state, navigate]);
  const { data } = location.state;
  useEffect(() => {
    setOption({
      title: '결제하기',
      subtitle: '후원 신청하기',
      description: '',
      back: true,
      menu: false,
      chip: data.donationType === DONATION_PAYMENT_TYPE.SUBSCRIPTION ? <SubscriptionIcon /> : <SingleIcon />,
    });
  }, [setOption]);

  const DonationPaymentForm = {
    cardNumber: undefined,
    cardValidDate: undefined,
    cardPassword: undefined,
    cardBirthday: undefined,
    cardCVV: undefined,
    isSaveCardInformation: false,
  };

  const formOptions = {
    mode: 'onChange',
    defaultValues: DonationPaymentForm,
    resolver: yupResolver(donationPaymentYup),
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm(formOptions);
  const onSubmit = data => {
    Logger.log('onSubmit', data);
  };

  const getNote = () => {
    const note = [
      '구독은 매월 정기결제 되는 방식으로, 매월 구독을 한 날짜에 결제가 이루어집니다. 해당 일자가 없는 경우 해당 월의 마지막 날에 결제됩니다. 언제든지 해지가 가능합니다.',
      '후원한 금액은 국세청 연말정산 간소화 서비스에서 기부금 영수증을 발급 가능합니다.',
      '결제된 금액은 환불되지 않습니다.',
    ];
    return note;
  };

  const onNoteClickHandler = () => {
    Logger.log('onNoteClickHandler');
  };
  return (
    <div className="donation-payment-wrapper">
      <div className="donation-payment-info-wrapper">
        <div className="donation-payment-info-content-wrapper">
          <div className="donation-payment-info-label">결제금액</div>
          <div className="donation-payment-info-content">{data?.donationAmount?.toLocaleString()}원</div>
        </div>
        <div className="donation-payment-info-content-wrapper">
          <div className="donation-payment-info-label">결제수단</div>
          <div className="donation-payment-info-content">신용카드</div>
        </div>
      </div>
      <form className="donation-payment-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="donation-payment-form-input-wrapper">
          <ActInput {...register('cardNumber')} id="cardNumber" label="카드번호" placeholder="14-16자리" errors={errors} control={control} maxLength={16} />
          <div className="row gap-16 max-width align-center justify-around">
            <div className="row flex-auto">
              <ActInput {...register('cardValidDate')} id="cardValidDate" label="유효기간" placeholder="MMYY" errors={errors} control={control} maxLength={4} />
            </div>
            <div className="row flex-auto">
              <ActInput {...register('cardPassword')} id="cardPassword" label="카드 비밀번호" placeholder="앞 2자리" errors={errors} control={control} maxLength={2} />
            </div>
          </div>

          <div className="row gap-16 max-width align-center justify-around">
            <div className="row flex-auto">
              <ActInput {...register('cardBirthday')} id="cardBirthday" label="생년월일" placeholder="YYMMDD" errors={errors} control={control} maxLength={6} />
            </div>
            <div className="row flex-auto">
              <ActInput {...register('cardCVV')} id="cardCVV" label="카드 CVV" placeholder="끝 3자리" errors={errors} control={control} maxLength={3} />
            </div>
          </div>
        </div>
        <div className="donation-payment-form-checkbox-wrapper">
          <ActCheckBox
            {...register('isSaveCardInformation')}
            id="isSaveCardInformation"
            label="카드정보 저장하기"
            errors={errors}
            control={control}
            checked={isSaveCardInformation}
            handleChange={onHandleChange}
          />
        </div>
        <div className="donation-payment-note-item-content">
          개인정보(실명,연락처,생년월일)가 없을 경우 결제를 할 수 없습니다. <span onClick={onNoteClickHandler}>프로필 수정 페이지</span>에서 개인정보를 업데이트 해주세요
        </div>
        <ActButton type="submit" disabled={!isValid} className="tertiary-button-x-large" label="결제하기" />
        <div className="donation-payment-note-wrapper">
          {getNote().map((note, index) => {
            return (
              <div className="donation-payment-note-item" key={index}>
                <div className="donation-payment-note-item-icon-wrapper">
                  <div className="donation-payment-note-item-icon">
                    <DotGray />
                  </div>
                </div>
                <div className="donation-payment-note-item-content flex-1">{note}</div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};
export default DonationPayment;
