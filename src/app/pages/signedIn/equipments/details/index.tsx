import React from "react";
import { Layout } from "@components/Layout";
import { useEquipmentDetailController } from "./useEquipmentDetailController";
import { Text } from "@components/base/Text";
import { equipmentStatusDisplay } from "../constants";
import { DisplayField } from "@components/base/DisplayField";
import { Container } from "./styles";
import { Row } from "@components/base/Row";
import { Spacer } from "@components/base/Spacer";
import { Icon } from "@components/base/Icon";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";
import { Chip } from "@components/base/Chip";
import { Divider } from "@components/base/Separator";
import { FabGroup } from "@components/base/FAB";
import { LoaderBox } from "@components/base/Loader/styles";

export const EquipmentDetailPage = () => {
  const isFocused = useIsFocused();

  const {
    equipmentData,
    handleGoBack,
    fabActions,
    viewState: { loading },
  } = useEquipmentDetailController();

  return (
    <Layout header="Detalhes do equipamento" goBack={handleGoBack} hasScroll>
      {loading ? (
        <LoaderBox>
          <Loader size={64} />
        </LoaderBox>
      ) : (
        <>
          <Container>
            <Spacer />
            <Row space="space-between">
              <Row widthType="half">
                <Icon name="laptop" color="WHITE" />
                <Text color="WHITE" size={24} weight="600">
                  {equipmentData?.nickname}
                </Text>
              </Row>
              {equipmentData?.status ? (
                <Chip
                  text={equipmentStatusDisplay[equipmentData?.status]}
                  color="PRIMARY"
                  textColor="SECONDARY"
                />
              ) : null}
            </Row>
            <Divider />
            <Row>
              <DisplayField text="Marca" value={equipmentData?.brand} />
              <DisplayField text="Modelo" value={equipmentData?.model} />
            </Row>
            <Divider />
            <DisplayField
              text="Nº de série"
              value={equipmentData?.serialNumber}
            />
            <Divider />
            <Row>
              <DisplayField text="Voltagem" value={equipmentData?.voltage} />
              <DisplayField text="Cor" value={equipmentData?.color} />
            </Row>
            <Divider />
            <DisplayField
              text="Acessórios"
              value={equipmentData?.accessories}
            />
            <Divider />
            <DisplayField text="Descrição" value={equipmentData?.description} />
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
