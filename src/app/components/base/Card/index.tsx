import React, { PropsWithChildren } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";

interface ICardProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  onPress?: (e: GestureResponderEvent) => void;
}

export const Card = ({ children, onPress, style }: ICardProps) => {
  const { colors } = useTheme();

  const styles: ViewStyle = {
    backgroundColor: colors.PRIMARY,
    borderRadius: 8,
    ...(style as object),
  };

  return (
    <Container style={styles} onPress={onPress && onPress}>
      {children}
    </Container>
  );
};
