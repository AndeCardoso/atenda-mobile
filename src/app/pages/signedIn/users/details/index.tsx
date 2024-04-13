import React, { useState } from "react";
import { useTheme } from "styled-components";
import { FAB, Portal } from "react-native-paper";
import { useIsFocused } from "@react-navigation/native";
import { useUserDetailController } from "./useUserDetailController";
import { DisplayField } from "@components/base/DisplayField";
import { Divider } from "@components/base/Separator";
import { Loader } from "@components/base/Loader";
import { Spacer } from "@components/base/Spacer";
import { Icon } from "@components/base/Icon";
import { Chip } from "@components/base/Chip";
import { Text } from "@components/base/Text";
import { Layout } from "@components/Layout";
import { Row } from "@components/base/Row";
import { Container, WrapperName } from "./styles";
import { View } from "react-native";

export const UserDetailPage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();

  const {
    userData,
    handleGoBack,
    fabActions,
    viewState: { loading },
  } = useUserDetailController();

  const [state, setState] = useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <Layout header="Detalhes do usuário" goBack={handleGoBack} hasScroll>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Spacer />
            <Row space="space-between">
              <WrapperName>
                <Icon name="account" color="WHITE" />
                <Text color="WHITE" size={24} weight="600">
                  {userData?.name}
                </Text>
              </WrapperName>
              {userData?.admin ? (
                <Chip
                  text="Administrador"
                  color="PRIMARY"
                  textColor="SECONDARY"
                />
              ) : null}
            </Row>
            <Spacer />
            <Divider />
            <DisplayField text="E-mail" value={userData?.email} hasCopy />
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
