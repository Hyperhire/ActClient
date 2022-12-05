import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { MEMBER_TYPE } from 'constants/constant';
import ActInput from 'components/atoms/ActInput';
import { individualSignUpYup, organizationSignUpYup } from 'utils/yupSchema';
import NavigationGuard from 'components/organisms/NavigationGuard';
import ActButton from 'components/atoms/ActButton';
import ActCheckBoxGroup from 'components/atoms/ActCheckBoxGroup';
import ActToggleButton from 'components/atoms/ActToggleButton';
import ActImageUploadButton from 'components/atoms/ActImageUploadButton';
import { useRegisterByEmail } from 'hooks/useReactMutation';
import { ReactComponent as ReceiptIcon } from 'styles/assets/icons/receipt.svg';

const RegisterByEmail = ({ setOption }) => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { data, mutate: doRegister, isLoading, isError, error, isSuccess } = useRegisterByEmail('register');

  useEffect(() => {
    if (isSuccess && data) {
      navigate('/', { replace: true });
    }
  }, [data, isLoading, isError, error, isSuccess, navigate]);

  useEffect(() => {
    setOption({ title: '이메일로 회원가입', subtitle: `${type === MEMBER_TYPE.INDIVIDUAL ? '개인' : '단체'} 회원가입`, description: '', back: true, menu: false });
    return () => setOption({});
  }, [setOption]);

  const [activeGuard, setActiveGuard] = useState(false);
  const [uploadedImages, setUploadedImages] = useState();
  const [checkBoxItems, setCheckBoxItems] = useState([
    {
      key: 0,
      id: 'terms',
      label: '서비스 이용약관(필수)',
      checked: false,
    },
    {
      key: 1,
      id: 'privacy',
      label: '개인정보수집 및 이용 동의(필수)',
      checked: false,
    },
  ]);

  useEffect(() => {
    setOption({ title: '이메일로 회원가입', subtitle: `${type === MEMBER_TYPE.INDIVIDUAL ? '개인' : '단체'} 회원가입`, description: '', back: true, menu: false });
    return () => setOption({});
  }, [setOption]);

  const signUpDefaultForm = {
    email: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    receiveReceipt: undefined,
    agreement: undefined,
    // terms: undefined,
    // privacy: undefined,
  };
  const formOptions = { mode: 'onChange', defaultValues: signUpDefaultForm, resolver: yupResolver(type === MEMBER_TYPE.INDIVIDUAL ? individualSignUpYup : organizationSignUpYup) };

  const {
    control,
    register,
    handleSubmit,
    getFieldState,
    setValue,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);

  useEffect(() => {
    setActiveGuard(isDirty);
  }, [isDirty]);

  const onSubmit = data => {
    console.log('onSubmit', data);
    //todo 단체회원 구분을 위한 타입 추가(서버 작업 필요)
    const { email, password, nickname, receiveReceipt } = data;
    doRegister({ type, email, password, nickname, receiveReceipt });
    setActiveGuard(false);
  };

  return (
    <div>
      <NavigationGuard when={activeGuard} message="저장되지 않은 정보가 있습니다. 정말 나가시겠습니까?" />
      <form className="register-by-email-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="register-by-email-form-input-wrapper">
          <ActInput
            {...register('email')}
            id="email"
            label="아이디(이메일)"
            required={true}
            placeholder="아이디를 입력하세요"
            errors={errors}
            control={control}
            duplicateLabel="중복확인"
            fieldInvalid={!!getFieldState('email').error}
          />
          <div className="register-by-email-form-half-row-wrapper">
            <div className="row flex-auto">
              <ActInput {...register('password')} label="비밀번호" type="password" id="password" placeholder="새로운 비밀번호 " errors={errors} control={control} />
            </div>
            <div className="row flex-auto">
              <ActInput {...register('passwordCheck')} label="비밀번호 확인" type="password" id="passwordCheck" placeholder="비밀번호 재입력" errors={errors} control={control} />
            </div>
          </div>
          <ActInput
            {...register('nickname')}
            id="nickname"
            label="닉네임"
            required={true}
            placeholder="닉네임을 입력하세요"
            errors={errors}
            control={control}
            duplicateLabel="닉네임중복"
            fieldInvalid={!!getFieldState('nickname').error}
            regExp={/^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/g}
          />
        </div>
        {type === MEMBER_TYPE.INDIVIDUAL && (
          <div className="register-by-email-form-receipt-wrapper">
            <div className="register-by-email-form-receipt-label-wrapper">
              <ReceiptIcon />
              <div className="register-by-email-form-receipt-label">연말정산 간소화 서비스에서 기부금 영수증을 발급하시겠습니까?</div>
            </div>
            <ActToggleButton
              {...register('receiveReceipt')}
              errors={errors}
              control={control}
              items={[
                { value: true, label: '예' },
                { value: false, label: '아니요' },
              ]}
              id="receiveReceipt"
            />
          </div>
        )}
        {type === MEMBER_TYPE.ORGANIZATION && <div className="register-by-email-divider" />}
        {type === MEMBER_TYPE.ORGANIZATION && (
          <div className="register-by-email-form-common-wrapper">
            <ActImageUploadButton register={register('image')} id="image" errors={errors} control={control} uploadedImages={setUploadedImages} />
          </div>
        )}
        {type === MEMBER_TYPE.ORGANIZATION && (
          <div className="register-by-email-form-input-wrapper ">
            <ActInput {...register('organizationName')} required={true} id="organizationName" label="기부단체명" placeholder="기부단체명을 입력해주세요" errors={errors} control={control} />
            <ActInput
              {...register('organizationLicenseNumber')}
              type="number"
              id="organizationLicenseNumber"
              label="사업자번호"
              required={true}
              placeholder="사업자번호를 입력해주세요"
              errors={errors}
              control={control}
            />
            <div className="register-by-email-form-half-row-wrapper">
              <div className="row flex-auto">
                <ActInput {...register('managerName')} required={true} label="담당자 성함" id="managerName" placeholder="실명을 입력해주세요 " errors={errors} control={control} />
              </div>
              <div className="row flex-auto">
                <ActInput
                  {...register('managerMobile')}
                  type="number"
                  required={true}
                  label="담당자 연락처"
                  id="managerMobile"
                  placeholder="숫자만 입력해주세요"
                  errors={errors}
                  control={control}
                  regExp={/^[0-9]*$/}
                />
              </div>
            </div>
            <ActInput {...register('organizationWebsite')} id="organizationWebsite" label="대표 홈페이지" placeholder="운영중인 홈페이지의 URL을 등록해주세요." errors={errors} control={control} />
          </div>
        )}
        <div>
          <ActCheckBoxGroup
            parentId="agreement"
            items={checkBoxItems}
            label="전체동의"
            labelStyle={{ fontFamily: 'Pretendard', fontWeight: 500, fontSize: '0.875rem', color: 'black' }}
            errors={errors}
            control={control}
            register={register}
            setValue={setValue}
          />
        </div>
        <div className="register-by-email-form-submit-wrapper">
          <ActButton className="tertiary-button-x-large" type="submit" label="회원가입" disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};
export default RegisterByEmail;
