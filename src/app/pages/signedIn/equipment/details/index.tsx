import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FAB, Portal } from "react-native-paper";
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

export const EquipmentDetailPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    equipmentData,
    handleGoBack,
    fabActions,
    viewState: { loading },
  } = useEquipmentDetailController();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <Layout header="Detalhes do equipamento" goBack={handleGoBack} hasScroll>
      {loading ? (
        <Loader />
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
