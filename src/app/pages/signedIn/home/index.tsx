import React from "react";
import { Layout } from "@components/Layout";
import { useHomeController } from "./useHomeController";
import { useIsFocused } from "@react-navigation/native";
import { Container } from "./styles";
import { Text } from "@components/base/Text";
import { Section } from "@components/Section";
import { Card } from "@components/base/Card";
import { FabButton } from "@components/base/FAB";

export const HomePage = () => {
  const isFocused = useIsFocused();

  const {
    advertiseData,
    fabActions,
    viewState: { isLodingAdvertise },
  } = useHomeController();

  return (
    <Layout hasBrand showProfile hasScroll>
      <Container>
        <Section
          title="Notificações"
          action={{ text: "Ver mais", onPress: () => console.log("teste") }}
        >
          <Card color="SECONDARY_INACTIVE">
            <Text weight="600" size={24} color="WHITE">
              {advertiseData?.message}
            </Text>
          </Card>
        </Section>
      </Container>
      <FabButton
        isFocused={isFocused}
        fabActions={fabActions}
        openedIcon="close"
        closedIcon="menu"
      />
    </Layout>
  );
};
