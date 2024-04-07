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
  weight?: "400" | "500" | "600" | "700" | "800" | "900";
  style?: StyleProp<TextStyle>;
}

export const Text = ({
  children,
  brandFont,
  size = 16,
  color,
  weight,
  style,
  ...rest
}: ITextProps) => {
  const { colors } = useTheme();

  const fontStyle: TextStyle = {
    flex: 1,
    fontSize: size,
    fontFamily: brandFont ? "Anton" : "Arial",
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
