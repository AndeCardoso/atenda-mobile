import React, { PropsWithChildren } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";
import { Colors } from "@global/styles/colors";

interface IListItemProps extends PropsWithChildren {
  color?: Colors;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const ListItem = ({
  children,
  onPress,
  style,
  color = "SECONDARY",
}: IListItemProps) => {
  const { colors } = useTheme();

  const styles: ViewStyle = {
    backgroundColor: colors[color],
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 6,
    borderLeftColor: colors.PRIMARY,
    ...(style as object),
  };

  return (
    <Container style={styles} onPress={onPress && onPress}>
      {children}
    </Container>
  );
};
