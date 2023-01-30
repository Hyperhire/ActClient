import { useRecoilState } from 'recoil';

import { modalAtom } from 'state';

const useModal = () => {
  const [modal, setModal] = useRecoilState(modalAtom);

  const showModal = modalProps => {
    setModal(modalProps);
  };

  const hideModal = () => {
    setModal({ ...modal, open: false });
  };

  return {
    modal,
    setModal,
    showModal,
    hideModal,
  };
};
export default useModal;
