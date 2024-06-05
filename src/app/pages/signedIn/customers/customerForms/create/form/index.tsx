import React, { Fragment, useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control, UseFormSetValue, useForm } from "react-hook-form";
import { AddressForm } from "@components/forms/AddressForm";
import { Spacer } from "@components/base/Spacer";
import { Masks } from "react-native-mask-input";
import { ICustomerForm } from "../../schema";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";
import { customerStatusList } from "@pages/signedIn/customers/constants";
import { Button } from "@components/base/Button";
import {
  IAddressForm,
  addressSchema,
} from "@components/forms/AddressForm/formSchema";
import { Text } from "@components/base/Text";
import { Divider } from "@components/base/Separator";
import { yupResolver } from "@hookform/resolvers/yup";
import { IOption } from "@components/base/Select";
import { AddressListItem } from "@pages/signedIn/customers/components/AddressListItem";

interface ICustomerFormProps {
  setValueProp: UseFormSetValue<ICustomerForm>;
  controlProp: Control<ICustomerForm>;
}

export const RegisterCustomerForm = ({
  controlProp,
  setValueProp,
}: ICustomerFormProps) => {
  const stateRef = useRef<IOption | string>({} as IOption);
  const [idToEdit, setIdToEdit] = useState<number | undefined>();
  const [addressListState, setAddressListState] = useState<IAddressForm[]>([]);

  const { control, handleSubmit, getValues, setValue, watch, reset } =
    useForm<IAddressForm>({
      resolver: yupResolver(addressSchema),
    });

  const stateField = watch("state");

  useEffect(() => {
    if (!Boolean(stateField) || stateRef.current.text !== stateField.text) {
      setValue("city", {} as IOption);
    }
  }, [stateField, setValue]);

  useEffect(() => {
    setValueProp("addresses", [...addressListState]);
  }, [addressListState]);

  const resetForm = () => {
    reset({
      nickname: "",
      cep: "",
      street: "",
      number: "",
      complement: "",
      district: "",
      state: {},
      city: {},
    });
  };

  const isEditing = idToEdit !== undefined;

  const handleIncreaseAddressList = (value: IAddressForm) => {
    setAddressListState([...addressListState, value]);
    resetForm();
  };

  const handleDecreaseAddressByIndex = (id: number) => {
    const newAddressList = addressListState.filter((_, index) => index !== id);
    setAddressListState(newAddressList);
  };

  const handleEditAddressByIndex = (id: number) => {
    setIdToEdit(id);
    const addressToUpdate = addressListState.find((_, index) => index === id);
    if (addressToUpdate) {
      stateRef.current = addressToUpdate.state;
      reset(addressToUpdate);
    }
  };

  const handleUpdateAddressList = (value: IAddressForm) => {
    if (isEditing) {
      addressListState[idToEdit] = value;
      setIdToEdit(undefined);
      resetForm();
    }
  };

  return (
    <Container>
      <ControlledInput
        label="Nome*"
        placeholder="Ex.: João Paulo"
        name="name"
        control={controlProp}
      />
      <ControlledInput
        label="Documento*"
        placeholder="Ex.: 999.999.999-99"
        name="document"
        control={controlProp}
        mask={Masks.BRL_CPF_CNPJ}
        keyboardTypes="number-pad"
      />
      <ControlledInput
        label="Celular*"
        placeholder="Ex.: (00) 99999-9999"
        name="phone"
        control={controlProp}
        mask={Masks.BRL_PHONE}
        keyboardTypes="number-pad"
      />
      <ControlledInput
        label="Celular Aux."
        placeholder="Ex.: (00) 99999-9999"
        name="secondPhone"
        control={controlProp}
        mask={Masks.BRL_PHONE}
        keyboardTypes="number-pad"
      />
      <ControlledInput
        label="E-mail*"
        placeholder="Ex.: usuario@provedor.com"
        name="email"
        control={controlProp}
        keyboardTypes="email-address"
      />
      <ControlledSelect
        label="Status"
        placeholder="Selecione o status"
        options={customerStatusList}
        name="status"
        control={controlProp}
      />

      <AddressForm control={control} getValues={getValues} hasNickname />
      <Button
        onPress={handleSubmit(
          isEditing ? handleUpdateAddressList : handleIncreaseAddressList
        )}
      >
        {isEditing ? "Atualizar " : "Adicionar "}
        endereço
      </Button>
      <Spacer spaceVertical={16} />
      {addressListState.length > 0 ? (
        <>
          <Divider spaceVertical={16} />
          <Text size={18} weight="600" color="WHITE">
            Lista de endereços*
          </Text>
          <Divider spaceVertical={16} />
          <Spacer />
          {addressListState.map((address, index) => (
            <Fragment key={`${address.nickname}-${index}`}>
              <AddressListItem
                data={address}
                index={index}
                isEditing={idToEdit !== index}
                handleEditAddressByIndex={handleEditAddressByIndex}
                handleDecreaseAddressByIndex={handleDecreaseAddressByIndex}
              />
              <Spacer spaceVertical={8} />
            </Fragment>
          ))}
        </>
      ) : null}
    </Container>
  );
};
