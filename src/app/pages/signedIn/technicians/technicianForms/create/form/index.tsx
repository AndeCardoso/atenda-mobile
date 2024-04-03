import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control } from "react-hook-form";
import { AddressForm } from "@components/forms/AddressForm";
import { Text } from "@components/base/Text";
import { Divider } from "@components/base/Separator";
import { Spacer } from "@components/base/Spacer";
import { Masks } from "react-native-mask-input";
import { ITechnicianForm } from "../../schema";

interface ITechnicianFormProps {
  control: Control<ITechnicianForm>;
}

export const RegisterTechnicianForm = ({ control }: ITechnicianFormProps) => {
  return (
    <Container>
      <Divider />
      <Text size={16} color="WHITE">
        Dados de contato
      </Text>
      <Divider />
      <ControlledInput
        label="Nome"
        placeholder="Ex.: João Paulo"
        name="name"
        control={control}
      />
      <ControlledInput
        label="Cpf"
        placeholder="Ex.: 999.999.999-99"
        name="cpf"
        control={control}
        mask={Masks.BRL_CPF}
      />
      <ControlledInput
        label="Celular"
        placeholder="Ex.: (00) 99999-9999"
        name="phone"
        control={control}
        mask={Masks.BRL_PHONE}
      />
      <ControlledInput
        label="Cargo"
        placeholder="Ex.: Campo"
        name="position"
        control={control}
      />
      <ControlledInput
        label="Status"
        placeholder="Ex.: Em atendimento"
        name="status"
        control={control}
      />
      <Spacer />
      <AddressForm control={control} />
    </Container>
  );
};
