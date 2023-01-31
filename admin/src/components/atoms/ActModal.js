import React from 'react';
import { useRecoilValue } from 'recoil';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useModal from 'hooks/useModal';
import { modalAtom } from 'state/modal';

const ActModal = () => {
  const { hideModal } = useModal();
  const modalProps = useRecoilValue(modalAtom);
  const { open, message, confirmText = '확인', cancelText = '취소', handleCancel, handleConfirm } = modalProps;
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 12,
    p: 4,
  };
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

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div className="col gap-24">
          <div className="max-width flex-1 align-center justify-center">{message.content}</div>
          {message.type === 'image' ? (
            <div className="absolute link white" style={{ top: 0, right: -50 }} onClick={() => onClose()}>
              close
            </div>
          ) : (
            <div className="row">
              {handleCancel && (
                <div className="max-width flex-1 align-center justify-center">
                  <div className="link" onClick={onCancel}>
                    {cancelText}
                  </div>
                </div>
              )}
              <div className="max-width flex-1 align-center justify-center">
                <div className="link" onClick={onConfirm}>
                  {confirmText}
                </div>
              </div>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default ActModal;
