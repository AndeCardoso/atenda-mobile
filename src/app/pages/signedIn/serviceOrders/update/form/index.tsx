import React from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control } from "react-hook-form";
import { IServiceForm } from "../../schema";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";
import { serviceOrderStatusList } from "../../constants";
import { equipmentVoltageList } from "@pages/signedIn/equipments/constants";
import { ControlledDateTimePicker } from "@components/controlleds/ControlledDateTimePicker";
import { Masks } from "react-native-mask-input";

interface IServiceOrderFormProps {
  control: Control<IServiceForm>;
}

export const UpdateServiceOrderForm = ({ control }: IServiceOrderFormProps) => {
  return (
    <Container>
      <ControlledDateTimePicker
        name="openedAt"
        label="Abertura"
        placeholder="Ex.: 10/10/2024 12:00"
        control={control}
        widthType="half"
        disabled
        required
      />
      <ControlledSelect
        label="Status"
        placeholder="Selecione o status"
        options={serviceOrderStatusList}
        name="status"
        control={control}
      />
      <ControlledSelect
        label="Voltagem selecionada"
        placeholder="Selecione a voltagem"
        options={equipmentVoltageList}
        name="selectedVoltage"
        control={control}
        disabled
      />
      <ControlledInput
        label="Defeitos informados"
        placeholder="Informe os defeitos reportados pelo cliente"
        name="reportedDefect"
        control={control}
        longText
        disabled
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
        disabled
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
      <ControlledDateTimePicker
        name="closedAt"
        label="Conclusão"
        placeholder="Ex.: 10/10/2024 14:00"
        control={control}
        widthType="half"
      />
      <ControlledInput
        label="Custo total"
        placeholder="Ex.: R$80,00"
        name="totalValue"
        control={control}
        mask={Masks.BRL_CURRENCY}
        widthType="half"
        keyboardTypes="number-pad"
      />
    </Container>
  );
};
