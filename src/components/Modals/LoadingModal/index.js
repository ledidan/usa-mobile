import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { Modal } from "fields/ModalTemplate";

const LoadingModal = () => {
  return (
    <Modal>
      <ActivityIndicator size="small" />
    </Modal>
  );
};

export default LoadingModal;
