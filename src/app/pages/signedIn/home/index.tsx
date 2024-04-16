import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { FAB, Portal } from "react-native-paper";
import { useHomeController } from "./useHomeController";
import { useTheme } from "styled-components";
import { useIsFocused } from "@react-navigation/native";

export const HomePage = () => {
  const { colors } = useTheme();
  const isFocused = useIsFocused();
  const { fabActions } = useHomeController();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Layout header="ATENDA" showProfile hasScroll>
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
