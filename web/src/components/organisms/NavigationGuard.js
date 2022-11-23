import React from 'react';
import Modal from 'components/organisms/Modal/ConfirmModal';
import usePrompt from 'hooks/usePrompt';

const NavigationGuard = ({ when, onClickYes, message = 'Are you sure to leave this page?' }) => {
  const { showPrompt, confirmNavigation, cancelNavigation } = usePrompt(when);

  const handleClickNo = () => {
    cancelNavigation();
  };

  const handleClickYes = () => {
    if (onClickYes) {
      onClickYes();
    }
    confirmNavigation();
  };

  return (
    <Modal visible={showPrompt} onCancel={handleClickNo} onConfirm={handleClickYes}>
      <span className="font-size-20 font-weight-600 poppins">{message}</span>
    </Modal>
  );
};

export default NavigationGuard;
