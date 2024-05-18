import React, { PropsWithChildren } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";
import { Colors } from "@global/styles/colors";
import { Icon } from "../Icon";

interface IListItemProps extends PropsWithChildren {
  color?: Colors;
  selected?: boolean;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const ListItem = ({
  selected,
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
      {selected ? <Icon name="check-bold" size={20} color="PRIMARY" /> : null}
    </Container>
  );
};
