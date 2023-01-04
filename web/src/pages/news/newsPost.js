import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { usersAtom } from '../../state';
import { newsPostYup, orgInformationYup } from '../../utils/yupSchema';
import ActImageViewer from '../../components/organisms/ActImageViewer';
import ActButton from '../../components/atoms/ActButton';
import ActInput from '../../components/atoms/ActInput';
import { useEditProfile, useNewsPost } from '../../hooks/useReactMutation';
import { request } from '../../utils/axiosClient';
import { api } from '../../repository';
import useModal from '../../hooks/useModal';
import { ORGANIZATION_NEWS_TYPE } from '../../constants/constant';

const NewsPost = ({ setOption }) => {
  const user = useRecoilValue(usersAtom);
  const setUser = useSetRecoilState(usersAtom);
  const { showModal } = useModal();
  const location = useLocation();
  const navigate = useNavigate();
  const { type } = location.state;
  const [newsImageFiles, setNewsImageFiles] = useState([]);
  useEffect(() => {
    setOption({
      title: type === ORGANIZATION_NEWS_TYPE.NEWS ? '단체소식' : '단체공시',
      subtitle: '',
      description: '',
      back: true,
      menu: true,
    });
  }, [setOption]);
  const { data, mutate: newsPost, isSuccess } = useNewsPost(`post-${type}`);
  useEffect(() => {
    if (isSuccess && data?.status) {
      showModal({
        open: true,
        message: data.status === 201 ? (type === ORGANIZATION_NEWS_TYPE.NEWS ? `단체 소식이 등록되었습니다.` : `단체공시가 등록되었습니다.`) : '등록에 실패하였습니다.',
        handleConfirm: () => navigate(`/news/${data.data.data._id}`, { replace: true, state: { type } }),
      });
    }
  }, [data, isSuccess]);
  const newsPostDefaultForm = {
    title: '',
    description: '',
    newsImages: [],
  };
  const formOptions = { mode: 'onChange', defaultValues: newsPostDefaultForm, resolver: yupResolver(newsPostYup) };

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isDirty, isValid, errors },
  } = useForm(formOptions);

  useEffect(() => {
    setValue('newsImages', newsImageFiles, { shouldValidate: true });
  }, [newsImageFiles]);

  const onSubmit = data => {

    const formData = new FormData();

    newsImageFiles.forEach(image => {
      formData.append('images', image);
    });
    const params = {
      title: data.title,
      description: data.description,
    };
    formData.append('data', JSON.stringify(params));
    const newsInfo = {
      data: formData,
      type,
    };
    newsPost(newsInfo);
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
    <div className="news-post-wrapper">
      <form className="content-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="title-wrapper">
          <div className="row justify-between">
            <div className="content-label">{type === ORGANIZATION_NEWS_TYPE.NEWS ? '단체소식 제목' : '단체공시 제목'}</div>
            <div className="content-sub-label">{`${watch('title').length}/60`}</div>
          </div>
          <ActInput {...register('title')} id="title" control={control} errors={errors} style={style} hideErrorMessage={true} multiline={true} rows={2} params={params} maxLength={60} />
        </div>
        <div className="image-wrapper">
          <div className="content-label">{type === ORGANIZATION_NEWS_TYPE.NEWS ? '단체소식 이미지(3개)' : '단체공시 이미지(3개)'}</div>
          <ActImageViewer register={register('newsImages')} id="newsImages" errors={errors} control={control} imageFiles={newsImageFiles} setImageFiles={setNewsImageFiles} />
        </div>
        <div className="description-wrapper">
          <div className="content-label">{type === ORGANIZATION_NEWS_TYPE.NEWS ? '단체소식 내용' : '단체공시 내용'}</div>
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
export default NewsPost;
