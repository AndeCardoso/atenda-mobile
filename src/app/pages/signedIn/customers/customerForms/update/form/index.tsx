import React, { Fragment, useEffect, useRef, useState } from "react";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Control, UseFormSetValue, useForm } from "react-hook-form";
import { AddressForm } from "@components/forms/AddressForm";
import { Spacer } from "@components/base/Spacer";
import { Masks } from "react-native-mask-input";
import { ICustomerForm } from "../../schema";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";
import { Button } from "@components/base/Button";
import { Divider } from "@components/base/Separator";
import { Text } from "@components/base/Text";
import { Card } from "@components/base/Card";
import { Row } from "@components/base/Row";
import { IconButton } from "@components/base/IconButton";
import {
  IAddressForm,
  addressSchema,
} from "@components/forms/AddressForm/formSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { IOption } from "@components/base/Select";
import { customerStatusList } from "@pages/signedIn/customers/constants";
import { SuperConsole } from "@tools/indentedConsole";

interface ICustomerFormProps {
  addressList?: IAddressForm[];
  setValueProp: UseFormSetValue<ICustomerForm>;
  controlProp: Control<ICustomerForm>;
}

export const UpdateCustomerForm = ({
  addressList,
  controlProp,
  setValueProp,
}: ICustomerFormProps) => {
  const [idToEdit, setIdToEdit] = useState<number | undefined>();
  const stateRef = useRef<IOption | string>({} as IOption);
  const [addressListState, setAddressListState] = useState<IAddressForm[]>(
    addressList ?? []
  );

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
    if (addressList) {
      setValueProp("addresses", [...addressList]);
    }
  }, []);

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
      setAddressListState((prevState) => {
        const newAddressListState = [...prevState];
        newAddressListState[idToEdit] = {
          ...newAddressListState[idToEdit],
          ...value,
        };
        return newAddressListState;
      });
      setIdToEdit(undefined);
      resetForm();
    }
  };

  return (
    <Container>
      <ControlledInput
        label="Nome"
        placeholder="Ex.: João Paulo"
        name="name"
        control={controlProp}
      />
      <ControlledInput
        label="Documento"
        placeholder="Ex.: 999.999.999-99"
        name="document"
        control={controlProp}
        mask={Masks.BRL_CPF_CNPJ}
      />
      <ControlledInput
        label="Celular"
        placeholder="Ex.: (00) 99999-9999"
        name="phone"
        control={controlProp}
        mask={Masks.BRL_PHONE}
      />
      <ControlledInput
        label="Celular Aux."
        placeholder="Ex.: (00) 99999-9999"
        name="secondPhone"
        control={controlProp}
        mask={Masks.BRL_PHONE}
      />
      <ControlledInput
        label="E-mail"
        placeholder="Ex.: usuario@provedor.com"
        name="email"
        control={controlProp}
      />
      <ControlledSelect
        label="Status"
        placeholder="Selecione o status"
        options={customerStatusList}
        name="status"
        control={controlProp}
      />
      {addressListState && addressListState.length > 0 ? (
        <>
          <Divider spaceVertical={16} />
          <Text size={18} weight="600" color="WHITE">
            Lista de endereços
          </Text>
          <Divider spaceVertical={16} />
          <Spacer />
          {addressListState.map((address, index) => (
            <Fragment key={`${address.nickname}-${index}`}>
              <Card>
                <Row space="space-between">
                  <Text color="BLACK" size={16} weight="600">
                    {address.nickname}
                  </Text>
                  <Row widthType="auto" gap={4}>
                    <IconButton
                      name="file-edit"
                      onPress={() => handleEditAddressByIndex(index)}
                    />
                    {idToEdit !== index ? (
                      <>
                        <Text size={18}>|</Text>
                        <IconButton
                          name="close-box"
                          onPress={() => handleDecreaseAddressByIndex(index)}
                        />
                      </>
                    ) : null}
                  </Row>
                </Row>
              </Card>
              <Spacer spaceVertical={8} />
            </Fragment>
          ))}
        </>
      ) : null}
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
    </Container>
  );
};
