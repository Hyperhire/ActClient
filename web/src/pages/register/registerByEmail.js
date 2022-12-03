import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import { MEMBER_TYPE } from 'constants/constant';
import ActInput from 'components/atoms/ActInput';
import { signUpYup } from 'utils/yupSchema';
import NavigationGuard from 'components/organisms/NavigationGuard';
import ActButton from 'components/atoms/ActButton';
import ActCheckBoxGroup from 'components/atoms/ActCheckBoxGroup';
import ActToggleButton from '../../components/atoms/ActToggleButton';
import ActDropDown from '../../components/atoms/ActDropDown';
import ActImageUploadButton from 'components/atoms/ActImageUploadButton';
import { useRegisterByEmail } from '../../hooks/useReactMutation';

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
  const formOptions = { mode: 'onChange', defaultValues: signUpDefaultForm, resolver: yupResolver(signUpYup) };

  const {
    control,
    register,
    handleSubmit,
    getFieldState,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);

  const onDuplicateIdHandler = () => {
    console.log('onDuplicateIdHandler');
  };

  const onDuplicateNicknameHandler = () => {
    console.log('onDuplicateNicknameHandler');
  };

  useEffect(() => {
    setActiveGuard(isDirty);
  }, [isDirty]);

  const onSubmit = data => {
    console.log('onSubmit');
    const { email, password, nickname, receiveReceipt } = data;
    doRegister({ email, password, nickname, receiveReceipt });
    setActiveGuard(false);
  };
  const onCheckBoxChangeHandler = event => {
    setCheckBoxItems(checkBoxItems.map(item => ({ ...item, checked: event.target.checked })));
  };

  const onCheckBoxChildChangeHandler = (event, key) => {
    const newArr = [...checkBoxItems];
    let newItem;
    newArr.splice(
      newArr.findIndex(item => {
        if (item.key === key) {
          newItem = item;
          return true;
        }
        return false;
      }),
      1,
      {
        ...newItem,
        checked: event.target.checked,
      },
    );
    setCheckBoxItems(newArr);
  };
  return (
    <div className="col padding-row-24">
      <NavigationGuard when={activeGuard} message="저장되지 않은 정보가 있습니다. 정말 나가시겠습니까?" />
      <form className="col gap-16 top-16" onSubmit={handleSubmit(onSubmit)}>
        <ActInput
          {...register('email')}
          id="email"
          label="아이디(이메일)"
          required={true}
          placeholder="아이디를 입력하세요"
          errors={errors}
          control={control}
          duplicateMessage="사용가능한 이메일 입니다."
          fieldState={getFieldState('userId')}
        />
        <div className="row gap-16 max-width align-center justify-around">
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
          duplicateHandler={onDuplicateNicknameHandler}
        />
        <div className="col">
          <div className="row align-center">
            <div>아이콘</div>
            <div>연말정산 간소화 서비스에서 기부금 영수증을 발급하시겠습니까?</div>
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
        <div className="col align-start justify-center">
          <ActCheckBoxGroup
            parentId="agreement"
            items={checkBoxItems}
            label="전체동의"
            labelStyle={{ fontFamily: 'Pretendard', fontWeight: 500, fontSize: '0.875rem', color: 'black' }}
            handleChange={onCheckBoxChangeHandler}
            handleChangeChild={onCheckBoxChildChangeHandler}
            errors={errors}
            control={control}
            register={register}
          />
        </div>
        {/*<ActImageUploadButton uploadedImages={setUploadedImages} />*/}

        <ActButton type="submit" label="회원가입" disabled={!isValid} className="tertiary-button-x-large" />
      </form>
    </div>
  );
};
export default RegisterByEmail;
