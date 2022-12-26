import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { profileUpdateYup } from 'utils/yupSchema';
import ActInput from 'components/atoms/ActInput';
import ActButton from 'components/atoms/ActButton';
import NavigationGuard from 'components/organisms/NavigationGuard';
import ActDatePicker from 'components/atoms/ActDatePicker';
import { GENDER } from 'constants/constant';
import ActSelect from 'components/atoms/ActSelect';
import { ReactComponent as NaverIcon } from 'styles/assets/images/icons/naver.svg';
import { ReactComponent as ArrowRightIcon } from 'styles/assets/icons/arrow_line_right_sm.svg';
import ActUploadProfileButton from 'components/organisms/ActUploadProfileButton';
import { ReactComponent as ActIcon } from 'styles/assets/icons/label/act_aqua.svg';
import { usersAtom } from '../../state';

const Profile = ({ setOption }) => {
  const navigate = useNavigate();
  const user = useRecoilValue(usersAtom);

  const [activeGuard, setActiveGuard] = useState(false);
  const [uploadedImages, setUploadedImages] = useState();

  useEffect(() => {
    setOption({
      title: '프로필 정보',
      subtitle: '계정 정보',
      description: '',
      back: true,
      menu: false,
      button: (
        <div className="profile-form-resign-membership-wrapper link" onClick={onClickResignMembership}>
          <div className="profile-form-resign-membership-label">회원탈퇴</div>
          <ArrowRightIcon />
        </div>
      ),
    });
  }, [setOption]);

  const onClickResignMembership = () => {
    setActiveGuard(false);
    navigate('/my/resign-membership');
  };
  const profileUpdateDefaultForm = {
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
    name: '',
    birthday: '',
    gender: '',
    mobile: '',
  };

  const formOptions = { mode: 'onChange', defaultValues: profileUpdateDefaultForm, resolver: yupResolver(profileUpdateYup) };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
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

  return (
    <div className="profile-wrapper">
      <NavigationGuard
        when={activeGuard}
        message="저장되지 않은 정보가 있습니다. 정말 나가시겠습니까?"
        onClickYes={async () => {
          console.log('onClickYes');
        }}
      />
      <div className="profile-image-wrapper">
        <ActUploadProfileButton register={register('profileImage')} id="profileImage" errors={errors} control={control} uploadedImages={setUploadedImages} />
        <ActIcon />
      </div>
      <div className="profile-login-info-wrapper">
        <div className="profile-login-info-label">회원가입 ID</div>
        <div className="profile-login-info-content-wrapper">
          <NaverIcon width={24} height={24} />
          <div className="profile-login-info-content-email">{user.email}</div>
        </div>
      </div>
      <form className="profile_form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="profile-form-default-info-wrapper">
          <ActInput
            {...register('email')}
            id="email"
            label="이메일주소"
            required={true}
            info={true}
            placeholder="아이디를 입력하세요"
            errors={errors}
            control={control}
            duplicateHandler={onDuplicateIdHandler}
          />
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
          <div className="profile-form-half-wrapper">
            <div className="row flex-1">
              <ActInput {...register('password')} label="비밀번호" type="password" id="password" placeholder="새로운 비밀번호 " errors={errors} control={control} />
            </div>
            <div className="row flex-1">
              <ActInput {...register('passwordCheck')} label="비밀번호 확인" type="password" id="passwordCheck" placeholder="비밀번호 재입력" errors={errors} control={control} />
            </div>
          </div>
        </div>
        <div className="profile-form-divider" />
        <div className="profile-form-notice-wrapper">
          <div className="profile-form-notice-title">개인 정보</div>
          <div className="profile-form-notice-description">
            {`기부금 영수증을 발급받기 위해서는 개인정보 입력이 필수 입니다. 수집된 개인정보는 국세청 연말정산 간소화 서비스 등록외에는 사용하지 않습니다.\n\n`}
            <span>실명, 생년월일, 연락처</span>가 본인이 아니거나 부정확할 경우 기부금 영수증 발급이 거부 될 수 있습니다.
          </div>
        </div>
        <div className="profile-form-private-info-wrapper">
          <ActInput {...register('name')} id="name" label="실명" required={true} placeholder="실명을 입력하세요" errors={errors} control={control} />
          <div className="profile-form-half-wrapper">
            <div className="row flex-1">
              <ActDatePicker register={register} id="birthday" label="생년월일" placeholder="YYMMDD" errors={errors} control={control} value={getValues('birthday')} setValue={setValue} />
              {/*<ActDatePicker2 register={register} id="birthday" label="생년월일" placeholder="YYMMDD" errors={errors} control={control} />*/}
            </div>
            <div className="row flex-1 ">
              <ActSelect register={register} id="gender" label="성별" errors={errors} control={control} options={GENDER} />
            </div>
          </div>
          <ActInput {...register('mobile')} type="number" id="mobile" label="휴대폰번호" required={true} placeholder="- 없이 입력해주세요" errors={errors} control={control} />
        </div>
        <div className="profile-form-submit-wrapper">
          <ActButton className="tertiary-button-x-large" disabled={!isValid} type="submit" label="프로필 수정 완료" />
        </div>
      </form>
    </div>
  );
};
export default Profile;
