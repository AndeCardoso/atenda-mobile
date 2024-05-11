import React, { PropsWithChildren, useEffect, useState } from "react";
import { Modal, ScrollView, View, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components";
import { IconButton } from "../IconButton";
import { Row } from "../Row";
import { Text } from "../Text";
import { Spacer } from "../Spacer";

interface IDrawerProps extends PropsWithChildren {
  title?: string;
  visible: boolean;
  onDismiss: () => void;
}

export const Drawer = ({
  title,
  visible,
  onDismiss,
  children,
}: IDrawerProps) => {
  const { colors } = useTheme();
  const { top } = useSafeAreaInsets();

  const style: ViewStyle = {
    flex: 1,
    padding: 16,
    paddingTop: top,
    backgroundColor: colors.SECONDARY,
    height: "50%",
  };

  return (
    <Modal
      presentationStyle="pageSheet"
      animationType={"slide"}
      visible={visible}
      onDismiss={onDismiss}
      onRequestClose={onDismiss}
      transparent={false}
    >
      <View style={style}>
        <Row space="space-between">
          {title ? (
            <Text size={24} weight="600" color="PRIMARY">
              {title}
            </Text>
          ) : null}

          <IconButton
            name="close"
            onPress={onDismiss}
            size={34}
            color="PRIMARY"
          />
        </Row>
        <Spacer spaceVertical={24} />
        <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
      </View>
    </Modal>
  );
};
