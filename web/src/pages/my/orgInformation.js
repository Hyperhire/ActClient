import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { usersAtom } from '../../state';
import { orgInformationYup } from '../../utils/yupSchema';
import ActUploadLicenseButton from '../../components/organisms/ActUploadLicenseButton';
import ActImageViewer from '../../components/organisms/ActImageViewer';
import ActUploadProfileButton from '../../components/organisms/ActUploadProfileButton';
import ActButton from '../../components/atoms/ActButton';
import ActInput from '../../components/atoms/ActInput';
import { useEditProfile } from '../../hooks/useReactMutation';
import { request } from '../../utils/axiosClient';
import { api } from '../../repository';
import useModal from '../../hooks/useModal';
const OrgInformation = ({ setOption }) => {
  const user = useRecoilValue(usersAtom);
  const setUser = useSetRecoilState(usersAtom);
  const { showModal } = useModal();
  const [logoFiles, setLogoFiles] = useState([]);
  const [organizationImageFiles, setOrganizationImageFiles] = useState([]);
  useEffect(() => {
    setOption({
      title: '단체 정보',
      subtitle: '단체 상세 정보',
      description: '',
      back: true,
      menu: true,
    });
  }, [setOption]);
  const { data, mutate: editOrgInfo, isSuccess } = useEditProfile('edit-profile');
  useEffect(() => {
    if (isSuccess && data?.status) {
      request({ url: api.auth.my, method: 'get' }).then(res => {
        setUser(res.data.data);
        showModal({
          open: true,
          message: data.status === 200 ? `단체정보가 수정되었습니다.` : `단체정보 수정에 실패하였습니다.`,
        });
      });
    }
  }, [data, isSuccess]);
  const orgInformationDefaultForm = {
    shortDescription: '',
    description: '',
  };
  const formOptions = { mode: 'onChange', defaultValues: orgInformationDefaultForm, resolver: yupResolver(orgInformationYup) };

  const {
    control,
    register,
    handleSubmit,
    getFieldState,
    setValue,
    formState: { isDirty, isValid, errors },
  } = useForm(formOptions);

  const onSubmit = data => {
    console.log('onSubmit', data);
    const formData = new FormData();
    formData.append('logoImage', logoFiles[0]);
    organizationImageFiles.forEach(image => {
      formData.append('orgImages', image);
    });
    const params = {
      shortDescription: data.shortDescription,
      description: data.description,
    };
    formData.append('data', JSON.stringify(params));
    // editOrgInfo(formData);
  };
  const style = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderRadius: 1,
        border: 'solid 1px black',
      },
      '&.Mui-focused fieldset': {
        border: 'solid 1px black',
      },
      '& input': {
        padding: 0,
      },
    },
    padding: 0,
  };
  const params = {
    inputProps: {
      style: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  };
  return (
    <div className="org-information-wrapper">
      <div className="org-information-divider" />
      <form className="org-information-content-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="org-information-logo-wrapper">
          <div className="org-information-label">로고</div>
          <ActUploadLicenseButton register={register('logo')} id="logo" errors={errors} control={control} imageFiles={logoFiles} setImageFiles={setLogoFiles} label="단체로고" />
        </div>
        <div className="org-information-image-wrapper">
          <div className="org-information-label">이미지(3개)</div>
          <ActImageViewer
            register={register('organizationImages')}
            id="organizationImages"
            errors={errors}
            control={control}
            imageFiles={organizationImageFiles}
            setImageFiles={setOrganizationImageFiles}
          />
        </div>
        <div className="org-information-shortDescription-wrapper">
          <div className="org-information-label">간략소개</div>
          <ActInput {...register('shortDescription')} id="shortDescription" control={control} errors={errors} style={style} hideErrorMessage={true} multiline={true} rows={2} params={params} />
        </div>
        <div className="org-information-description-wrapper">
          <div className="org-information-label">상세소개</div>
          <ActInput {...register('description')} id="description" control={control} errors={errors} style={style} hideErrorMessage={true} multiline={true} rows={3} />
        </div>
        <ActButton className="tertiary-button-x-large" label="단체정보 수정 완료" type="submit" />
      </form>
    </div>
  );
};
export default OrgInformation;
