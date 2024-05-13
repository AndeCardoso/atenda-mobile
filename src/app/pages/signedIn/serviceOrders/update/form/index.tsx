import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control } from "react-hook-form";
import { IServiceForm } from "../../schema";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";
import { serviceOrderStatusList } from "../../constants";
import { equipmentVoltageList } from "@pages/signedIn/equipments/constants";

interface IServiceOrderFormProps {
  control: Control<IServiceForm>;
}

export const UpdateServiceOrderForm = ({ control }: IServiceOrderFormProps) => {
  return (
    <Container>
      <ControlledSelect
        label="Voltagem selecionada"
        placeholder="Selecione a voltagem"
        options={equipmentVoltageList}
        name="selectedVoltage"
        control={control}
      />
      <ControlledInput
        label="Defeitos informados"
        placeholder="Informe os defeitos reportados pelo cliente"
        name="reportedDefect"
        control={control}
        longText
      />
      <ControlledInput
        label="Defeitos encontrados"
        placeholder="Informe os defeitos encontrados pelo técnico"
        name="foundDefect"
        control={control}
        longText
      />
      <ControlledInput
        label="Serviços requisitados"
        placeholder="Informe os serviços requisitados pelo cliente"
        name="orderedServices"
        control={control}
        longText
      />
      <ControlledInput
        label="Serviços realizados"
        placeholder="Informe os serviços realizados"
        name="executedServices"
        control={control}
        longText
      />
      <ControlledInput
        label="Observações"
        placeholder="Informe quaisquer observações sobre os serviços"
        name="observations"
        control={control}
        longText
      />
      <ControlledSelect
        label="Status"
        placeholder="Selecione o status"
        options={serviceOrderStatusList}
        name="status"
        control={control}
      />
    </Container>
  );
};
