import { useMutation, useQueryClient } from 'react-query';
import useModal from './useModal';
import { request } from 'utils/axiosClient';
import { api } from '../repository';

export const useLogin = queryKey => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();

  const login = async loginInfo => {
    return request({ url: api.auth.login, method: 'post', data: loginInfo });
  };

  return useMutation(login, {
    onSuccess: async data => {
      if (data.status === 200) {
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
