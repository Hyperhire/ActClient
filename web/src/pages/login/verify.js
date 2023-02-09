import React, { useEffect, useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ActInput from 'components/atoms/ActInput';
import { verifyYup } from 'utils/yupSchema';
import ActButton from 'components/atoms/ActButton';
import { request } from 'utils/axiosClient';
import { api } from 'repository';
import useModal from 'hooks/useModal';
import { usersAtom } from 'state';
import Logger from 'utils/logger';

const Verify = ({ setOption }) => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { showModal } = useModal();
  const user = useRecoilValue(usersAtom);
  useEffect(() => {
    setOption({ title: '이메일 인증', subtitle: '', description: '', back: true, menu: false });
    return () => setOption({});
  }, [setOption]);

  useEffect(() => {
    if (user?.info.constant.isEmailVerified) navigate('/');
  }, [user]);

  const formOptions = {
    mode: 'onChange',
    resolver: yupResolver(verifyYup),
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm(formOptions);

  const onSubmit = async data => {
    const verifyNumber = [0, 1, 2, 3, 4, 5]
      .map(item => {
        return data[`verify${item}`];
      })
      .join('');
    Logger.log('verifyNumber', verifyNumber);
    const res = await request({ url: api.auth.verifyEmail, method: 'post', data: { code: verifyNumber } });
    if (res.status === 200) {
      showModal({
        open: true,
        message: `인증되었습니다.`,
        handleConfirm: () => navigate('/'),
      });
    }
  };

  const onChange = (e, index) => {
    if (e.target.value) {
      if (index === 5) return;
      inputRefs.current[index + 1].focus();
    } else {
      if (index === 0) return;
      inputRefs.current[index - 1].focus();
    }
  };

  const onHandleReSend = async () => {
    const res = await request({ url: api.auth.reSendVerification, method: 'post' });
    if (res.status === 200) {
      showModal({
        open: true,
        message: `인증코드를 이메일로 전송하였습니다.`,
      });
    }
  };

  return (
    <div className="verify-wrapper">
      <form className="verify-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="verify-guide1">{'메일로 발송된\n인증코드 6자리를 입력하세요.'}</div>
        <div className="verify-inputs">
          {[0, 1, 2, 3, 4, 5].map((item, index) => {
            return (
              <ActInput
                key={item}
                {...register(`verify${index}`)}
                actInputRef={ref => {
                  inputRefs.current[index] = ref;
                }}
                id={`verify${index}`}
                label=""
                placeholder=""
                type="number"
                errors={errors}
                control={control}
                maxLength={1}
                handleChange={e => onChange(e, index)}
                hideErrorMessage={true}
                style={{
                  padding: 0,
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: 1,
                      border: 'solid 1px #efefef',
                      width: '3rem',
                      height: '3rem',
                    },
                    width: '3rem',
                    height: '3rem',
                  },
                  '& input': {
                    padding: 0,
                    textAlign: 'center',
                    width: '3rem',
                    height: '3rem',
                    fontFamily: 'Pretendard',
                    fontWeight: 600,
                    fontSize: '1.75rem',
                  },
                }}
              />
            );
          })}
        </div>
        <div className="re-send-code-button-wrapper">
          <ActButton className="button-small" label="인증코드 재전송" handleOnClick={onHandleReSend} />
        </div>
        <div className="verify-guide2">{'인증코드가 포함된 메일을 받지 못하셨나요?\n스팸메일함에도 확인 바랍니다.'}</div>
        <div className="submit-button-wrapper">
          <div className="max-width">
            <ActButton className=" tertiary-button-x-large" type="submit" label="가입완료" disabled={!isValid} />
          </div>
        </div>
      </form>
    </div>
  );
};
export default Verify;
