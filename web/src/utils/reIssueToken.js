import dayjs from 'dayjs';
import { getCookie, setCookie } from './cookie';
import { request, setAuthorization } from './axiosClient';
import { api } from '../repository';
import { COOKIES } from '../constants/constant';

let localSetAuth;
let localSetUser;
let localResetAuth;
let localResetUser;

const reIssueToken = async () => {
  const refreshToken = getCookie('refresh-token');
  if (refreshToken) {
    const res = await request({ url: api.auth.reIssueToken, method: 'post', data: { refreshToken } });
    if (res.status === 200) {
      await onRefreshSuccess({ token: res.data.data });
    } else {
      localResetAuth();
      localResetUser();
    }
  }
};

const onRefreshSuccess = async ({ token }) => {
  setCookie(COOKIES.REFRESH_TOKEN, { content: token.refreshToken, expires: token.refreshTokenExpiresAt });
  localSetAuth({ authenticated: true, accessToken: token.accessToken, expires: token.accessTokenExpiresAt });
  setAuthorization(token.accessToken);
  const myRes = await request({ url: api.auth.my, method: 'get' });
  if (myRes.status === 200) {
    localSetUser(myRes.data.data);
  } else {
    localResetAuth();
    localResetUser();
  }
  const expires = dayjs(token.accessTokenExpiresAt);
  const now = dayjs(new Date());
  setTimeout(() => {
    reIssueToken();
  }, Math.round(expires.diff(now)) - 60000);
};

export const handleReIssueToken = async ({ token, setAuth, setUser, resetAuth, resetUser }) => {
  if (token) {
    await onRefreshSuccess({ token });
  } else {
    localSetAuth = setAuth;
    localSetUser = setUser;
    localResetAuth = resetAuth;
    localResetUser = resetUser;
    await reIssueToken();
  }
};
