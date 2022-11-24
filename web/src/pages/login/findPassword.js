import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { findPasswordYup } from 'utils/yupSchema';
import ActInput from 'components/atoms/ActInput';
import ActDrawer from 'components/atoms/ActDrawer';
import ActButton from 'components/atoms/ActButton';

const FindPassword = ({ setOption }) => {
  const [drawerState, setDrawerState] = useState({ anchor: 'bottom', open: false, item: undefined });

  useEffect(() => {
    setOption({ title: '비밀번호 찾기', subtitle: '임시 비밀번호를\n이메일로 보내드립니다.', description: '회원가입시 등록한 이메일 주소를 입력해주세요.', back: true, menu: false });
    return () => setOption({});
  }, [setOption]);

  const findPasswordDefaultForm = {
    userId: '',
  };
  const formOptions = { defaultValues: findPasswordDefaultForm, resolver: yupResolver(findPasswordYup) };

  const {
    control,
    register,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting, errors },
  } = useForm(formOptions);

  const onSubmit = async data => {
    toggleDrawer(true);
    // setActiveGuard(false);
    // const postData = { ...data, status: statusCheck ? 1 : 0 };
    // updateUserBoard(postData);
    // if (await login({ userName: 'lucas', password: 'lucas123' })) {
    //   navigate(state ? state.from : '/', { replace: true });
    // }
  };

  const onHandleClick = () => {
    toggleDrawer(false);
  };

  const itemEl = (
    <div className="col max-width height-vh-30 align-center justify-around">
      <div className="pre-wrap text-center">{'가입된 이메일 주소로\n임시 비밀번호를 보냈습니다.'}</div>
      <ActButton className="width-vw-90" handleOnClick={onHandleClick} label="확인" />
    </div>
  );

  const toggleDrawer = isOpen => {
    setDrawerState({
      ...drawerState,
      item: itemEl,
      open: isOpen,
    });
  };

  return (
    <div className="col max-width padding-row-8">
      <form className="col padding-col-16 gap-16" onSubmit={handleSubmit(onSubmit)}>
        <ActInput {...register('userId')} id="userId" placeholder="아이디(이메일 주소)를 입력해 주세요" errors={errors} control={control} />
        <div className="row align-center justify-end">
          <ActButton className="width-vw-50" type="submit" disabled={!isValid} label="임시 비밀번호 보내기" />
        </div>
      </form>
      <ActDrawer drawerState={[drawerState, setDrawerState]} />
    </div>
  );
};
export default FindPassword;
