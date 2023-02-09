import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ReactComponent as DotGray } from 'styles/assets/icons/dots/gray.svg';
import ActCheckBox from 'components/atoms/ActCheckBox';
import { resignMembershipYup } from '../../utils/yupSchema';
import ActButton from 'components/atoms/ActButton';
import { usersAtom } from '../../state';
import Logger from 'utils/logger';

const ResignMembership = ({ setOption }) => {
  const navigate = useNavigate();
  const user = useRecoilValue(usersAtom);

  useEffect(() => {
    setOption({
      title: '',
      subtitle: '회원탈퇴',
      description: '',
      back: true,
      menu: true,
    });
  }, [setOption]);

  const getNote = () => {
    return [
      `사용하고 계신 ID(${user.info.email})는 탈퇴시 재사용 및 복구가 불가합니다.`,
      '탈퇴 후 개인정보 및 결제, 후원기부 내역 모두 사라집니다.',
      '탈퇴 이후 연말정산 신청 및 내역 조회가 불가능합니다.',
    ];
  };

  const formOptions = { mode: 'onChange', resolver: yupResolver(resignMembershipYup) };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm(formOptions);

  const onSubmit = data => {
    Logger.log('onSubmit', data);
  };

  return (
    <div className="resign-membership-wrapper">
      <div className="resign-membership-divider" />
      <div className="resign-membership-content-wrapper">
        <div className="resign-membership-content-note-wrapper">
          {getNote().map((note, index) => {
            return (
              <div className="resign-membership-content-note-item" key={index}>
                <div className="resign-membership-content-note-item-icon-wrapper">
                  <div className="resign-membership-content-note-item-icon">
                    <DotGray />
                  </div>
                </div>
                <div className="resign-membership-content-note-item-content flex-1">{note}</div>
              </div>
            );
          })}
        </div>
        <form className="resign-membership-content-form" onSubmit={handleSubmit(onSubmit)}>
          <ActCheckBox
            {...register('isConfirm')}
            id="isConfirm"
            label="회원탈퇴 안내를 확인하셨나요?"
            labelStyle="resign-membership-content-confirm-checkbox-label"
            errors={errors}
            control={control}
            checked={getValues('isConfirm')}
          />
          <div className="resign-membership-content-confirm-button-wrapper">
            <div className="max-width">
              <ActButton className="primary-button-large-outline" label="취소" handleOnClick={() => navigate(-1)} />
            </div>
            <div className="max-width">
              <ActButton type="submit" className="primary-button-large" label="회원탈퇴" disabled={!isValid} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ResignMembership;
