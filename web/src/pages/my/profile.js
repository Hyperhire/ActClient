import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { signUpYup } from 'utils/yupSchema';
import ActInput from 'components/atoms/ActInput';
import { getItem, USER_INFO } from 'utils/sessionStorage';
import ActButton from 'components/atoms/ActButton';
import NavigationGuard from 'components/organisms/NavigationGuard';
import ActDatePicker from '../../components/atoms/ActDatePicker';

const Profile = ({ setOption }) => {
  const navigate = useNavigate();
  const userInfo = getItem(USER_INFO);
  const [activeGuard, setActiveGuard] = useState(false);

  useEffect(() => {
    setOption({ title: '프로필 정보', subtitle: '계정 정보', description: '', back: true, menu: false });
  }, [setOption]);

  const signUpDefaultForm = {
    userId: '',
    userNickName: '',
    userPassword: '',
    userPasswordCheck: '',
    userName: '',
    userBirthday: '',
    userGender: '',
    userMobile: '',
  };
  const formOptions = { mode: 'onChange', defaultValues: signUpDefaultForm, resolver: yupResolver(signUpYup) };

  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);

  useEffect(() => {
    setActiveGuard(isDirty);
  }, [isDirty]);

  const onSubmit = data => {
    setActiveGuard(false);
    console.log('onSubmit', data);
  };

  const onDuplicateIdHandler = () => {
    console.log('onDuplicateIdHandler');
  };

  const onDuplicateNicknameHandler = () => {
    console.log('onDuplicateNicknameHandler');
  };

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
  return (
    <div className="col max-width padding-8">
      <NavigationGuard
        when={activeGuard}
        message="저장되지 않은 정보가 있습니다. 정말 나가시겠습니까?"
        onClickYes={async () => {
          console.log('onClickYes');
        }}
      />
      <div className="col max-width border-radius-8 background-neutrals-4 padding-8 bottom-8">
        <div>회원가입 ID</div>
        <div className="row align-center justify-start">
          <div>아이콘</div>
          <div className="bold">{userInfo.userName}</div>
        </div>
      </div>
      <div className="col">
        <form className="padding-col-16" onSubmit={handleSubmit(onSubmit)}>
          <ActInput
            {...register('userId')}
            id="userId"
            label="이메일주소"
            required={true}
            info={true}
            placeholder="아이디를 입력하세요"
            errors={errors}
            control={control}
            duplicateHandler={onDuplicateIdHandler}
          />
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
          <div className="row gap-16 max-width align-center justify-around">
            <div className="row">
              <ActInput {...register('userPassword')} label="비밀번호" type="password" id="userPassword" placeholder="새로운 비밀번호 " errors={errors} control={control} />
            </div>
            <div className="row">
              <ActInput {...register('userPasswordCheck')} label="비밀번호 확인" type="password" id="userPasswordCheck" placeholder="비밀번호 재입력" errors={errors} control={control} />
            </div>
          </div>
          <div className="col padding-col-36">
            <div className="font-size-rem-2 bold">개인 정보</div>
            <div>
              기부금 영수증을 발급받기 위해서는 개인정보 입력이 필수 입니다. 수집된 개인정보는 국세청 연말정산 간소화 서비스 등록외에는 사용하지 않습니다.
              <span className="bold">실명, 생년월일, 연락처</span> 가 본인이 아니거나 부정확할 경우 기부금 영수증 발급이 거부 될 수 있습니다.
            </div>
          </div>
          <ActInput {...register('userName')} id="userName" label="실명" required={true} placeholder="실명을 입력하세요" errors={errors} control={control} />
          <div className="row align-center gap-16 justify-center">
            <div className="row flex-1">
              <ActDatePicker register={register} id="userBirthday" label="생년월일" placeholder="YYMMDD" errors={errors} control={control} />
            </div>
            <div className="row flex-1 ">
              <ActInput {...register('userGender')} type="select" label="성별" id="userGender" errors={errors} control={control} options={currencies} />
            </div>
          </div>
          <ActInput {...register('userMobile')} type="number" id="userMobile" label="휴대폰번호" required={true} placeholder="- 없이 입력해주세요" errors={errors} control={control} />
          <div className="row align-center">
            <ActButton type="submit" label="프로필 수정 완료" />
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;
