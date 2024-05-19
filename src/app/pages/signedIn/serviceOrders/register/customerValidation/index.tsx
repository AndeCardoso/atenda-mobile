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
    onEnableForwardButton,
    onAbandomentModalToggle,
    handleConfirmAbandonment,
    viewState: {
      registerLoading,
      abandomentOpenModalState,
      forwardButtonEnableState,
    },
  } = useServiceOrderRegisterReview();

  return (
    <Layout
      header="Assinatura do cliente"
      goBack={handleGoBack}
      close={onAbandomentModalToggle}
      footer={
        <WrapperButtons>
          <Button
            mode="contained"
            onPress={handleRegister}
            loading={registerLoading}
            disabled={!forwardButtonEnableState}
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
          onDirty={onEnableForwardButton}
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
