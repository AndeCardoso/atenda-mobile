import React, { useEffect } from "react";
import { Control, useForm } from "react-hook-form";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";
import { serviceOrderStatusList } from "@pages/signedIn/serviceOrders/constants";
import { IServiceForm } from "../schema";
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

interface IServiceOrderFormProps {
  control: Control<IServiceForm>;
  showAddress: boolean;
  addressList: IAddressModel[];
  handleSaveNewAddress: (values: IAddressModel) => void;
  handleShowAddressToggle: () => void;
}

export const ServiceForm = ({
  handleShowAddressToggle,
  handleSaveNewAddress,
  addressList,
  showAddress,
  control,
}: IServiceOrderFormProps) => {
  const {
    handleSubmit,
    control: addressControl,
    getValues: addressGetValues,
    setValue: addressSetValue,
    watch,
    reset,
  } = useForm<IAddressForm>({
    resolver: yupResolver(addressSchema),
  });

  const stateField = watch("state");

  useEffect(() => {
    addressSetValue("city", {} as IOption);
  }, [stateField]);

  useEffect(() => {
    reset();
  }, [showAddress]);

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
      <Row space="space-between">
        <Text color="WHITE" weight="700">
          Endereço
        </Text>
        <Button mode="text" onPress={handleShowAddressToggle}>
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
          <Button onPress={handleSubmit(handleSaveNewAddress)}>
            Salvar novo endereço
          </Button>
        </>
      ) : (
        <ControlledRadioGroup
          name="addressId"
          control={control}
          itemList={addressList}
        />
      )}
    </Container>
  );
};
