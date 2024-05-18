import { Layout } from "@components/Layout";
import React from "react";
import { Container, WrapperButtons } from "./styles";
import { AbandonmentModal } from "../../components/AbandonmentModal";
import { useServiceOrderRegisterReview } from "./useServiceOrderRegisterReview";
import { CustomerAccordion } from "@components/accordions/CustomerAccordion";
import { Divider } from "@components/base/Separator";
import { Button } from "@components/base/Button";
import { Text } from "@components/base/Text";

export const CustomerValidationPage = () => {
  const {
    data,
    handleGoBack,
    handleRegister,
    onAbandomentModalToggle,
    handleConfirmAbandonment,
    viewState: { registerLoading, abandomentOpenModalState },
  } = useServiceOrderRegisterReview();
  return (
    <Layout
      header="Validação do cliente"
      goBack={handleGoBack}
      close={onAbandomentModalToggle}
      hasScroll
      footer={
        <WrapperButtons>
          <Button
            onPress={handleRegister}
            mode="contained"
            loading={registerLoading}
          >
            Cadastrar ordem de serviço
          </Button>
        </WrapperButtons>
      }
    >
      <Container>
        <Text color="WHITE_TEXT" size={14}>
          Cliente:
        </Text>
        <CustomerAccordion data={data?.customer!!} />
        <Divider />
      </Container>
      <AbandonmentModal
        onConfirm={handleConfirmAbandonment}
        onDismiss={onAbandomentModalToggle}
        open={abandomentOpenModalState}
      />
    </Layout>
  );
};
