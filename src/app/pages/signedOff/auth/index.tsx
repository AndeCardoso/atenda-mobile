import React from "react";
import { useForm } from "react-hook-form";
import { Layout, WrapperButtons, WrapperTop } from "./styles";
import { Button } from "@components/base/Button";
import { LoginForm } from "./loginForm";
import { IAuthForm } from "./loginForm/formSchema";
import { useAuthController } from "./useAuthController";
import { Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "@components/base/StatusBar";
import { useTheme } from "styled-components";

export const AuthPage = () => {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  const {
    handleLogin,
    goToUserRegister,
    viewState: { loading },
  } = useAuthController();

  const { control, handleSubmit } = useForm<IAuthForm>({
    defaultValues: {
      email: "admin@test.com",
      password: "123456",
    },
  });

  return (
    <Layout paddingTop={top} source={require("../../../assets/background.png")}>
      <WrapperTop>
        <Image
          resizeMode="center"
          style={{ width: 355, height: 200 }}
          source={require("../../../assets/brand/brand-ligth.png")}
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
      <StatusBar textColor="light" backgroundColor={colors.primary} />
    </Layout>
  );
};
