import React, { createContext, useState, useEffect } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { authAtom, usersAtom } from 'state';
import { api } from 'repository';
import { COOKIES } from 'constants/constant';
import { getCookie, removeCookie, setCookie } from './cookie';
import { request, setAuthorization } from 'utils/axiosClient';

const TokenContext = createContext(undefined);
const TokenProvider = ({ children }) => {
  const setAuth = useSetRecoilState(authAtom);
  const setUser = useSetRecoilState(usersAtom);
  const resetAuth = useResetRecoilState(authAtom);
  const resetUser = useResetRecoilState(usersAtom);

  const reIssueToken = async () => {
    const refreshToken = getCookie('refresh-token');
    if (refreshToken) {
      const res = await request({ url: api.auth.reIssueToken, method: 'post', data: { refreshToken } });
      if (res.status === 200) {
        await onRefreshSuccess({ token: res.data.data });
      } else {
        logout();
      }
    }
  };

  const onRefreshSuccess = async ({ token }) => {
    console.log('onRefreshSuccess', token);
    setCookie(COOKIES.REFRESH_TOKEN, { content: token.refreshToken, expires: token.refreshTokenExpiresAt });
    setAuth({ authenticated: true, accessToken: token.accessToken, expires: token.accessTokenExpiresAt });
    setAuthorization(token.accessToken);
    // const myRes = await request({ url: api.auth.my, method: 'get', headers: { Authorization: token.accessToken } });
    // if (myRes.status === 200) {
    //   setUser(myRes.data.data);
    // } else {
    //   logout();
    // }
    const expires = dayjs(token.accessTokenExpiresAt);
    const now = dayjs(new Date());
    setTimeout(() => {
      reIssueToken();
    }, Math.round(expires.diff(now)) - 60000);
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      try {
        resetAuth();
        resetUser();
        removeCookie(COOKIES.REFRESH_TOKEN);
        resolve();
      } catch (e) {
        console.log('e', e);
        reject();
      }
    });
  };

  return (
    <TokenContext.Provider
      value={{
        onRefreshSuccess,
        reIssueToken,
        logout,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export { TokenContext, TokenProvider };
