import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control } from "react-hook-form";
import { useTheme } from "styled-components";
import { IRecoverPasswordForm } from "./formSchema";

interface IRecoverPasswordFormProps {
  control: Control<IRecoverPasswordForm>;
}

export const RecoverPasswordForm = ({ control }: IRecoverPasswordFormProps) => {
  const theme = useTheme();
  const { colors } = theme;

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
      <ControlledInput
        label="Confirmar senha"
        labelStyle={{
          color: colors.WHITE,
          fontWeight: "600",
          fontSize: 20,
        }}
        placeholder="Digite novamente sua senha"
        name="passwordConfirm"
        password
        control={control}
      />
      <ControlledInput
        label="Token de segurança"
        labelStyle={{
          color: colors.WHITE,
          fontWeight: "600",
          fontSize: 20,
        }}
        placeholder="Digite o token"
        name="token"
        control={control}
      />
    </Container>
  );
};
