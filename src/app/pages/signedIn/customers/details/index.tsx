import React from "react";
import { Layout } from "@components/Layout";
import { useCustomerDetailController } from "./useCustomerDetailController";
import { Text } from "@components/base/Text";
import { formatCellphoneNumber, formatDocument } from "@utils/formatString";
import { DisplayField } from "@components/base/DisplayField";
import { Container } from "./styles";
import { Row } from "@components/base/Row";
import { Spacer } from "@components/base/Spacer";
import { Icon } from "@components/base/Icon";
import { Divider } from "@components/base/Separator";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { customerStatusDisplay } from "../constants";
import { Chip } from "@components/base/Chip";
import { FabGroup } from "@components/base/FAB";
import { AddressAccordion } from "@components/accordions/AddressAccordion";

export const CustomerDetailPage = () => {
  const isFocused = useIsFocused();

  const {
    customerData,
    handleGoBack,
    fabActions,
    viewState: { loading },
  } = useCustomerDetailController();

  return (
    <Layout header="Detalhes do cliente" goBack={handleGoBack} hasScroll>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Spacer />
            <Row space="space-between">
              <Row widthType="half">
                <Icon name="head" color="WHITE" />
                <Text color="WHITE" size={24} weight="600">
                  {customerData?.name}
                </Text>
              </Row>
              {customerData?.status ? (
                <Chip
                  text={customerStatusDisplay[customerData?.status]}
                  color="PRIMARY"
                  textColor="SECONDARY"
                />
              ) : null}
            </Row>
            <Spacer />
            <Divider />
            <DisplayField
              text="Documento"
              value={formatDocument(customerData?.document)}
              hasCopy
            />
            <Divider />
            <DisplayField
              text="Celular"
              value={formatCellphoneNumber(customerData?.phone)}
              hasCall
            />
            <Divider />
            {customerData?.secondPhone ? (
              <>
                <DisplayField
                  text="Celular secundário"
                  value={formatCellphoneNumber(customerData?.secondPhone)}
                  hasCall
                />
                <Divider />
              </>
            ) : null}
            <DisplayField text="E-mail" value={customerData?.email} hasCopy />
            <Divider />
            <Spacer />
            <Text color="WHITE" weight="600" size={20}>
              Endereços:
            </Text>
            <Spacer />
            {customerData?.addresses.map((address, index) => (
              <AddressAccordion
                data={address}
                key={`${address?.nickname}-${index}`}
              />
            ))}
          </Container>
          <FabGroup
            isFocused={isFocused}
            fabActions={fabActions}
            openedIcon="file-document-edit"
            closedIcon="file-document"
          />
        </>
      )}
    </Layout>
  );
};
