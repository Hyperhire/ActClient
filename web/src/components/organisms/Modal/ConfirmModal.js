import React from 'react';
import Modal from '@mui/material/Modal';

export default function ConfirmModal({ visible, onCancel, onConfirm, children }) {
  const confirm = () => {
    onCancel();
    onConfirm();
  };

  return (
    <Modal open={visible}>
      <div className="confirm-modal-wrapper col align-center justify-center padding-8">
        <div className="row align-center justify-center padding-col-8">{children}</div>
        <div className="row align-center justify-center">
          <button onClick={() => onCancel()} className="centered padding-row-12 padding-col-8 bordered border-radius-6 primary background-white-hover link">
            <span className="font-size-16 font-weight-700 poppins">Cancel</span>
          </button>
          <button onClick={confirm} className="centered padding-row-12 left-16 padding-col-8 border-none border-radius-6 background-primary white background-primary-hover link">
            <span className="font-size-16 font-weight-700 poppins">Confirm</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}
