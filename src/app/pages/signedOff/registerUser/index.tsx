import React from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { RegisterUserForm } from "./registerForm";
import { useForm } from "react-hook-form";
import {
  IRegisterUserForm,
  registerUserSchema,
} from "./registerForm/formSchema";
import { Button } from "@components/base/Button";
import { useRegisterUserController } from "./useRegisterUserController";
import { Loader } from "@components/base/Loader";

export const RegisterUserPage = () => {
  const { goBack } = useNavigation();
  const {
    handleRegister,
    viewState: { loading },
  } = useRegisterUserController();

  const { control, handleSubmit } = useForm<IRegisterUserForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: yupResolver(registerUserSchema),
  });

  return (
    <Layout
      header="Cadastro"
      goBack={goBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister)}
            mode="contained"
            loading={loading}
          >
            Registrar
          </Button>
        </WrapperButtons>
      }
    >
      <Container>
        <RegisterUserForm control={control} />
      </Container>
    </Layout>
  );
};
