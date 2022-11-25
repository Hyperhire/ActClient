import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { MEMBER_TYPE } from 'constants/constant';
import ActInput from 'components/atoms/ActInput';
import { signUpYup } from 'utils/yupSchema';
import NavigationGuard from 'components/organisms/NavigationGuard';
import ActButton from 'components/atoms/ActButton';
import ActCheckBoxGroup from 'components/atoms/ActCheckBoxGroup';

const RegisterByEmail = ({ setOption }) => {
  const { type } = useParams();
  const [activeGuard, setActiveGuard] = useState(false);

  const [checkBoxItems, setCheckBoxItems] = useState([
    {
      key: 0,
      label: '서비스 이용약관(필수)',
      checked: false,
    },
    {
      key: 1,
      label: '개인정보수집 및 이용 동의(필수)',
      checked: false,
    },
  ]);

  useEffect(() => {
    setOption({ title: '이메일로 회원가입', subtitle: `${type === MEMBER_TYPE.INDIVIDUAL ? '개인' : '단체'} 회원가입`, description: '', back: true, menu: false });
    return () => setOption({});
  }, [setOption]);

  const signUpDefaultForm = {
    userId: '',
    userPassword: '',
    userPasswordCheck: '',
    userNickName: '',
    agreement: true,
  };
  const formOptions = { mode: 'onChange', defaultValues: signUpDefaultForm, resolver: yupResolver(signUpYup) };

  const {
    control,
    register,
    handleSubmit,
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
    console.log('onSubmit', data);
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
    <div className="col padding-row-8">
      <NavigationGuard
        when={activeGuard}
        message="저장되지 않은 정보가 있습니다. 정말 나가시겠습니까?"
        onClickYes={async () => {
          console.log('onClickYes');
        }}
      />
      <form className="col padding-col-16 gap-8" onSubmit={handleSubmit(onSubmit)}>
        <ActInput
          {...register('userId')}
          id="userId"
          label="아이디(이메일)"
          required={true}
          placeholder="아이디를 입력하세요"
          errors={errors}
          control={control}
          duplicateHandler={onDuplicateIdHandler}
        />
        <div className="row gap-16 max-width align-center justify-around">
          <div className="row">
            <ActInput {...register('userPassword')} label="비밀번호" type="password" id="userPassword" placeholder="새로운 비밀번호 " errors={errors} control={control} />
          </div>
          <div className="row">
            <ActInput {...register('userPasswordCheck')} label="비밀번호 확인" type="password" id="userPasswordCheck" placeholder="비밀번호 재입력" errors={errors} control={control} />
          </div>
        </div>
        <ActInput
          {...register('userNickName')}
          id="userNickName"
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
          <div className="row">
            <div>아니요</div>
            <div>네</div>
          </div>
        </div>
        <div className="col align-start justify-center">
          <ActCheckBoxGroup
            {...register('agreement')}
            id="agreement"
            items={checkBoxItems}
            label="전체동의"
            handleChange={onCheckBoxChangeHandler}
            handleChangeChild={onCheckBoxChildChangeHandler}
            errors={errors}
            control={control}
          />
        </div>
        <ActButton type="submit" label="회원가입" disabled={!isValid} className="max-width top-16" />
      </form>
    </div>
  );
};
export default RegisterByEmail;
