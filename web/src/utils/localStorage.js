export const AUTH_INFO = 'auth-info';

export const getLocalItem = key => {
  return JSON.parse(localStorage.getItem(key));
};

export const setLocalItem = (key, item) => {
  return window.localStorage.setItem(key, JSON.stringify(item));
};

export const removeLocalItem = key => {
  return window.localStorage.removeItem(key);
};
