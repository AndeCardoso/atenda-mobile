import React, { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";
import { serviceOrderStatusList } from "@pages/signedIn/serviceOrders/constants";
import { IServiceForm } from "../../../schema";
import { Container } from "./styles";
import { IAddressModel } from "@model/entities/address";
import { Text } from "@components/base/Text";
import { Row } from "@components/base/Row";
import { Button } from "@components/base/Button";
import { AddressForm } from "@components/forms/AddressForm";
import { Spacer } from "@components/base/Spacer";
import {
  IAddressForm,
  addressSchema,
} from "@components/forms/AddressForm/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IOption } from "@components/base/Select";
import { ControlledRadioGroup } from "@components/controlleds/ControlledRadioGroup";
import { equipmentVoltageList } from "@pages/signedIn/equipments/constants";
import { HelperText } from "react-native-paper";
import { ControlledDateTimePicker } from "@components/controlleds/ControlledDateTimePicker";
import { Masks } from "react-native-mask-input";

interface IServiceOrderFormProps {
  control: Control<IServiceForm>;
  showAddress: boolean;
  newAddressError: boolean;
  addressList: IAddressModel[] | IAddressForm[];
  handleSaveNewAddress: (values: IAddressForm) => void;
  handleShowAddressToggle: () => void;
}

export const ServiceForm = ({
  handleShowAddressToggle,
  handleSaveNewAddress,
  newAddressError,
  addressList,
  showAddress,
  control,
}: IServiceOrderFormProps) => {
  const {
    handleSubmit,
    control: addressControl,
    getValues: addressGetValues,
    setValue: addressSetValue,
    watch: addressWatch,
    reset,
  } = useForm<IAddressForm>({
    resolver: yupResolver(addressSchema),
  });

  const stateField = addressWatch("state");

  useEffect(() => {
    addressSetValue("city", {} as IOption);
  }, [stateField]);

  useEffect(() => {
    reset();
  }, [showAddress]);

  return (
    <Container>
      <ControlledSelect
        label="Voltagem selecionada*"
        placeholder="Selecione a voltagem"
        options={equipmentVoltageList}
        name="selectedVoltage"
        control={control}
      />
      <ControlledInput
        label="Defeitos informados*"
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
        label="Serviços requisitados*"
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
        label="Status*"
        placeholder="Selecione o status"
        options={serviceOrderStatusList}
        name="status"
        control={control}
      />
      <Row space="space-between">
        <Text color="WHITE" weight="700">
          Endereço*
        </Text>
        <Button
          mode="text"
          onPress={handleShowAddressToggle}
          style={{ backgroundColor: "transparent" }}
        >
          {!showAddress ? "Adicionar novo" : "Selecionar existente"}
        </Button>
      </Row>
      {showAddress ? (
        <>
          <Spacer spaceVertical={16} />
          <AddressForm
            control={addressControl}
            getValues={addressGetValues}
            hasNickname
            hasNoHeader
          />
          <Button mode="outlined" onPress={handleSubmit(handleSaveNewAddress)}>
            Usar novo endereço
          </Button>
          <HelperText type="error" visible={newAddressError}>
            Adicione o novo endereço a lista e o selecione para avançar
          </HelperText>
        </>
      ) : (
        <ControlledRadioGroup
          name="address"
          control={control}
          itemList={addressList}
        />
      )}
      <ControlledDateTimePicker
        name="openedAt"
        label="Abertura*"
        placeholder="Ex.: 10/10/2024 12:00"
        control={control}
        widthType="half"
        required
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
