import React from "react";
import { Control } from "react-hook-form";
import { Container } from "./styles";
import { ControlledInput } from "@components/controlleds/ControlledInput";
import { Row } from "@components/base/Row";
import { Text } from "@components/base/Text";
import { Divider } from "@components/base/Separator";
import { Masks } from "react-native-mask-input";

interface IAddressForm {
  control: Control<any, any>;
  hasNickname?: boolean;
}

export const AddressForm = ({ control, hasNickname }: IAddressForm) => {
  return (
    <Container>
      <Divider spaceVertical={16} />
      <Text size={16} color="WHITE">
        Endereço
      </Text>
      <Divider spaceVertical={16} />
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
      <ControlledInput
        label="Estado"
        placeholder="Ex.: São Paulo"
        name="state"
        control={control}
      />
      <ControlledInput
        label="Cidade"
        placeholder="Ex.: Campinas"
        name="city"
        control={control}
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
        />
      </Row>
    </Container>
  );
};
