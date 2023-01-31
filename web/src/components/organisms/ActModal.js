import React from 'react';
import { useRecoilValue } from 'recoil';
import { modalAtom } from 'state/modal';
import useModal from 'hooks/useModal';
import ActDrawer from 'components/atoms/ActDrawer';
import ActButton from 'components/atoms/ActButton';

const ActModal = () => {
  const { hideModal } = useModal();
  const modalProps = useRecoilValue(modalAtom);
  const { open, message, confirmText = '확인', cancelText = '취소', handleCancel, handleConfirm } = modalProps;

  const onClose = () => {
    hideModal();
  };

  const onConfirm = async () => {
    if (handleConfirm) {
      await handleConfirm();
    }
    onClose();
  };

  const onCancel = async () => {
    if (handleCancel) {
      await handleCancel();
    }
    onClose();
  };

  const drawerInfo = {
    anchor: 'bottom',
    open: open,
    close: onClose,
    item: (
      <div className="act-modal-wrapper">
        <div className="act-modal-message-wrapper">
          <div className="act-modal-message">{message}</div>
        </div>
        <div className="act-modal-button-wrapper">
          {handleCancel && (
            <div className="max-width">
              <ActButton className="primary-button-large-outline" handleOnClick={onCancel} label={cancelText} />
            </div>
          )}
          <div className="max-width">
            <ActButton className="primary-button-large" handleOnClick={onConfirm} label={confirmText} />
          </div>
        </div>
      </div>
    ),
  };

  return <ActDrawer drawerInfo={drawerInfo} />;
};

export default ActModal;
