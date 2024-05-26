import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "styled-components";
import { ViewStyle } from "react-native";
import { Colors } from "@global/styles/colors";

interface ILoaderProps {
  size?: number | "small" | "large";
  color?: Colors;
  padding?: number;
  style?: ViewStyle;
}

export const Loader = ({
  size,
  color = "PRIMARY",
  padding = 0,
  style,
}: ILoaderProps) => {
  const { colors } = useTheme();

  const styleLoader = {
    ...style,
    padding: padding,
  };

  return (
    <ActivityIndicator size={size} color={colors[color]} style={styleLoader} />
  );
};
