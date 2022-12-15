import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { getItem, USER_INFO } from 'utils/sessionStorage';
import PaymentHistoryItem from '../../components/organisms/PaymentHistoryItem';
import ActButton from '../../components/atoms/ActButton';
import useModal from '../../hooks/useModal';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';

const PaymentHistory = ({ setOption }) => {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const userInfo = getItem(USER_INFO);
  const [buttonName, setButtonName] = useState('전체선택');
  const { isSuccess, data } = useReactQuery('payment-history', api.my.paymentHistory);

  const PaymentHistoryForm = {
    deletePaymentItems: isSuccess && data,
  };

  const formOptions = {
    mode: 'onChange',
    defaultValues: PaymentHistoryForm,
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm(formOptions);
  const deletePaymentItemsValues = getValues('deletePaymentItems');
  const { fields, replace } = useFieldArray({
    control,
    name: 'deletePaymentItems',
  });

  const confirmDeleteItems = items => {
    showModal({
      open: true,
      message: `전체결제내역을 삭제하시겠습니까?`,
      handleConfirm: () => deleteItems(items),
      handleCancel: onCancelConfirm,
    });
  };

  const onCancelConfirm = () => {
    console.log('onCancelConfirm');
  };

  const deleteItems = items => {
    console.log('deleteItems', isValid, items);
  };

  useEffect(() => {
    setButtonName(deletePaymentItemsValues.every(field => field.checked) ? '선택해제' : '전체선택');
  }, [deletePaymentItemsValues]);

  const onClickCheckAll = () => {
    if (getValues('deletePaymentItems').every(field => field.checked)) {
      replace(
        fields.map(field => {
          return { ...field, checked: false };
        }),
      );
    } else {
      replace(
        fields.map(field => {
          return { ...field, checked: true };
        }),
      );
    }
  };

  const onChangeHandler = () => {
    setButtonName(deletePaymentItemsValues.every(field => field.checked) ? '선택해제' : '전체선택');
  };

  useEffect(() => {
    setOption({
      title: '',
      subtitle: '결제내역',
      description: '',
      back: true,
      menu: true,
      button: (
        <div className="row gap-8">
          <ActButton className="button-small-outline" handleOnClick={onClickCheckAll} label={buttonName} />
          <ActButton className="button-small-outline" disabled={true} handleOnClick={handleSubmit(confirmDeleteItems)} label="삭제" />
        </div>
      ),
    });
  }, [setOption, buttonName]);

  return (
    <div className="payment-history-wrapper">
      <div className="payment-history-divider" />
      <form className="payment-history-form-wrapper">
        {fields.map((field, index) => {
          return (
            <div key={index} className="payment-history-form-content-wrapper">
              <div className="payment-history-form-content-item-wrapper">
                <PaymentHistoryItem id="deletePaymentItems" item={field} index={index} control={control} register={register} errors={errors} watch={watch} changeHandler={onChangeHandler} />
              </div>
              <div className="divider" />
            </div>
          );
        })}
      </form>
    </div>
  );
};
export default PaymentHistory;
