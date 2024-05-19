import React from "react";
import { Text } from "@components/base/Text";
import { IconButton } from "@components/base/IconButton";
import { Content, Footer, Header, ModalContainer } from "./styles";
import { Button } from "@components/base/Button";
import { Icon } from "@components/base/Icon";
import { Modal } from "@components/base/Modal";

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
    <Modal modalVisible={open} onToggleModal={onDismiss}>
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
    </Modal>
  );
};
