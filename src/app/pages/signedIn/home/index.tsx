import React, { useState } from "react";
import { Layout } from "@components/Layout";
import { FAB, Portal, useTheme } from "react-native-paper";
import { useHomeController } from "./useHomeController";

export const HomeScreen = () => {
  const { colors } = useTheme();
  const { fabActions } = useHomeController();
  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  return (
    <Layout header="ATENDA">
      <Portal>
        <FAB.Group
          open={open}
          visible
          icon={open ? "note-plus" : "plus"}
          actions={fabActions}
          fabStyle={{
            borderRadius: 50,
            backgroundColor: colors.PRIMARY,
            marginRight: 32,
          }}
          color={colors.SECONDARY}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Layout>
  );
};
