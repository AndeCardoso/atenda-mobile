import { Layout } from "@components/Layout";
import React from "react";
import { Container, WrapperButtons } from "./styles";
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
    viewState: { registerLoading },
  } = useServiceOrderRegisterReview();
  return (
    <Layout
      header="Validação do cliente"
      close={handleGoBack}
      hasScroll
      footer={
        <WrapperButtons>
          <Button
            onPress={handleRegister}
            mode="contained"
            loading={registerLoading}
          >
            Cadatrar ordem de serviço
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
    </Layout>
  );
};
