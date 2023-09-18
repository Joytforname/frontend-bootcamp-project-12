import React from 'react';
import getModal from './modals/index';

const renderModal = (props) => {
  const {
    modalInfo, hideModal,
  } = props;
  if (!modalInfo.type) {
    return null;
  }

  const Modal = getModal(modalInfo.type);
  return (
    <Modal
      modalInfo={modalInfo}
      onHide={hideModal}
    />
  );
};

export default renderModal;
