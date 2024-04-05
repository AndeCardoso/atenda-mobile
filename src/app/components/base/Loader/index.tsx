import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "styled-components";
import { ViewStyle } from "react-native";
import { Colors } from "@global/styles/colors";

interface ILoaderProps {
  size?: number | "small" | "large";
  color?: Colors;
  style?: ViewStyle;
}

export const Loader = ({ size, color, style }: ILoaderProps) => {
  const { colors } = useTheme();
  return (
    <ActivityIndicator
      size={size}
      color={colors[color ?? "PRIMARY"]}
      style={style}
    />
  );
};
