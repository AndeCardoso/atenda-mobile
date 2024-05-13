import React from "react";
import { Layout } from "@components/Layout";
import { Container, WrapperButtons } from "./styles";
import { EquipmentAccordion } from "@components/accordions/EquipmentAccordion";
import { useServiceOrderRegisterReview } from "./useServiceOrderRegisterReview";
import { TechnicianAccordion } from "@components/accordions/TechnicianAccordion";
import { CustomerAccordion } from "@components/accordions/CustomerAccordion";
import { AddressAccordion } from "@components/accordions/AddressAccordion";
import { DisplayField } from "@components/base/DisplayField";
import { Divider } from "@components/base/Separator";
import { Button } from "@components/base/Button";
import { Text } from "@components/base/Text";

export const ServiceOrderRegisterReviewPage = () => {
  const { data, handleAbbandon, handleGoToCustomerValidation } =
    useServiceOrderRegisterReview();

  return (
    <Layout
      header="Revisão dos dados"
      close={handleAbbandon}
      hasScroll
      footer={
        <WrapperButtons>
          <Button onPress={handleGoToCustomerValidation} mode="contained">
            Validar pelo cliente
          </Button>
        </WrapperButtons>
      }
    >
      <Container>
        <Text color="WHITE_TEXT" size={14}>
          Cliente:
        </Text>
        <CustomerAccordion data={data?.customer!!} />
        <Divider />
        <Text color="WHITE_TEXT" size={14}>
          Equipamento:
        </Text>
        <EquipmentAccordion data={data?.equipment!!} />
        <Divider />
        <DisplayField
          text="Voltagem selecionada"
          value={data?.serviceForm.selectedVoltage.text}
        />
        <Divider />
        <DisplayField
          text="Defeitos informados"
          value={data?.serviceForm.reportedDefect}
        />
        <Divider />
        <DisplayField
          text="Defeitos encontrados"
          value={data?.serviceForm.foundDefect}
        />
        <Divider />
        <DisplayField
          text="Serviços requisitados"
          value={data?.serviceForm.orderedServices}
        />
        <Divider />
        <DisplayField
          text="Serviços realizados"
          value={data?.serviceForm.executedServices}
        />
        <Divider />
        <DisplayField
          text="Observações"
          value={data?.serviceForm.observations}
        />
        <Divider />
        <Text color="WHITE_TEXT" size={14}>
          Endereço:
        </Text>
        <AddressAccordion data={data?.address!!} />
        <Divider />
        <Text color="WHITE_TEXT" size={14}>
          Técnico:
        </Text>
        <TechnicianAccordion data={data?.technician!!} />
      </Container>
    </Layout>
  );
};