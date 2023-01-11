import { atom } from 'recoil';

export const authAtom = atom({
  key: 'auth',
  default: { authenticated: false, accessToken: null, expires: null },
});
