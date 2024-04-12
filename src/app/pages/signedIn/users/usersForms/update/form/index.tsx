import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control } from "react-hook-form";
import { IUserForm } from "../../schema";

interface IUserFormProps {
  control: Control<IUserForm>;
}

export const UpdateTechnicianForm = ({ control }: IUserFormProps) => {
  return (
    <Container>
      <ControlledInput
        label="Nome"
        placeholder="Digite o nome"
        name="name"
        control={control}
      />
      <ControlledInput
        label="E-mail"
        placeholder="Digite o e-mail"
        name="email"
        control={control}
      />
      <ControlledInput
        label="Senha"
        placeholder="Digite a senha"
        name="password"
        password
        control={control}
      />
      <ControlledInput
        label="Confirmar senha"
        placeholder="Digite novamente a senha"
        name="passwordConfirm"
        password
        control={control}
      />
    </Container>
  );
};
