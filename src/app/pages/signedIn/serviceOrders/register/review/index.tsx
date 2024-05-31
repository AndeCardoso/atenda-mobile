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
import { AbandonmentModal } from "../../components/AbandonmentModal";
import { Row } from "@components/base/Row";
import { convertDateTimeToString } from "@utils/createDateTime";

export const ServiceOrderRegisterReviewPage = () => {
  const {
    data,
    handleGoBack,
    onAbandomentModalToggle,
    handleConfirmAbandonment,
    handleGoToCustomerValidation,
    viewState: { abandomentOpenModalState },
  } = useServiceOrderRegisterReview();

  return (
    <Layout
      header="Revisão dos dados"
      close={onAbandomentModalToggle}
      goBack={handleGoBack}
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
        <DisplayField
          text="Serviços requisitados"
          value={data?.serviceForm.orderedServices}
        />
        <Divider />
        <DisplayField
          text="Defeitos encontrados"
          value={data?.serviceForm.foundDefect}
        />
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
        <Row>
          <DisplayField
            text="Abertura"
            value={convertDateTimeToString(data?.serviceForm?.openedAt)}
          />
          <DisplayField
            text="Conclusão"
            value={convertDateTimeToString(data?.serviceForm?.closedAt)}
          />
        </Row>
        <Divider />
        <DisplayField
          text="Valor total"
          value={data?.serviceForm?.totalValue}
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
      <AbandonmentModal
        onConfirm={handleConfirmAbandonment}
        onDismiss={onAbandomentModalToggle}
        open={abandomentOpenModalState}
      />
    </Layout>
  );
};
