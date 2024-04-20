import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { FAB, Portal } from "react-native-paper";
import { useHomeController } from "./useHomeController";
import { useTheme } from "styled-components";
import { useIsFocused } from "@react-navigation/native";
import { Container } from "./styles";
import { Text } from "@components/base/Text";
import { Section } from "@components/Section";
import { Card } from "@components/base/Card";

export const HomePage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const {
    advertiseData,
    fabActions,
    viewState: { isLodingAdvertise },
  } = useHomeController();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

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
      <Portal>
        <FAB.Group
          open={open}
          visible={isFocused}
          icon={open ? "close" : "menu"}
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
    </Layout>
  );
};
