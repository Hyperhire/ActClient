import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { request, setAuthorization } from 'utils/axiosClient';
import { api } from 'repository';
import { authAtom } from 'state';
import useModal from './useModal';
import { MODAL_TYPES } from 'constants/constant';
import { setItem, USER_INFO } from 'utils/sessionStorage';
import { AUTH_INFO, setLocalItem } from 'utils/localStorage';

export const useLogin = queryKey => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const login = async loginInfo => {
    return request({ url: api.auth.login, method: 'post', data: loginInfo });
  };

  return useMutation(login, {
    onSuccess: async data => {
      if (data.status === 200 || data.status === 201) {
        setLocalItem(AUTH_INFO, { token: data.data.data.token });
        setAuthorization(data.data.data.token);
        //todo server에서 데이터 받아와야 됨
        request({ url: api.auth.my, method: 'get' }).then(response => {
          if (response.status === 200) {
            setItem(USER_INFO, response.data);
          }
        });
        await queryClient.invalidateQueries(queryKey);
      } else {
        showModal({
          open: true,
          message: `로그인에 실패하였습니다.\n${data.message}`,
        });
      }
    },
    onError: (error, variable, context) => {
      console.log('onError', error, variable, context);
    },
    onSettled: () => {
      console.log('onSettled login');
    },
  });
};

export const useRegisterByEmail = queryKey => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const register = async userInfo => {
    return request({ url: api.auth.register, method: 'post', data: userInfo });
  };

  return useMutation(register, {
    onSuccess: async data => {
      if (data.status === 200) {
        await queryClient.invalidateQueries(queryKey);
      } else {
        showModal({
          modalType: MODAL_TYPES.ALERT_MODAL,
          modalProps: {
            message: `회원가입에 실패하였습니다.\n${data.message}`,
          },
        });
      }
    },
    onError: (error, variable, context) => {
      console.log('onError', error, variable, context);
    },
    onSettled: () => {
      console.log('onSettled useRegisterByEmail');
    },
  });
};
