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

export const AddressAccordion = ({ data }: IAddressAccordionProps) => {
  return (
    <Accordion title={data?.nickname || ""}>
      <Content>
        <Row>
          <DisplayField text="Logradouro" value={data?.street} />
        </Row>
        <Divider />
        <Row>
          <DisplayField text="Cep" value={formatCep(data?.cep)} />
          <DisplayField text="Número" value={data?.number} />
        </Row>
        <Divider />
        <Row>
          <DisplayField text="Bairro" value={data?.district} />
          <DisplayField text="Complemento" value={data?.complement} />
        </Row>
        <Divider />
        <Row>
          <DisplayField text="Cidade" value={data?.city} />
          <DisplayField text="Estado" value={data?.state} />
        </Row>
        <Spacer spaceVertical={8} />
      </Content>
    </Accordion>
  );
};
