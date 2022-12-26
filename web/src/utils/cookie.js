import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (key, data, options) => {
  return cookies.set(key, data.content, {
    sameSite: 'strict',
    path: '/',
    expires: new Date(data.expires),
    ...options,
  });
};

export const getCookie = key => {
  return cookies.get(key);
};

export const removeCookie = (key, options) => {
  return cookies.remove(key, { sameSite: 'strict', path: '/', ...options });
};
