import React from "react";
import { Row } from "@components/base/Row";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { IAddressModel } from "@model/entities/address";
import { Accordion } from "@components/base/Accordion";
import { Spacer } from "@components/base/Spacer";
import { formatCep } from "@utils/formatString";
import { Content } from "./styles";

interface IAddressAccordionProps {
  data: IAddressModel;
}

export const AddressAccordion = ({
  data: { nickname, cep, city, complement, district, number, state, street },
}: IAddressAccordionProps) => {
  return (
    <Accordion title={nickname || ""}>
      <Content>
        <Row>
          <DisplayField text="Logradouro" value={street} />
        </Row>
        <Divider />
        <Row>
          <DisplayField text="Cep" value={formatCep(cep)} />
          <DisplayField text="Número" value={number} />
        </Row>
        <Divider />
        <Row>
          <DisplayField text="Bairro" value={district} />
          <DisplayField text="Complemento" value={complement} />
        </Row>
        <Divider />
        <Row>
          <DisplayField text="Cidade" value={city} />
          <DisplayField text="Estado" value={state} />
        </Row>
        <Spacer spaceVertical={8} />
      </Content>
    </Accordion>
  );
};
