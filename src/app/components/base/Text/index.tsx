import React, { PropsWithChildren } from "react";
import {
  StyleProp,
  Text as UnstyledText,
  TextStyle,
  TextInputProps,
} from "react-native";
import { Colors } from "@global/styles/colors";
import { useTheme } from "styled-components";

interface ITextProps extends PropsWithChildren, TextInputProps {
  brandFont?: boolean;
  size?: number;
  color?: Colors;
  fullwidth?: boolean;
  weight?: "400" | "500" | "600" | "700" | "800" | "900";
  style?: StyleProp<TextStyle>;
}

export const Text = ({
  children,
  size = 16,
  color,
  fullwidth,
  weight,
  style,
  ...rest
}: ITextProps) => {
  const { colors } = useTheme();

  const fontStyle: TextStyle = {
    flex: fullwidth ? 1 : undefined,
    fontSize: size,
    color: colors[color || "BLACK"],
    fontWeight: weight || "400",
    ...(style as object),
  };

  return (
    <UnstyledText style={fontStyle} {...rest}>
      {children}
    </UnstyledText>
  );
};
