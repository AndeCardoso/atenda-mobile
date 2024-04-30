import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FAB, Portal } from "react-native-paper";
import { useCustomerDetailController } from "./useCustomerDetailController";
import { Text } from "@components/base/Text";
import {
  formatCellphoneNumber,
  formatCep,
  formatCpf,
} from "@utils/formatString";
import { DisplayField } from "@components/base/DisplayField";
import { AddressContent, Container } from "./styles";
import { Row } from "@components/base/Row";
import { Spacer } from "@components/base/Spacer";
import { Icon } from "@components/base/Icon";
import { Divider } from "@components/base/Separator";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { customerStatusDisplay } from "../constants";
import { Accordion } from "@components/base/Accordion";
import { Chip } from "@components/base/Chip";
import { View } from "react-native";

export const CustomerDetailPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    customerData,
    handleGoBack,
    fabActions,
    viewState: { loading },
  } = useCustomerDetailController();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

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
              value={formatCpf(customerData?.document)}
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
              <Accordion
                title={address?.nickname || ""}
                key={`${address?.nickname}-${index}`}
              >
                <AddressContent>
                  <DisplayField text="Logradouro" value={address?.street} />
                  <Divider />
                  <Row>
                    <DisplayField text="Numero" value={address?.number} />
                    {address?.complement ? (
                      <DisplayField
                        text="Complemento"
                        value={address?.complement}
                      />
                    ) : null}
                  </Row>
                  <Divider />
                  <Row>
                    <DisplayField text="Bairro" value={address?.district} />
                    <DisplayField text="Cep" value={formatCep(address?.cep)} />
                  </Row>
                  <Divider />
                  <Row>
                    <DisplayField
                      text="Cidade"
                      value={address?.city.toString()}
                    />
                    <DisplayField
                      text="Estado"
                      value={address?.state.toString()}
                    />
                  </Row>
                  <Spacer spaceVertical={32} />
                </AddressContent>
              </Accordion>
            ))}
          </Container>

          <Portal>
            <FAB.Group
              open={open}
              visible={isFocused}
              icon={open ? "file-document-multiple" : "file-document"}
              actions={fabActions}
              fabStyle={{
                borderRadius: 50,
                backgroundColor: colors.PRIMARY,
                marginRight: 32,
              }}
              color={colors.SECONDARY}
              onStateChange={onStateChange}
            />
          </Portal>
        </>
      )}
    </Layout>
  );
};
