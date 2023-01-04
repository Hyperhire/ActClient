import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import ActButton from 'components/atoms/ActButton';
import SettlementItem from 'components/organisms/SettlementItem';
import ActTab from '../../components/atoms/ActTab';
import { useReactQuery } from '../../hooks/useReactQuery';
import { api } from '../../repository';
import SettlementItemCheckbox from '../../components/organisms/SettlementItemCheckbox';
import SettlementPaymentHistory from '../../components/organisms/SettlementPaymentHistory';
import { request } from '../../utils/axiosClient';
import useModal from '../../hooks/useModal';

const SettlementHistory = ({ setOption }) => {
  const [buttonName, setButtonName] = useState('전체선택');
  const { showModal } = useModal();

  useEffect(() => {
    setOption({
      title: '정산내역',
      subtitle: '',
      description: '',
      back: true,
      menu: true,
    });
  }, [setOption, buttonName]);

  const { isSuccess: isSuccessPre, data: dataPre, refetch: refetchPre } = useReactQuery('settlement-pre', api.my.settlementPre);
  const { isSuccess: isSuccessPost, data: dataPost, refetch: refetchPost } = useReactQuery('settlement-post', api.my.settlementPost);

  const settlementHistoryForm = {
    withdrawItems: isSuccessPre && dataPre?.list.NOT_YET,
  };

  const formOptions = {
    mode: 'onChange',
    defaultValues: settlementHistoryForm,
  };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { isValid, isSubmitting, errors },
  } = useForm(formOptions);

  const withdrawItemsValues = getValues('withdrawItems');
  useEffect(() => {
    setButtonName(withdrawItemsValues.every(field => field.checked) ? '선택해제' : '전체선택');
  }, [withdrawItemsValues]);
  const { fields, replace } = useFieldArray({
    control,
    name: 'withdrawItems',
  });
  useEffect(() => {
    replace(
      fields.map(field => {
        return { ...field, checked: false };
      }),
    );
    setValue('withdrawItems', dataPre?.list.NOT_YET, { shouldValidate: true });
  }, [dataPre]);
  const onClickCheckAll = () => {
    if (getValues('withdrawItems').every(field => field.checked)) {
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
  const onChangeHandler = async () => {
    setButtonName(withdrawItemsValues.every(field => field.checked) ? '선택해제' : '전체선택');
  };

  const requestWithdraw = data => {
    const orders = data.withdrawItems.filter(item => item.checked).map(v => v._id);

    request({
      url: api.my.settlementWithdraw,
      method: 'post',
      data: { orders },
    })
      .then(res => {
        if (res.status === 200) {
          showModal({
            open: true,
            message: `정산요청 되었습니다.`,
            handleConfirm: () => {
              refetchPre();
              refetchPost();
            },
          });
        }
      })
      .catch(() => {
        showModal({
          open: true,
          message: `정산요청이 실패하였습니다..`,
          handleConfirm: () => {},
        });
      });
  };

  const parseData = [
    {
      index: 0,
      label: '정산내역',
      header: (
        <div className="settlement-history-header-wrapper">
          <div className="row gap-8 justify-end">
            <ActButton className="button-small-outline" handleOnClick={onClickCheckAll} label={buttonName} />
          </div>
          <div className="settlement-history-header">
            <div className="label">정산가능금액</div>
            <div className="content">{dataPre.amount.NOT_YET.toLocaleString()}원</div>
          </div>
        </div>
      ),
      footer: (
        <div className="settlement-history-footer-wrapper">
          <div className="settlement-history-footer-info-wrapper">
            <div className="settlement-history-footer-guide">
              정산금액이&nbsp;<span>500,000원 이상</span>일때만 정산요청 가능합니다.
            </div>
            <div className="bordered-dashed" />
            <div className="settlement-history-footer-amount-wrapper">
              <div className="settlement-history-footer-amount-label">정산요청금액</div>
              <div className="settlement-history-footer-amount">
                {`${getValues('withdrawItems')
                  .filter(item => item.checked)
                  .reduce((a, b) => a + b.amount, 0)
                  .toLocaleString()}원`}
              </div>
            </div>
          </div>
          <div className="settlement-history-footer-button-wrapper">
            <div className="max-width">
              <ActButton radius={0} className="primary-button-x-large-outline" label="취소하기" handleOnClick={() => console.log('취소하기')} />
            </div>
            <div className="max-width">
              <ActButton radius={0} className="primary-button-x-large" label="정산요청하기" handleOnClick={handleSubmit(requestWithdraw)} />
            </div>
          </div>
        </div>
      ),
      list: (
        <div className="settlement-history-list-wrapper">
          {fields.map((field, index) => {
            return (
              <div key={index}>
                <div className="settlement-history-list">
                  <SettlementItemCheckbox id="withdrawItems" item={field} index={index} control={control} register={register} errors={errors} watch={watch} changeHandler={onChangeHandler} />
                </div>
                {index !== fields.length && <div className="divider" />}
              </div>
            );
          })}
          {dataPre?.list.REQUESTED.length > 0 && (
            <div>
              <div className="divider-thick-12" />
              <div className="list-title">정산요청완료</div>
              {dataPre?.list.REQUESTED.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="settlement-history-list">
                      <SettlementItem item={item} />
                    </div>
                    {index !== dataPre?.list.REQUESTED.length && <div className="divider" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ),
    },
    {
      index: 1,
      label: '지급내역',
      header: (
        <div className="settlement-history-header-wrapper">
          <div className="settlement-history-header">
            <div className="label">지급대기</div>
            <div className="content">{dataPost.amount.PENDING.toLocaleString()}원</div>
          </div>
        </div>
      ),
      list: (
        <div className="settlement-history-list-wrapper">
          {dataPost?.list.PENDING.map((item, index) => {
            return (
              <div key={index}>
                <div className="settlement-history-list">
                  <SettlementPaymentHistory item={item} clickHandler={item => console.log('onClick', item)} />
                </div>
                {index !== dataPost?.list.PENDING.length && <div className="divider" />}
              </div>
            );
          })}
          {dataPost?.list.COMPLETE.length > 0 && (
            <div>
              <div className="divider-thick-12" />
              <div className="list-title">지급완료</div>
              {dataPost?.list.COMPLETE.map((item, index) => {
                return (
                  <div key={index}>
                    <div className="settlement-history-list">
                      <SettlementPaymentHistory item={item} clickHandler={item => console.log('onClick', item)} />
                    </div>
                    {index !== dataPost?.list.PENDING.length && <div className="divider" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ),
    },
  ];

  return <div className="settlement-history-wrapper">{isSuccessPre && isSuccessPost && dataPre && dataPost && <ActTab data={parseData} />}</div>;
};
export default SettlementHistory;
