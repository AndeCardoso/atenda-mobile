import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { useRegisterCustomerFormController } from "./useRegisterCustomerFormController";
import { ICustomerForm, customerSchema } from "../schema";
import { RegisterCustomerForm } from "./form";

export const CustomerRegisterFormPage = () => {
  const {
    handleRegister,
    handleGoBack,
    viewState: { registerLoading },
  } = useRegisterCustomerFormController();

  const { control, handleSubmit, setValue } = useForm<ICustomerForm>({
    resolver: yupResolver(customerSchema),
  });

  return (
    <Layout
      header="Cadastrar cliente"
      goBack={handleGoBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister)}
            mode="contained"
            loading={registerLoading}
          >
            Cadastrar
          </Button>
        </WrapperButtons>
      }
      hasScroll
    >
      <Container>
        <RegisterCustomerForm controlProp={control} setValueProp={setValue} />
      </Container>
    </Layout>
  );
};
