import React, { PropsWithChildren } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Portal, Modal as PaperModal } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";

const ios = Platform.OS === "ios";

interface IModalProps extends PropsWithChildren {
  modalVisible: boolean;
  onToggleModal: () => void;
}

export const Modal = ({
  modalVisible,
  onToggleModal,
  children,
}: IModalProps) => {
  return (
    <Portal>
      <PaperModal visible={modalVisible} onDismiss={onToggleModal} dismissable>
        <KeyboardAvoidingView
          behavior={"padding"}
          keyboardVerticalOffset={ios ? RFValue(40) : 0}
        >
          {children}
        </KeyboardAvoidingView>
      </PaperModal>
    </Portal>
  );
};
