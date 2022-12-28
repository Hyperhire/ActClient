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
import { usersAtom } from 'state';
import { useEditProfile } from 'hooks/useReactMutation';
import useModal from 'hooks/useModal';
import { convertURLtoFile } from 'utils/convertUrlToFile';

const Profile = ({ setOption }) => {
  const navigate = useNavigate();
  const user = useRecoilValue(usersAtom);
  const [imageFiles, setImageFiles] = useState([]);
  const [isChangedNickname, setIsChangedNickname] = useState(false);
  const { showModal } = useModal();

  useEffect(() => {
    convertURLtoFile(user.info.profileUrl).then(file => {
      setImageFiles([file]);
    });
  }, [user.info.profileUrl]);

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

  const { data, mutate: editProfile, isLoading, isError, error, isSuccess } = useEditProfile('edit-profile');

  useEffect(() => {
    if (isSuccess && data?.status) {
      showModal({
        open: true,
        message: data.status === 200 ? `프로필이 수정되었습니다.` : `프로필 수정에 실패하였습니다.`,
      });
    }
  }, [data, isSuccess]);

  const onClickResignMembership = () => {
    navigate('/my/resign-membership');
  };
  const profileUpdateDefaultForm = {
    email: user.info.email,
    nickname: user.info.nickname,
    name: user.info.indInfo.name,
    dateOfBirth: dayjs(user.info.indInfo.dateOfBirth, 'YY/MM/DD'),
    gender: user.info.indInfo.sex,
    mobile: user.info.indInfo.mobile,
    duplicateNickname: false,
  };

  const formOptions = { mode: 'onChange', defaultValues: profileUpdateDefaultForm, resolver: yupResolver(profileUpdateYup) };

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    getFieldState,
    watch,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);

  useEffect(() => {
    setIsChangedNickname(user.info.nickname !== watch('nickname'));
  }, [watch('nickname')]);

  const onSubmit = data => {
    const formData = new FormData();
    formData.append('image', imageFiles[0]);

    let params = {};
    if (user.info.nickname !== data.nickname) {
      params = { ...params, nickname: data.nickname };
    }
    if (data.password) {
      params = { ...params, password: data.password };
    }

    if (user.info.indInfo?.name !== data.name) {
      params = {
        ...params,
        indInfo: {
          ...params.indInfo,
          name: data.name,
        },
      };
    }
    if (user.info.indInfo?.dateOfBirth !== data.dateOfBirth) {
      params = {
        ...params,
        indInfo: {
          ...params.indInfo,
          dateOfBirth: data.dateOfBirth,
        },
      };
    }
    if (user.info.indInfo?.sex !== data.gender) {
      params = {
        ...params,
        indInfo: {
          ...params.indInfo,
          sex: data.gender,
        },
      };
    }
    if (user.info.indInfo?.mobile !== data.mobile) {
      params = {
        ...params,
        indInfo: {
          ...params.indInfo,
          mobile: data.mobile,
        },
      };
    }

    formData.append('data', JSON.stringify(params));
    editProfile(formData);
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-image-wrapper">
        <ActUploadProfileButton register={register('profileImage')} id="profileImage" errors={errors} control={control} imageFiles={imageFiles} setImageFiles={setImageFiles} />
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
          <ActInput {...register('email')} id="email" label="이메일주소" required={true} info={true} placeholder="아이디를 입력하세요" errors={errors} control={control} disabled={true} />
          <ActInput
            {...register('nickname')}
            id="nickname"
            label="닉네임"
            required={true}
            placeholder="닉네임을 입력하세요"
            errors={errors}
            control={control}
            duplicate={{ register, label: '중복확인', id: 'duplicateNickname', setValue: setValue }}
            fieldInvalid={!!getFieldState('nickname').error || !isChangedNickname}
            regExp={/^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/g}
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
              <ActDatePicker register={register} id="dateOfBirth" label="생년월일" placeholder="YYMMDD" errors={errors} control={control} value={getValues('dateOfBirth')} setValue={setValue} />
            </div>
            <div className="row flex-1 ">
              <div className="max-width">
                <ActSelect register={register} id="gender" label="성별" errors={errors} control={control} options={GENDER} />
              </div>
            </div>
          </div>
          <ActInput {...register('mobile')} type="number" id="mobile" label="휴대폰번호" required={true} placeholder="- 없이 입력해주세요" errors={errors} control={control} />
        </div>
        <div className="profile-form-submit-wrapper">
          <ActButton className="tertiary-button-x-large" disabled={!isValid && isChangedNickname} type="submit" label="프로필 수정 완료" />
        </div>
      </form>
    </div>
  );
};
export default Profile;
