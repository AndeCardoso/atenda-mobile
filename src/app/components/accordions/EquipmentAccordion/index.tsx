import React from "react";
import { Row } from "@components/base/Row";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { Accordion } from "@components/base/Accordion";
import { Spacer } from "@components/base/Spacer";
import { Content } from "./styles";
import { IEquipmentModel } from "@model/entities/equipment";
import { equipmentStatusDisplay } from "@pages/signedIn/equipments/constants";

interface IEquipmentAccordionProps {
  data: IEquipmentModel;
}

export const EquipmentAccordion = ({ data }: IEquipmentAccordionProps) => {
  return (
    <Accordion title={data?.nickname || data?.model}>
      <Content>
        <DisplayField
          text="Status"
          value={equipmentStatusDisplay[data?.status]}
        />
        <Divider />
        <Row>
          <DisplayField text="Marca" value={data?.brand} />
          <DisplayField text="Modelo" value={data?.model} />
        </Row>
        <Divider />
        <DisplayField text="Nº de série" value={data?.serialNumber} />
        <Divider />
        <Row>
          <DisplayField text="Voltagem" value={data?.voltage} />
          <DisplayField text="Cor" value={data?.color} />
        </Row>
        <Divider />
        <DisplayField text="Acessórios" value={data?.accessories} />
        <Divider />
        <DisplayField text="Descrição" value={data?.description} />
        <Spacer spaceVertical={8} />
      </Content>
    </Accordion>
  );
};
