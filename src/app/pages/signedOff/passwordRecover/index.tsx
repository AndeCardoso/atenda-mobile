import React from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  IRecoverPasswordForm,
  recoverPasswordSchema,
} from "./recoverForm/formSchema";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { Button } from "@components/base/Button";
import { RecoverPasswordForm } from "./recoverForm";

export const PasswordRecoverPage = () => {
  const { goBack } = useNavigation();

  const { control, handleSubmit } = useForm<IRecoverPasswordForm>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      token: "",
    },
    resolver: yupResolver(recoverPasswordSchema),
  });
  return (
    <Layout
      header="Recuperar senha"
      goBack={goBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(console.log)}
            mode="contained"
            loading={false}
          >
            Salvar
          </Button>
        </WrapperButtons>
      }
    >
      <Container>
        <RecoverPasswordForm control={control} />
      </Container>
    </Layout>
  );
};
