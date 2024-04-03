import React, { PropsWithChildren } from "react";
import { StyleProp, TextStyle } from "react-native";
import { useTheme } from "styled-components";
import { Container } from "./styles";

interface ICardProps extends PropsWithChildren {
  style?: StyleProp<TextStyle>;
  onPress?: (value?: string | number) => void;
}

export const Card = ({ children, onPress, style }: ICardProps) => {
  const { colors } = useTheme();

  return (
    <Container
      mode="contained"
      style={{ backgroundColor: colors.PRIMARY_INACTIVE }}
      onPress={onPress && onPress}
    >
      {children}
    </Container>
  );
};
