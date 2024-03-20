import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  ISendRecoverTokenForm,
  sendRecoverTokenSchema,
} from "./sendTokenForm/formSchema";

import { Layout } from "@components/Layout";
import { Text } from "@components/base/Text";
import { Button } from "@components/base/Button";
import { BaloonCard } from "@components/base/BaloonCard";

import { Container, WrapperButtons } from "./styles";

import { SendRecoverTokenForm } from "./sendTokenForm";
import { useSendRecoverTokenController } from "./useSendRecoverTokenController";

export const SendRecoverTokenPage = () => {
  const {
    handleGoBack,
    handleRegister,
    viewState: { loading },
  } = useSendRecoverTokenController();

  const { control, handleSubmit } = useForm<ISendRecoverTokenForm>({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(sendRecoverTokenSchema),
  });
  return (
    <Layout
      header="Recuperar senha"
      goBack={handleGoBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister)}
            mode="contained"
            loading={loading}
          >
            Enviar
          </Button>
        </WrapperButtons>
      }
    >
      <Container>
        <SendRecoverTokenForm control={control} />
        <BaloonCard color="PRIMARY">
          <Text color="SECONDARY">
            Informe seu e-mail cadastrado para que seja enviado o token de
            segurança. Demais orientações estarão presentes no e-mail que será
            enviado.
          </Text>
        </BaloonCard>
      </Container>
    </Layout>
  );
};
