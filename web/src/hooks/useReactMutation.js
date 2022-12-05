import { useMutation, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { request, setAuthorization } from 'utils/axiosClient';
import { api } from 'repository';
import { authAtom } from 'state';
import useModal from './useModal';
import { MODAL_TYPES } from 'constants/constant';
import { setItem, USER_INFO } from 'utils/sessionStorage';

export const useLogin = queryKey => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const setAuth = useSetRecoilState(authAtom);

  const login = async loginInfo => {
    return request({ url: api.auth.login, method: 'post', data: loginInfo });
  };

  return useMutation(login, {
    onSuccess: async data => {
      if (data.status === 200) {
        setAuthorization(data.data.token);
        setAuth(true);
        //todo server에서 데이터 받아와야 됨
        setItem(USER_INFO, { userName: 'lucas' });
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
      console.log('onSettled');
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
        console.log('success', data.data);
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
      console.log('onSettled');
    },
  });
};
