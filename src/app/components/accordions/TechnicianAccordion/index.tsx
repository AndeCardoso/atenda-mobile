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

export const TechnicianAccordion = ({ data }: ITechnicianAccordionProps) => {
  return (
    <Accordion title={data?.name || ""}>
      <Content>
        <Row>
          <DisplayField
            text="Status"
            value={technicianStatusDisplay[data?.status!!]}
          />
          <DisplayField
            text="Cargo"
            value={technicianPositionDisplay[data?.position!!]}
          />
        </Row>
        <Divider />
        <DisplayField text="Documento" value={formatCpf(data?.cpf)} hasCopy />
        <Divider />
        <DisplayField
          text="Celular"
          value={formatCellphoneNumber(data?.phone)}
          hasCall
        />
        <Spacer spaceVertical={8} />
      </Content>
    </Accordion>
  );
};
