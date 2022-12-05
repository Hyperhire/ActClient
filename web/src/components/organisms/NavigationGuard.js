import { useEffect } from 'react';
import usePrompt from 'hooks/usePrompt';
import useModal from '../../hooks/useModal';

const NavigationGuard = ({ when, onClickYes, message = 'Are you sure to leave this page?' }) => {
  const { showPrompt, confirmNavigation, cancelNavigation } = usePrompt(when);
  const { showModal } = useModal();

  useEffect(() => {
    showModal({
      open: showPrompt,
      message: message,
      handleConfirm: handleClickYes,
      handleCancel: handleClickNo,
    });
  }, [showPrompt]);
  const handleClickNo = () => {
    cancelNavigation();
  };

  const handleClickYes = () => {
    if (onClickYes) {
      onClickYes();
    }
    confirmNavigation();
  };

  return null;
};

export default NavigationGuard;
