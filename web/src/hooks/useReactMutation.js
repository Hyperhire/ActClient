import { useMutation, useQueryClient } from 'react-query';
import { useContext } from 'react';
import { request } from 'utils/axiosClient';
import { api } from 'repository';
import useModal from './useModal';
import { LOGIN_TYPE, MEMBER_TYPE, ORGANIZATION_NEWS_TYPE } from 'constants/constant';
import { TokenContext } from '../utils/TokenContext';
import Logger from 'utils/logger';
export const useLogin = queryKey => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const { onRefreshSuccess } = useContext(TokenContext);

  const login = async loginInfo => {
    return request({ url: api.auth.login, method: 'post', data: loginInfo });
  };

  return useMutation(login, {
    onSuccess: async data => {
      if (data.status === 200) {
        // await handleReIssueToken({ token: data.data.data.token });
        await queryClient.invalidateQueries(queryKey);
      } else {
        showModal({
          open: true,
          message: `로그인에 실패하였습니다.\n${data.message}`,
        });
      }
    },
    onError: (error, variable, context) => {
      Logger.error('onError', error, variable, context);
    },
    onSettled: () => {
      Logger.log('onSettled login');
    },
  });
};

export const useRegisterByEmail = queryKey => {
  const queryClient = useQueryClient();
  const { showModal } = useModal();
  const register = async registerInfo => {
    return request({
      data: registerInfo.data,
      url:
        registerInfo.loginType === LOGIN_TYPE.EMAIL
          ? registerInfo.type === MEMBER_TYPE.ORGANIZATION
            ? api.auth.registerOrg
            : api.auth.registerInd
          : registerInfo.type === MEMBER_TYPE.ORGANIZATION
          ? api.auth.registerOrgSocial
          : api.auth.registerIndSocial,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation(register, {
    onSuccess: async data => {
      if (data.status === 201) {
        await queryClient.invalidateQueries(queryKey);
      } else {
        showModal({
          open: true,
          message: `회원가입에 실패하였습니다.\n${data.message}`,
        });
      }
    },
    onError: (error, variable, context) => {
      Logger.error('onError', error, variable, context);
    },
    onSettled: () => {
      Logger.log('onSettled useRegisterByEmail');
    },
  });
};

export const useEditProfile = queryKey => {
  const queryClient = useQueryClient();
  const editProfile = async profileInfo => {
    return request({
      data: profileInfo,
      url: api.auth.editProfile,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation(editProfile, {
    onSuccess: async data => {
      if (data.status === 200 || data.status === 201) {
        await queryClient.invalidateQueries(queryKey);
      }
    },
    onError: (error, variable, context) => {
      Logger.error('onError', error, variable, context);
    },
    onSettled: () => {
      Logger.log('onSettled useEditProfile');
    },
  });
};

export const useEditOrgInformation = queryKey => {
  const queryClient = useQueryClient();
  const editOrgInfo = async orgInfo => {
    return request({
      data: orgInfo,
      url: api.auth.editOrgProfile,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation(editOrgInfo, {
    onSuccess: async data => {
      if (data.status === 200 || data.status === 201) {
        await queryClient.invalidateQueries(queryKey);
      }
    },
    onError: (error, variable, context) => {
      Logger.error('onError', error, variable, context);
    },
    onSettled: () => {
      Logger.log('onSettled useEditOrgInformation');
    },
  });
};

export const useNewsPost = queryKey => {
  const queryClient = useQueryClient();
  const newsPost = async newsInfo => {
    return request({
      data: newsInfo.data,
      url: newsInfo.type === ORGANIZATION_NEWS_TYPE.NEWS ? api.news.post : api.notice.post,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation(newsPost, {
    onSuccess: async data => {
      if (data.status === 200 || data.status === 201) {
        await queryClient.invalidateQueries(queryKey);
      }
    },
    onError: (error, variable, context) => {
      Logger.error('onError', error, variable, context);
    },
    onSettled: () => {
      Logger.log('onSettled useNewsPost');
    },
  });
};

export const useCampaignPost = queryKey => {
  const queryClient = useQueryClient();
  const campaignPost = async newsInfo => {
    return request({
      data: newsInfo,
      url: api.campaign.post,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  return useMutation(campaignPost, {
    onSuccess: async data => {
      if (data.status === 200 || data.status === 201) {
        await queryClient.invalidateQueries(queryKey);
      }
    },
    onError: (error, variable, context) => {
      Logger.error('onError', error, variable, context);
    },
    onSettled: () => {
      Logger.log('onSettled useCampaignPost');
    },
  });
};
