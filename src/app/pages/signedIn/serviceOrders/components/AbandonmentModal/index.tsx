import React from "react";
import { Modal, Portal } from "react-native-paper";
import { Text } from "@components/base/Text";
import { IconButton } from "@components/base/IconButton";
import { Content, Footer, Header, ModalContainer } from "./styles";
import { Button } from "@components/base/Button";
import { Icon } from "@components/base/Icon";
import { KeyboardAvoidingView, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const ios = Platform.OS === "ios";

interface IAbandonmentModalProps {
  open: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
}

export const AbandonmentModal = ({
  open,
  onConfirm,
  onDismiss,
}: IAbandonmentModalProps) => {
  const handleConfirm = () => {
    onConfirm();
    onDismiss();
  };

  return (
    <Portal>
      <Modal visible={open} onDismiss={onDismiss} dismissable>
        <KeyboardAvoidingView
          behavior={ios ? "padding" : "height"}
          keyboardVerticalOffset={ios ? RFValue(40) : 0}
        >
          <ModalContainer>
            <Header>
              <Text size={24} weight="700" color="SECONDARY">
                Abandono de cadastro
              </Text>
              <IconButton
                name="close"
                size={26}
                onPress={onDismiss}
                color="SECONDARY"
              />
            </Header>
            <Content>
              <Icon name="alert-circle" size={128} color="PRIMARY" />
              <Text size={22} weight="700" color="WHITE">
                Deseja abandonar o cadastro?
              </Text>
              <Text size={18} color="WHITE">
                Todos os dados serão descartados
              </Text>
            </Content>
            <Footer space="space-between">
              <Button mode="outlined" onPress={onDismiss} fullwidth>
                Cancelar
              </Button>
              <Button mode="contained" onPress={handleConfirm} fullwidth>
                Confirmar
              </Button>
            </Footer>
          </ModalContainer>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
};
