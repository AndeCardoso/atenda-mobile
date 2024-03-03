import React from "react";
import { Control } from "react-hook-form";
import { Container, PasswordWrapper, StyledButton } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { useTheme } from "styled-components";
import { IAuthForm } from "./formSchema";
import { useAuthController } from "../useAuthController";

interface ILoginFormProps {
  control: Control<IAuthForm>;
}

export const LoginForm = ({ control }: ILoginFormProps) => {
  const theme = useTheme();
  const { colors } = theme;

  const { goToRecoverPassword } = useAuthController();

  return (
    <Container>
      <ControlledInput
        label="E-mail"
        labelStyle={{
          color: colors.WHITE,
          fontWeight: "600",
          fontSize: 20,
        }}
        placeholder="Digite seu e-mail"
        name="email"
        control={control}
      />
      <PasswordWrapper>
        <ControlledInput
          label="Senha"
          labelStyle={{
            color: colors.WHITE,
            fontWeight: "600",
            fontSize: 20,
          }}
          placeholder="Digite sua senha"
          name="password"
          password
          control={control}
        />
        <StyledButton link onPress={goToRecoverPassword}>
          Recuperar senha
        </StyledButton>
      </PasswordWrapper>
    </Container>
  );
};
