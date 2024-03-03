import React, { PropsWithChildren } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text as PaperText } from "react-native-paper";
import { colors } from "@global/styles/colors";
import { useFonts } from "expo-font";
import { useTheme } from "styled-components";

export type Colors = keyof typeof colors;

interface ITextProps extends PropsWithChildren {
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
}: ITextProps) => {
  const { colors } = useTheme();
  const [fontsLoaded, fontError] = useFonts({
    Anton: require("@fonts/Anton-Regular.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const fontStyle: StyleProp<TextStyle> = {
    fontSize: size,
    fontFamily: brandFont ? "Anton" : "Arial",
    color: colors[color || "BLACK"],
    fontWeight: weight || "400",
  };

  return (
    <PaperText style={Object.assign(fontStyle, style)}>{children}</PaperText>
  );
};
