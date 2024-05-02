import React, { PropsWithChildren } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";
import { Colors } from "@global/styles/colors";

interface ICardProps extends PropsWithChildren {
  color?: Colors;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const Card = ({
  children,
  onPress,
  style,
  color = "PRIMARY",
}: ICardProps) => {
  const { colors } = useTheme();

  const styles: ViewStyle = {
    backgroundColor: colors.SECONDARY_INACTIVE,
    borderRadius: 8,
    borderLeftWidth: 6,
    borderLeftColor: colors[color],
    ...(style as object),
  };

  return (
    <Container style={styles} onPress={onPress && onPress}>
      {children}
    </Container>
  );
};
