import React from "react";
import { Container } from "./styles";
import { useServiceOrderDetailController } from "./useServiceOrderDetailController";
import { useIsFocused } from "@react-navigation/native";
import { DisplayField } from "@components/base/DisplayField";
import { Divider } from "@components/base/Separator";
import { Spacer } from "@components/base/Spacer";
import { FabGroup } from "@components/base/FAB";
import { Loader } from "@components/base/Loader";
import { Chip } from "@components/base/Chip";
import { Text } from "@components/base/Text";
import { Layout } from "@components/Layout";
import { Row } from "@components/base/Row";
import { serviceOrderStatusDisplay } from "../constants";
import { AddressAccordion } from "@components/accordions/AddressAccordion";
import { EquipmentAccordion } from "@components/accordions/EquipmentAccordion";
import { Dimensions, Image } from "react-native";
import { convertDateTimeToString } from "@utils/createDateTime";
import { convertNumberToCurrency } from "@utils/convertCurrency";
import { LoaderBox } from "@components/base/Loader/styles";

const width = Dimensions.get("window").width;

export const ServiceOrderDetailPage = () => {
  const isFocused = useIsFocused();

  const {
    serviceOrderData,
    handleGoToTechnicianDetail,
    handleGoToCustomerDetail,
    handleGoBack,
    fabActions,
    viewState: { loading },
  } = useServiceOrderDetailController();

  return (
    <Layout header="Detalhes da O.S." goBack={handleGoBack} hasScroll>
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <>
          <Container>
            <Spacer />
            <Row space="space-between">
              <Row widthType="auto">
                <Text color="WHITE" size={24} weight="700">
                  Nº:
                </Text>
                <Text color="WHITE" size={24} weight="600">
                  {serviceOrderData?.id}
                </Text>
              </Row>
              <Chip
                text={serviceOrderStatusDisplay[serviceOrderData?.status!!]}
                textSize={16}
                textColor="SECONDARY"
                color="PRIMARY"
              />
            </Row>
            <Spacer />
            <Divider />
            <Row>
              <DisplayField
                text="Data de entrada"
                value={convertDateTimeToString(serviceOrderData?.opened_at!!)}
              />
              <DisplayField
                text="Data de conclusão"
                value={convertDateTimeToString(serviceOrderData?.closed_at!!)}
              />
            </Row>
            <Divider />
            <DisplayField
              text="Cliente"
              value={serviceOrderData?.customer.name}
              goToButton={() =>
                handleGoToCustomerDetail(
                  serviceOrderData?.customer.id!! as number
                )
              }
            />
            <Divider />
            <Text color="WHITE_TEXT" size={14}>
              Equipamento:
            </Text>
            <EquipmentAccordion data={serviceOrderData?.equipment!!} />
            <Divider />
            <DisplayField
              text="Voltagem selecionada"
              value={serviceOrderData?.selectedVoltage}
            />
            <Divider />
            <DisplayField
              text="Defeitos informados"
              value={serviceOrderData?.reportedDefect}
            />
            <Divider />
            <DisplayField
              text="Defeitos encontrados"
              value={serviceOrderData?.foundDefect}
            />
            <Divider />
            <DisplayField
              text="Serviços requisitados"
              value={serviceOrderData?.orderedServices}
            />
            <Divider />
            <DisplayField
              text="Serviços realizados"
              value={serviceOrderData?.executedServices}
            />
            <Divider />
            <DisplayField
              text="Observações"
              value={serviceOrderData?.observations}
            />
            <Divider />
            <Text color="WHITE_TEXT" size={14}>
              Endereço:
            </Text>
            <AddressAccordion data={serviceOrderData?.address!!} />
            <Divider />
            <DisplayField
              text="Técnico responsável"
              value={serviceOrderData?.technician.name}
              goToButton={() =>
                handleGoToTechnicianDetail(
                  serviceOrderData?.technician.id!! as number
                )
              }
            />
            <Divider />
            <DisplayField
              text="Valor total"
              value={convertNumberToCurrency(serviceOrderData?.totalValue)}
            />
            <Divider />
            <Text color="WHITE_TEXT" size={14}>
              Assinatura:
            </Text>
            <Image
              source={{
                uri: `${serviceOrderData?.signatureUrl}`,
              }}
              alt="Assinatura do cliente"
              resizeMode="contain"
              resizeMethod="scale"
              style={{
                transform: [{ rotate: "90deg" }],
                alignSelf: "center",
                marginTop: -74,
              }}
              width={265}
              height={width - 32}
            />
          </Container>
          <FabGroup
            isFocused={isFocused}
            fabActions={fabActions}
            openedIcon="file-document-multiple"
            closedIcon="file-document"
          />
        </>
      )}
    </Layout>
  );
};
