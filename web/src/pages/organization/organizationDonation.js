import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import ActButton from 'components/atoms/ActButton';
import ActToggleButton from 'components/atoms/ActToggleButton';
import { donationOrganization } from 'utils/yupSchema';
import { ReactComponent as RecurringPaymentIcon } from 'styles/assets/icons/label/regular_scheduled.svg';
import { ReactComponent as TempIcon } from 'styles/assets/icons/label/temp.svg';
import { ReactComponent as DotGray } from 'styles/assets/icons/dots/gray.svg';

const OrganizationDonation = ({ setOption }) => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!location.state) navigate('/', { replace: true });
  }, [location.state, navigate]);
  useEffect(() => {
    setOption({ title: '단체 후원하기', subtitle: location.state.organization, description: '', back: true, menu: false, date: true });
  }, [setOption]);

  const [donationType, setDonationType] = useState(undefined);
  const [donationAmount, setDonationAmount] = useState(undefined);
  const [donationDate, setDonationDate] = useState(undefined);

  const DonationOrganizationForm = {
    donationType: 're',
    donationAmount: '',
    donationDate: '',
  };
  const formOptions = { mode: 'onChange', defaultValues: DonationOrganizationForm, resolver: yupResolver(donationOrganization) };

  const {
    control,
    register,
    handleSubmit,
    getFieldState,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);

  useEffect(() => {
    console.log('isValid', isValid);
  }, [isValid]);
  const onSubmit = data => {
    console.log('onSubmit', data);
    // navigate(`payment`, { state: { type: 0, amount: 0 } });
  };

  const donationTypeItem = [
    { value: 1, label: '정기후원' },
    { value: 2, label: '일시후원' },
  ];
  const donationAmountItem = [
    { value: 10_000, label: '1만원' },
    { value: 20_000, label: '2만원' },
    { value: 30_000, label: '3만원' },
    { value: 50_000, label: '5만원' },
    { value: 100_000, label: '10만원' },
    { value: 200_000, label: '20만원' },
  ];
  const donationDateItem = [
    { value: 1, label: '1일' },
    { value: 10, label: '10일' },
    { value: 20, label: '20일' },
  ];

  const notes = ['정기후원은 언제든지 해지가 가능합니다.', '결제된 금액은 환불되지 않습니다.', '후원한 금액은 국세청 연말정산 간소화 서비스에서 기부금 영수증을 발급 가능합니다.'];
  return (
    <div className="organization-donation-wrapper">
      <div className="left-24 divider-thick-primary-2" />
      <form className="organization-donation-form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="organization-donation-form-toggle-wrapper">
          <ActToggleButton {...register('donationType')} label="후원방식" errors={errors} control={control} items={donationTypeItem} id="donationType" selectedItem={setDonationType} />
          <ActToggleButton
            {...register('donationAmount')}
            label="후원금액"
            errors={errors}
            control={control}
            items={donationAmountItem}
            id="donationAmount"
            columns={3}
            selectedItem={setDonationAmount}
          />
          <ActToggleButton {...register('donationDate')} label="정기 결제일" errors={errors} control={control} items={donationDateItem} id="donationDate" columns={3} selectedItem={setDonationDate} />
        </div>
        <div className="divider" />
        {isValid && (
          <div className="organization-donation-form-summary-wrapper">
            <div className="organization-donation-form-summary-chip-wrapper">{donationType === 1 ? <RecurringPaymentIcon /> : <TempIcon />}</div>
            <div className="organization-donation-form-summary-amount-wrapper">
              <div className="organization-donation-form-summary-recurring-payment">{donationType === 1 && '매월'}</div>
              <div className="organization-donation-form-summary-amount">{donationAmount.toLocaleString()}원</div>
            </div>
          </div>
        )}
        <ActButton type="submit" disabled={!isValid} className="tertiary-button-x-large" label="결제하기" />
      </form>
      <div className="organization-donation-note-wrapper">
        {notes.map((note, index) => {
          return (
            <div className="organization-donation-note-item" key={index}>
              <div className="organization-donation-note-item-icon-wrapper">
                <div className="organization-donation-note-item-icon">
                  <DotGray />
                </div>
              </div>
              <div className="organization-donation-note-item-content flex-1">{note}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default OrganizationDonation;
