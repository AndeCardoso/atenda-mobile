import React, { PropsWithChildren } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { ButtonLabel, Container } from "./styles";
import { Colors } from "@global/styles/colors";
import { Text } from "../Text";
import { Icon } from "../Icon";

interface ICardProps extends PropsWithChildren {
  color?: Colors;
  style?: StyleProp<ViewStyle>;
  footerLabel?: string;
  onPress?: (e: GestureResponderEvent) => void;
}

export const Card = ({
  children,
  onPress,
  style,
  footerLabel,
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
      {footerLabel ? (
        <ButtonLabel>
          <Text color="WHITE" weight="600">
            {footerLabel}
          </Text>
          <Icon color="WHITE" name="arrow-right" />
        </ButtonLabel>
      ) : null}
    </Container>
  );
};
