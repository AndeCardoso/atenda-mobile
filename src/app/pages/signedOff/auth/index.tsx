import React from "react";
import { useForm } from "react-hook-form";
import { Layout, WrapperButtons, WrapperTop } from "./styles";
import { Button } from "@components/base/Button";
import { LoginForm } from "./loginForm";
import { IAuthForm } from "./loginForm/formSchema";
import { useAuthController } from "./useAuthController";
import { Image } from "react-native";

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
    <Layout>
      <WrapperTop>
        <Image
          resizeMode="center"
          style={{ width: 355, height: 200 }}
          source={require("../../../assets/brand/brand-space.png")}
        />
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
  );
};
