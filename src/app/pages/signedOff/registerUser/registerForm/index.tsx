import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control } from "react-hook-form";
import { useTheme } from "styled-components";
import { IRegisterUserForm } from "./formSchema";

interface IRegisterUserFormProps {
  control: Control<IRegisterUserForm>;
}

export const RegisterUserForm = ({ control }: IRegisterUserFormProps) => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <Container>
      <ControlledInput
        label="Nome"
        labelStyle={{
          color: colors.WHITE,
          fontWeight: "600",
          fontSize: 20,
        }}
        placeholder="Digite seu e-mail"
        name="name"
        control={control}
      />
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
    </Container>
  );
};
