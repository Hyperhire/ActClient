import { useMutation, useQueryClient } from 'react-query';
import { request } from 'utils/axiosClient';
import { api } from 'repository';

export const useLogin = queryKey => {
  const queryClient = useQueryClient();

  const login = async loginInfo => {
    return request({ url: api.auth.login, method: 'post', data: loginInfo });
  };

  return useMutation(login, {
    onSuccess: async data => {
      if (data.status === 200) {
        console.log('success', data.data);
        await queryClient.invalidateQueries(queryKey);
      } else {
        console.log('fail', data.data);
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

  const register = async userInfo => {
    return request({ url: api.auth.register, method: 'post', data: userInfo });
  };

  return useMutation(register, {
    onSuccess: async data => {
      if (data.status === 200) {
        console.log('success', data.data);
        await queryClient.invalidateQueries(queryKey);
      } else {
        console.log('fail', data.data);
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
