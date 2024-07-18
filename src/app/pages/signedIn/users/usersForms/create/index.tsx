import React from "react";
import { useNavigation } from "@react-navigation/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { useForm } from "react-hook-form";
import { Button } from "@components/base/Button";
import { RegisterUserForm } from "./form";
import { IUserForm, userSchema } from "../schema";
import { useRegisterUserFormController } from "./useRegisterUserFormController";
import { useFormErrorAlert } from "@hooks/useFormErrorAlert";

export const UserRegisterFormPage = () => {
  const { goBack } = useNavigation();
  const { scrollViewFormRef, onFormError } = useFormErrorAlert();

  const {
    handleRegister,
    viewState: { registerLoading },
  } = useRegisterUserFormController();

  const { control, handleSubmit, getValues, setValue, watch } =
    useForm<IUserForm>({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
      },
      resolver: yupResolver(userSchema),
    });

  return (
    <Layout
      header="Cadastrar usuário"
      goBack={goBack}
      footer={
        <WrapperButtons>
          <Button
            onPress={handleSubmit(handleRegister, onFormError)}
            mode="contained"
            loading={registerLoading}
          >
            Cadastrar
          </Button>
        </WrapperButtons>
      }
      hasScroll
      scrollViewRef={scrollViewFormRef}
    >
      <Container>
        <RegisterUserForm control={control} />
      </Container>
    </Layout>
  );
};
