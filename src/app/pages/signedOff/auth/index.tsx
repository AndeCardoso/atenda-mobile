import React from "react";
import { useForm } from "react-hook-form";
import {
  Background,
  BrandText,
  Layout,
  WrapperButtons,
  WrapperTop,
} from "./styles";
import { Button } from "@components/base/Button";
import { LoginForm } from "./loginForm";
import { IAuthForm } from "./loginForm/formSchema";
import { useAuthController } from "./useAuthController";

export const AuthPage = () => {
  const {
    handleLogin,
    goToUserRegister,
    viewState: { loading },
  } = useAuthController();

  const { control, handleSubmit } = useForm<IAuthForm>({
    defaultValues: {
      email: "ande@test.com",
      password: "321654",
    },
  });

  return (
    <Background source={require("../../../assets/background.png")}>
      <Layout>
        <WrapperTop>
          <BrandText brandFont size={124} color="WHITE">
            ATENDA
          </BrandText>
          <LoginForm control={control} />
        </WrapperTop>
        <WrapperButtons>
          <Button onPress={goToUserRegister} mode="outlined" fullwidth>
            Cadastrar
          </Button>
          <Button
            onPress={handleSubmit(handleLogin)}
            mode="contained"
            loading={loading}
            fullwidth
          >
            Entrar
          </Button>
        </WrapperButtons>
      </Layout>
    </Background>
  );
};
