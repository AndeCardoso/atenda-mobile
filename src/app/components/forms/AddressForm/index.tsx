import React, { useEffect } from "react";
import { Control, UseFormGetValues } from "react-hook-form";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Row } from "@components/base/Row";
import { Masks } from "react-native-mask-input";
import { useAddressFormController } from "./useAddressFormController";
import { ControlledSelect } from "@components/controlleds/ControlledSelect";
import { AddressHeader } from "./AddressHeader";

interface IAddressForm {
  control: Control<any, any>;
  getValues?: UseFormGetValues<any>;
  hasNoHeader?: boolean;
  hasNickname?: boolean;
}

export const AddressForm = ({
  getValues,
  control,
  hasNoHeader,
  hasNickname,
}: IAddressForm) => {
  const {
    stateList,
    citiesList,
    onSelectState,
    citiesMutateAsync,
    viewState: { citiesLoading },
  } = useAddressFormController();

  useEffect(() => {
    if (getValues && Boolean(getValues().state)) {
      onSelectState(getValues().state);
    }
  }, [getValues, onSelectState]);

  return (
    <Container>
      {!hasNoHeader ? <AddressHeader /> : null}
      {hasNickname ? (
        <ControlledInput
          label="Apelido"
          placeholder="Ex.: Casa centro"
          name="nickname"
          control={control}
        />
      ) : null}
      <ControlledInput
        label="Cep"
        width={160}
        placeholder="Ex.: 99999-999"
        name="cep"
        control={control}
        mask={Masks.ZIP_CODE}
      />
      <ControlledSelect
        options={stateList}
        label="Estado"
        placeholder="Selecione o estado"
        name="state"
        control={control}
        onSelect={onSelectState}
      />
      <ControlledSelect
        options={citiesList}
        label="Cidade"
        placeholder="Selecione a cidade"
        name="city"
        control={control}
        loading={citiesLoading}
        onPress={citiesMutateAsync}
        disabled={getValues && !Boolean(getValues().state)}
      />
      <ControlledInput
        label="Bairro"
        placeholder="Ex.: Centro"
        name="district"
        control={control}
      />
      <ControlledInput
        label="Logradouro"
        placeholder="Ex.: Rua Olmiro Lima"
        name="street"
        control={control}
      />
      <Row gap={16}>
        <ControlledInput
          label="Número"
          width={100}
          placeholder="Ex.: 123"
          name="number"
          control={control}
        />
        <ControlledInput
          label="Complemento"
          placeholder="Ex.: Apto 310 bloco A"
          name="complement"
          control={control}
          fullwidth
        />
      </Row>
    </Container>
  );
};
