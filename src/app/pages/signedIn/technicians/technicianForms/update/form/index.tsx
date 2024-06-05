import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control, UseFormGetValues } from "react-hook-form";
import { AddressForm } from "@components/forms/AddressForm";
import { Spacer } from "@components/base/Spacer";
import { Masks } from "react-native-mask-input";
import { ITechnicianForm } from "../../schema";
import {
  technicianPositionList,
  technicianStatusList,
} from "@pages/signedIn/technicians/constants";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";

interface ITechnicianFormProps {
  getValues: UseFormGetValues<ITechnicianForm>;
  control: Control<ITechnicianForm>;
}

export const UpdateTechnicianForm = ({
  getValues,
  control,
}: ITechnicianFormProps) => {
  return (
    <Container>
      <ControlledInput
        label="Nome*"
        placeholder="Ex.: João Paulo"
        name="name"
        control={control}
      />
      <ControlledInput
        label="Cpf*"
        placeholder="Ex.: 999.999.999-99"
        name="cpf"
        disabled
        control={control}
        mask={Masks.BRL_CPF}
        keyboardTypes="number-pad"
      />
      <ControlledInput
        label="Celular*"
        placeholder="Ex.: (00) 99999-9999"
        name="phone"
        control={control}
        mask={Masks.BRL_PHONE}
        keyboardTypes="number-pad"
      />
      <ControlledSelect
        label="Cargo*"
        placeholder="Selecione o cargo"
        options={technicianPositionList}
        name="position"
        control={control}
      />
      <ControlledSelect
        label="Status"
        placeholder="Selecione o status"
        options={technicianStatusList}
        name="status"
        control={control}
      />
      <Spacer />
      <AddressForm control={control} getValues={getValues} />
    </Container>
  );
};
