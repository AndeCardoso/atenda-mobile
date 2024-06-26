import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Layout, WrapperButtons, WrapperTop } from "./styles";
import { Button } from "@components/base/Button";
import { LoginForm } from "./loginForm";
import { IAuthForm, authSchema } from "./loginForm/schema";
import { useAuthController } from "./useAuthController";
import { Image, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "@components/base/StatusBar";
import { useTheme } from "styled-components";
import { Text } from "@components/base/Text";
import { BaloonCard } from "@components/base/BaloonCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { images } from "@assets/index";

const ios = Platform.OS === "ios";

export const AuthPage = () => {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  const {
    alertState,
    handleLogin,
    onClearAlert,
    loginErrorState,
    goToUserRegister,
    viewState: { loading },
  } = useAuthController();

  const { control, handleSubmit, setError, watch, clearErrors } =
    useForm<IAuthForm>({
      defaultValues: {
        email: "andersoncardoso.dev@gmail.com",
        password: "123456",
      },
      mode: "onSubmit",
      resolver: yupResolver(authSchema),
    });

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    onClearAlert();
  }, [email, password]);

  useEffect(() => {
    if (loginErrorState)
      setError("email", { message: loginErrorState, type: "validate" });
  }, [loginErrorState]);

  useEffect(() => {
    clearErrors();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={ios ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Layout paddingTop={top} source={images.background}>
        <WrapperTop>
          <Image
            resizeMode="center"
            style={{ width: 355, height: 100 }}
            source={images.brand.light}
          />
          <LoginForm control={control} />
          {alertState ? (
            <BaloonCard
              color="SECONDARY_INACTIVE_OPACITY"
              icon={{
                name: "information",
                color: "ALERT",
                size: 24,
              }}
              styles={{ position: "absolute", bottom: 64 }}
            >
              <Text
                color="ALERT"
                size={18}
                weight="600"
                textAlign="left"
                fullwidth
              >
                {alertState}
              </Text>
            </BaloonCard>
          ) : null}
        </WrapperTop>
        <WrapperButtons ios={ios}>
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
    </KeyboardAvoidingView>
  );
};
