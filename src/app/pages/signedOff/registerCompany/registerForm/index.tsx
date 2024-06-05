import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control } from "react-hook-form";
import { IRegisterCompanyForm } from "./formSchema";
import { BaloonCard } from "@components/base/BaloonCard";
import { Text } from "@components/base/Text";
import { Masks } from "react-native-mask-input";

interface IRegisterCompanyFormProps {
  control: Control<IRegisterCompanyForm>;
}

export const RegisterCompanyForm = ({ control }: IRegisterCompanyFormProps) => {
  return (
    <Container>
      <ControlledInput
        label="Nome da empresa"
        placeholder="Digite o nome da empresa"
        name="companyName"
        control={control}
      />
      <ControlledInput
        label="Documento da empresa*"
        placeholder="Digite o documento da empresa"
        name="companyDocument"
        mask={Masks.BRL_CPF_CNPJ}
        control={control}
      />
      <ControlledInput
        label="Nome*"
        placeholder="Digite o nome"
        name="name"
        control={control}
      />
      <ControlledInput
        label="E-mail*"
        placeholder="Digite o e-mail"
        name="email"
        control={control}
      />
      <ControlledInput
        label="Senha*"
        placeholder="Digite a senha"
        name="password"
        password
        control={control}
      />
      <ControlledInput
        label="Confirmar senha*"
        placeholder="Digite novamente a senha"
        name="passwordConfirm"
        password
        control={control}
      />
      <BaloonCard color="PRIMARY">
        <Text color="SECONDARY">
          {`A empresa cradastrada terá uma licença gratuita com o prazo de 15 dias para uso, após esse periodo a conta terá o acesso interrompido.\n\nAo completar 30 dias após o vencimento da licença gratuita, os dados salvos durante periodo de teste serão descartados.`}
        </Text>
      </BaloonCard>
    </Container>
  );
};
