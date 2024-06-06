import React from "react";
import { Layout } from "@components/Layout";
import { useHomeController } from "./useHomeController";
import { useIsFocused } from "@react-navigation/native";
import { Container } from "./styles";
import { Text } from "@components/base/Text";
import { Section } from "@components/Section";
import { Card } from "@components/base/Card";
import { FabGroup } from "@components/base/FAB";
import { Loader } from "@components/base/Loader";

export const HomePage = () => {
  const isFocused = useIsFocused();

  const {
    userData,
    advertiseData,
    fabActions,
    viewState: { isLodingAdvertise },
  } = useHomeController();

  return (
    <Layout
      hasBrand
      showProfile
      hasScroll
      headerComponent={
        <Text size={24} weight="700" color="SECONDARY">
          Seja bem vindo, {userData?.name}!
        </Text>
      }
    >
      <Container>
        {isLodingAdvertise ? (
          <Loader size={64} />
        ) : advertiseData ? (
          <Section title="Notificações">
            <Card color="SECONDARY_INACTIVE">
              <Text weight="600" size={24} color="WHITE">
                {advertiseData?.message}
              </Text>
            </Card>
          </Section>
        ) : null}
      </Container>
      <FabGroup
        isFocused={isFocused}
        fabActions={fabActions}
        openedIcon="close"
        closedIcon="menu"
      />
    </Layout>
  );
};
