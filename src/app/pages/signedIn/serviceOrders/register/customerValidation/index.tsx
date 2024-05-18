import { Layout } from "@components/Layout";
import React from "react";
import { Container, WrapperButtons } from "./styles";
import { AbandonmentModal } from "../../components/AbandonmentModal";
import { useServiceOrderRegisterReview } from "./useServiceOrderRegisterReview";
import { Button } from "@components/base/Button";
import { SignatureCanva } from "@components/SignatureCanva";

export const CustomerValidationPage = () => {
  const {
    data,
    signatureRef,
    handleGoBack,
    handleRegister,
    onAbandomentModalToggle,
    handleConfirmAbandonment,
    viewState: { registerLoading, abandomentOpenModalState },
  } = useServiceOrderRegisterReview();

  return (
    <Layout
      header="Assinatura do cliente"
      goBack={handleGoBack}
      close={onAbandomentModalToggle}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleRegister}
            mode="contained"
            loading={registerLoading}
          >
            Cadastrar O.S.
          </Button>
        </WrapperButtons>
      }
    >
      <Container>
        <SignatureCanva
          sigantureOwner={data?.customer.name!!}
          signatureRef={signatureRef}
        />
      </Container>
      <AbandonmentModal
        onConfirm={handleConfirmAbandonment}
        onDismiss={onAbandomentModalToggle}
        open={abandomentOpenModalState}
      />
    </Layout>
  );
};
