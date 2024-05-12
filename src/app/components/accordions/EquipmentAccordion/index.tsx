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

export const EquipmentAccordion = ({
  data: {
    nickname,
    brand,
    model,
    status,
    accessories,
    color,
    description,
    serialNumber,
    voltage,
  },
}: IEquipmentAccordionProps) => {
  return (
    <Accordion title={nickname || ""}>
      <Content>
        <DisplayField text="Status" value={equipmentStatusDisplay[status]} />
        <Divider />
        <Row>
          <DisplayField text="Marca" value={brand} />
          <DisplayField text="Modelo" value={model} />
        </Row>
        <Divider />
        <DisplayField text="Nº de série" value={serialNumber} />
        <Divider />
        <Row>
          <DisplayField text="Voltagem" value={voltage} />
          <DisplayField text="Cor" value={color} />
        </Row>
        <Divider />
        <DisplayField text="Acessórios" value={accessories} />
        <Divider />
        <DisplayField text="Descrição" value={description} />
        <Spacer spaceVertical={8} />
      </Content>
    </Accordion>
  );
};
