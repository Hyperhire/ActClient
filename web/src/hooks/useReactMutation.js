import { useMutation, useQueryClient } from 'react-query';
import { request } from 'utils/axiosClient';
import { api } from 'repository';

const login = async userInfo => {
  return request({ url: api.membership.login, method: 'post', data: userInfo });
};
export const useLogin = queryKey => {
  const queryClient = useQueryClient();

  return useMutation(login, {
    onSuccess: async data => {
      if (data.data.status === 200) {
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
