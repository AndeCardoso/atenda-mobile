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

export const CustomerAccordion = ({ data }: ICustomerAccordionProps) => {
  return (
    <Accordion title={data?.name || ""}>
      <Content>
        <DisplayField
          text="Status"
          value={customerStatusDisplay[data?.status!!]}
        />
        <Divider />
        <DisplayField
          text="Documento"
          value={formatCpf(data?.document)}
          hasCopy
        />
        <Divider />
        <DisplayField
          text="Celular"
          value={formatCellphoneNumber(data?.phone)}
          hasCall
        />
        <Divider />
        {data?.secondPhone ? (
          <>
            <DisplayField
              text="Celular secundário"
              value={formatCellphoneNumber(data?.secondPhone)}
              hasCall
            />
            <Divider />
          </>
        ) : null}
        <DisplayField text="E-mail" value={data?.email} hasCopy />
        <Spacer spaceVertical={8} />
      </Content>
    </Accordion>
  );
};
