import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';
import { usersAtom } from '../../state';
import { newsPostYup, orgInformationYup } from '../../utils/yupSchema';
import ActImageViewer from '../../components/organisms/ActImageViewer';
import ActButton from '../../components/atoms/ActButton';
import ActInput from '../../components/atoms/ActInput';
import { useCampaignPost, useEditProfile, useNewsPost } from '../../hooks/useReactMutation';
import { request } from '../../utils/axiosClient';
import { api } from '../../repository';
import useModal from '../../hooks/useModal';
import { ORGANIZATION_NEWS_TYPE } from '../../constants/constant';
import ActDatePicker from '../../components/atoms/ActDatePicker';
import { ReactComponent as Calendar } from 'styles/assets/icons/cal.svg';

const CampaignPost = ({ setOption }) => {
  const user = useRecoilValue(usersAtom);
  const setUser = useSetRecoilState(usersAtom);
  const { showModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const [campaignImageFiles, setCampaignImageFiles] = useState([]);

  useEffect(() => {
    setOption({
      title: '단체캠페인',
      subtitle: '',
      description: '',
      back: true,
      menu: true,
    });
  }, [setOption]);
  const { data, mutate: campaignPost, isSuccess } = useCampaignPost(`post-campaign`);
  useEffect(() => {
    if (isSuccess && data?.status) {
      showModal({
        open: true,
        message: data.status === 201 ? `단체 캠페인이 등록되었습니다.` : '캠페인 등록에 실패하였습니다.',
        handleConfirm: () => navigate(`/campaign/${data.data.data._id}`, { replace: true }),
      });
    }
  }, [data, isSuccess]);

  const nextMonth = () => {
    let date = new Date();
    date.setMonth(date.getMonth() + 1);
    return date;
  };

  const campaignPostDefaultForm = {
    title: '',
    description: '',
    campaignImages: [],
    startedAt: dayjs(new Date(), 'YY/MM/DD'),
    endedAt: dayjs(nextMonth(), 'YY/MM/DD'),
    goal: '',
  };

  const formOptions = { mode: 'onChange', defaultValues: campaignPostDefaultForm, resolver: yupResolver(newsPostYup) };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { isDirty, isValid, errors },
  } = useForm(formOptions);

  useEffect(() => {
    setValue('campaignImages', campaignImageFiles, { shouldValidate: true });
  }, [campaignImageFiles]);
  const onSubmit = data => {
    console.log('onSubmit', data);
    const formData = new FormData();

    campaignImageFiles.forEach(image => {
      formData.append('images', image);
    });
    const params = {
      title: data.title,
      description: data.description,
      startedAt: data.startedAt,
      endedAt: data.endedAt,
      targetAmount: data.goal,
    };
    formData.append('data', JSON.stringify(params));

    campaignPost(formData);
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

  const inputAdornment = (
    <InputAdornment position="end">
      <div className="row align-center">
        <Calendar />
      </div>
    </InputAdornment>
  );

  return (
    <div className="news-post-wrapper">
      <form className="content-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="title-wrapper">
          <div className="row justify-between">
            <div className="content-label">캠페인 제목</div>
            <div className="content-sub-label">{`${watch('title').length}/60`}</div>
          </div>
          <ActInput {...register('title')} id="title" control={control} errors={errors} style={style} hideErrorMessage={true} multiline={true} rows={2} params={params} maxLength={60} />
        </div>
        <div className="image-wrapper">
          <div className="content-label">캠페인 이미지(3개)</div>
          <ActImageViewer register={register('campaignImages')} id="newsImages" errors={errors} control={control} imageFiles={campaignImageFiles} setImageFiles={setCampaignImageFiles} />
        </div>
        <div className="period-wrapper">
          <div className="content-label">캠페인 기간</div>
          <div className="period-item-wrapper">
            <div className="max-width">
              <ActDatePicker
                register={register}
                id="startedAt"
                placeholder="시작일"
                errors={errors}
                control={control}
                value={getValues('startedAt')}
                setValue={setValue}
                inputAdornment={inputAdornment}
                minDate={new Date()}
              />
            </div>
            <div className="max-width">
              <ActDatePicker
                register={register}
                id="endedAt"
                placeholder="종료일"
                errors={errors}
                control={control}
                value={getValues('endedAt')}
                setValue={setValue}
                inputAdornment={inputAdornment}
                minDate={getValues('startedAt')}
              />
            </div>
          </div>
        </div>
        <div className="goal-wrapper">
          <div className="content-label">캠페인 목표 금액</div>
          <ActInput {...register('goal')} id="goal" control={control} errors={errors} hideErrorMessage={true} />
        </div>
        <div className="description-wrapper">
          <div className="content-label">단체 캠페인 소개</div>
          <ActInput {...register('description')} id="description" control={control} errors={errors} style={style} hideErrorMessage={true} multiline={true} rows={3} />
        </div>
        <div className="button-wrapper">
          <div className="max-width">
            <ActButton className="primary-button-x-large-outline" label="취소하기" handleOnClick={() => navigate(-1)} />
          </div>
          <div className="max-width">
            <ActButton className="primary-button-x-large" label="등록하기" type="submit" disabled={!isValid} />
          </div>
        </div>
      </form>
    </div>
  );
};
export default CampaignPost;
