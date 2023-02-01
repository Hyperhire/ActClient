import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { bannerYup, loginYup } from '../../utils/yupSchema';
import ActInput from '../atoms/ActInput';
import ActButton from '../atoms/ActButton';
import ActRadioGroup from '../atoms/ActRadioGroup';
import BannerImageViewer from './BannerImageViewer';

const BannerControl = ({ value }) => {
  const visibleStatusOptions = [
    { label: '노출중', value: true },
    { label: '비노출', value: false },
  ];
  const bannerDefaultForm = {
    url: '',
    image: '',
    visible: false,
  };
  const formOptions = { mode: 'onChange', defaultValues: bannerDefaultForm, resolver: yupResolver(bannerYup) };
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors },
  } = useForm(formOptions);

  const [visibleStatus, setVisibleStatus] = useState(visibleStatusOptions[0].value);
  const [image, setImage] = useState([]);
  useEffect(() => {
    setValue('visible', visibleStatus, { shouldValidate: true });
  }, [visibleStatus]);

  const onSubmit = async formData => {
    console.log('onSubmit', formData);
  };

  return (
    <div className="col max-width">
      <form className="col max-width align-start justify-center gap-24" onSubmit={handleSubmit(onSubmit)}>
        <div className="row max-width align-center justify-start">
          <div className="width-120">클릭 URL</div>
          <div className="flex-1">
            <ActInput {...register('url')} id="url" placeholder="URL을 입력하세요" errors={errors} control={control} />
          </div>
        </div>
        <div className="row max-width align-center justify-start">
          <div className="width-120">이미지</div>
          <div className="row gap-8">
            <BannerImageViewer register={register('image')} id="image" errors={errors} control={control} imageFiles={image} setImageFiles={setImage} label="단체로고" />
          </div>
        </div>
        <div className="row max-width align-center justify-start">
          <div className="width-120">노출</div>
          <div className="flex-1">
            <ActRadioGroup options={visibleStatusOptions} state={visibleStatus} setState={setVisibleStatus} />
          </div>
        </div>
        <div className="max-width divider-thick-primary-4" />
        <div className="row max-width align-center justify-center">
          <ActButton type="submit" label={<div className="padding-row-4">저장</div>} />
        </div>
      </form>
    </div>
  );
};
export default BannerControl;
