import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control, UseFormGetValues } from "react-hook-form";
import { IEquipmentForm } from "../../schema";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";
import {
  equipmentStatusList,
  equipmentVoltageList,
} from "@pages/signedIn/equipments/constants";

interface IEquipmentFormProps {
  getValues: UseFormGetValues<IEquipmentForm>;
  control: Control<IEquipmentForm>;
}

export const RegisterEquipmentForm = ({ control }: IEquipmentFormProps) => {
  return (
    <Container>
      <ControlledInput
        label="Apelido"
        placeholder="Ex.: Notebook pessoal"
        name="nickname"
        control={control}
      />
      <ControlledInput
        label="Marca"
        placeholder="Ex.: Dell"
        name="brand"
        control={control}
      />
      <ControlledInput
        label="Modelo"
        placeholder="Ex.: Vostro 14"
        name="model"
        control={control}
      />
      <ControlledInput
        label="Número de série"
        placeholder="Ex.: 6554F986BR"
        name="serialNumber"
        control={control}
      />
      <ControlledInput
        label="Descrição"
        placeholder="Ex.: Adesivos na tampa"
        name="description"
        control={control}
      />
      <ControlledSelect
        label="Voltagem"
        placeholder="Selecionar voltagem"
        options={equipmentVoltageList}
        name="voltage"
        control={control}
      />
      <ControlledInput
        label="Cor"
        placeholder="Ex.: Cinza"
        name="color"
        control={control}
        widthType="half"
      />
      <ControlledInput
        label="Acessórios"
        placeholder="Ex.: Carregador, mouse sem fio"
        name="accessories"
        control={control}
      />
      <ControlledSelect
        label="Status"
        placeholder="Selecione o status"
        options={equipmentStatusList}
        name="status"
        control={control}
      />
    </Container>
  );
};
