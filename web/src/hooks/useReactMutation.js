import { useMutation, useQueryClient } from 'react-query';
import { request, setAuthorization } from 'utils/axiosClient';
import { api } from 'repository';
import useModal from './useModal';
import { MEMBER_TYPE, MODAL_TYPES } from 'constants/constant';
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
  const register = async registerInfo => {
    return request({
      data: registerInfo.data,
      url: registerInfo.type === MEMBER_TYPE.ORGANIZATION ? api.auth.registerOrg : api.auth.registerInd,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation(register, {
    onSuccess: async data => {
      if (data.status === 200 || data.status === 201) {
        await queryClient.invalidateQueries(queryKey);
      } else {
        showModal({
          open: true,
          message: `회원가입에 실패하였습니다.\n${data.message}`,
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
