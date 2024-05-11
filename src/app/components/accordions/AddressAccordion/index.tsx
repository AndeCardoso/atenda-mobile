import React from "react";
import { Row } from "@components/base/Row";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { formatCep } from "@utils/formatString";
import { useTheme } from "styled-components";
import { IAddressModel } from "@model/entities/address";
import { Accordion } from "@components/base/Accordion";
import { Spacer } from "@components/base/Spacer";
import { Content } from "./styles";
import { IAddressForm } from "@components/forms/AddressForm/formSchema";

interface IAddressAccordionProps {
  data: IAddressModel;
}

export const AddressAccordion = ({
  data: { nickname, cep, city, complement, district, number, state, street },
}: IAddressAccordionProps) => {
  const { colors } = useTheme();
  return (
    <Accordion title={nickname || ""}>
      <Content>
        <DisplayField text="Logradouro" value={street} />
        <Divider />
        <Row>
          <DisplayField text="Numero" value={number} />
          {complement ? (
            <DisplayField text="Complemento" value={complement} />
          ) : null}
        </Row>
        <Divider />
        <Row>
          <DisplayField text="Bairro" value={district} />
          <DisplayField text="Cep" value={formatCep(cep)} />
        </Row>
        <Divider />
        <Row>
          <DisplayField text="Cidade" value={city} />
          <DisplayField text="Estado" value={state} />
        </Row>
        <Spacer spaceVertical={32} />
      </Content>
    </Accordion>
  );
};
