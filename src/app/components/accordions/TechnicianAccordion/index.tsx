import React from "react";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { Accordion } from "@components/base/Accordion";
import { Spacer } from "@components/base/Spacer";
import { Content } from "./styles";
import { formatCellphoneNumber, formatCpf } from "@utils/formatString";
import { ITechnicianModel } from "@model/entities/technician";
import {
  technicianPositionDisplay,
  technicianStatusDisplay,
} from "@pages/signedIn/technicians/constants";
import { Row } from "@components/base/Row";

interface ITechnicianAccordionProps {
  data: Partial<ITechnicianModel>;
}

export const TechnicianAccordion = ({
  data: { name, phone, position, cpf, status },
}: ITechnicianAccordionProps) => {
  return (
    <Accordion title={name || ""}>
      <Content>
        <Row>
          <DisplayField
            text="Status"
            value={technicianStatusDisplay[status!!]}
          />
          <DisplayField
            text="Cargo"
            value={technicianPositionDisplay[position!!]}
          />
        </Row>
        <Divider />
        <DisplayField text="Documento" value={formatCpf(cpf)} hasCopy />
        <Divider />
        <DisplayField
          text="Celular"
          value={formatCellphoneNumber(phone)}
          hasCall
        />
        <Divider />

        <Spacer spaceVertical={8} />
      </Content>
    </Accordion>
  );
};
