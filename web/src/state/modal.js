import { atom } from 'recoil';

export const modalAtom = atom({
  key: 'modalState',
  default: { open: false, message: '', confirmText: '확인' },
});
