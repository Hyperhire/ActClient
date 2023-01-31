import React, { forwardRef, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { ReactComponent as SearchIcon } from 'styles/assets/icons/search.svg';
import ActInput from 'components/atoms/ActInput';
import { searchYup } from 'utils/yupSchema';

const ActSearchBar = ({ type, searchResultData }) => {
  const searchDefaultForm = {
    search: '',
  };

  const formOptions = { mode: 'onChange', defaultValues: searchDefaultForm, resolver: yupResolver(searchYup) };

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);

  const searchWatch = watch('search');

  useEffect(() => {
    //todo 실시간 검색할건지?
  }, [searchWatch]);

  const onSubmit = data => {
    console.log('onSubmit', type, data);
    searchResultData(data);
  };

  const style = {
    '& fieldset': { border: 'none', padding: 0 },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
        padding: 0,
      },
      '&.Mui-focused fieldset': {
        border: 'none',
        padding: 0,
      },
    },
    '&.MuiTextField-root': {
      border: 'none',
      padding: 0,
    },
    padding: 0,
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="act-search-bar-wrapper">
        <SearchIcon />
        <ActInput {...register('search')} id="search" placeholder="검색어를 입력하세요" control={control} errors={errors} style={style} hideErrorMessage={true} />
      </div>
    </form>
  );
};
export default ActSearchBar;
