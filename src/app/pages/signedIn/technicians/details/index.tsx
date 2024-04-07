import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { useTheme } from "styled-components";
import { FAB, Portal } from "react-native-paper";
import { useTechnicianDetailController } from "./useTechnicianDetailController";
import { Text } from "@components/base/Text";
import {
  technicianPositionDisplay,
  technicianStatusDisplay,
} from "../constants";
import {
  formatCellphoneNumber,
  formatCep,
  formatCpf,
} from "@utils/formatString";
import { DisplayField } from "@components/base/DisplayField";
import { Container } from "./styles";
import { Row } from "@components/base/Row";
import { Spacer } from "@components/base/Spacer";
import { Icon } from "@components/base/Icon";
import { Divider } from "@components/base/Separator";
import { Loader } from "@components/base/Loader";
import { useIsFocused } from "@react-navigation/native";

export const TechnicianDetailPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    technicianData,
    handleGoBack,
    fabActions,
    viewState: { loading },
  } = useTechnicianDetailController();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <Layout header="Detalhes do técnico" goBack={handleGoBack} hasScroll>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Spacer />
            <Row>
              <Icon name="tools" color="WHITE" />
              <Text color="WHITE" size={24} weight="600">
                {technicianData?.name}
              </Text>
            </Row>
            <Spacer />
            <Divider />
            <DisplayField
              text="Cpf"
              value={formatCpf(technicianData?.cpf)}
              hasCopy
            />
            <Divider />
            <DisplayField
              text="Celular"
              value={formatCellphoneNumber(technicianData?.phone)}
              hasCall
            />
            <Divider />
            <Row>
              <DisplayField
                text="Cargo"
                value={
                  technicianData?.position &&
                  technicianPositionDisplay[technicianData?.position]
                }
              />
              <DisplayField
                text="Status"
                value={
                  technicianData?.status &&
                  technicianStatusDisplay[technicianData?.status]
                }
              />
            </Row>
            <Divider />
            <DisplayField
              text="Logradouro"
              value={technicianData?.address.street}
            />
            <Divider />
            <Row>
              <DisplayField
                text="Numero"
                value={technicianData?.address.number}
              />
              {technicianData?.address.complement ? (
                <DisplayField
                  text="Complemento"
                  value={technicianData?.address.complement}
                />
              ) : null}
            </Row>
            <Divider />
            <Row>
              <DisplayField
                text="Bairro"
                value={technicianData?.address.district}
              />
              <DisplayField
                text="Cep"
                value={formatCep(technicianData?.address.cep)}
              />
            </Row>
            <Divider />
            <Row>
              <DisplayField
                text="Cidade"
                value={technicianData?.address.city.toString()}
              />
              <DisplayField
                text="Estado"
                value={technicianData?.address.state.toString()}
              />
            </Row>
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
