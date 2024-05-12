import React from "react";
import { Row } from "@components/base/Row";
import { Divider } from "@components/base/Separator";
import { DisplayField } from "@components/base/DisplayField";
import { Accordion } from "@components/base/Accordion";
import { Spacer } from "@components/base/Spacer";
import { Content } from "./styles";
import { ICustomerModel } from "@model/entities/customer";
import { formatCellphoneNumber, formatCpf } from "@utils/formatString";
import { customerStatusDisplay } from "@pages/signedIn/customers/constants";

interface ICustomerAccordionProps {
  data: Partial<ICustomerModel>;
}

export const CustomerAccordion = ({
  data: { name, document, email, phone, status, secondPhone },
}: ICustomerAccordionProps) => {
  return (
    <Accordion title={name || ""}>
      <Content>
        <DisplayField text="Status" value={customerStatusDisplay[status!!]} />
        <Divider />
        <DisplayField text="Documento" value={formatCpf(document)} hasCopy />
        <Divider />
        <DisplayField
          text="Celular"
          value={formatCellphoneNumber(phone)}
          hasCall
        />
        <Divider />
        {secondPhone ? (
          <>
            <DisplayField
              text="Celular secundário"
              value={formatCellphoneNumber(secondPhone)}
              hasCall
            />
            <Divider />
          </>
        ) : null}
        <DisplayField text="E-mail" value={email} hasCopy />
        <Spacer spaceVertical={8} />
      </Content>
    </Accordion>
  );
};
