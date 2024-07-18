import React from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { RegisterCompanyForm } from "./registerForm";
import { useForm } from "react-hook-form";
import {
  IRegisterCompanyForm,
  registerCompanySchema,
} from "./registerForm/formSchema";
import { Button } from "@components/base/Button";
import { useRegisterUserController } from "./useRegisterCompanyController";
import { useFormErrorAlert } from "@hooks/useFormErrorAlert";

export const RegisterCompanyPage = () => {
  const { goBack } = useNavigation();
  const { scrollViewFormRef, onFormError } = useFormErrorAlert();

  const {
    handleRegister,
    viewState: { loading },
  } = useRegisterUserController();

  const { control, handleSubmit } = useForm<IRegisterCompanyForm>({
    resolver: yupResolver(registerCompanySchema),
  });

  return (
    <Layout
      header="Cadastro de empresa"
      goBack={goBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister, onFormError)}
            mode="contained"
            loading={loading}
          >
            Cadastrar
          </Button>
        </WrapperButtons>
      }
      hasScroll
      scrollViewRef={scrollViewFormRef}
    >
      <Container>
        <RegisterCompanyForm control={control} />
      </Container>
    </Layout>
  );
};
