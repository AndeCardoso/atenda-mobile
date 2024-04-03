import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "../Text";
import { useTheme } from "styled-components";
import { ViewStyle } from "react-native";

interface ILoaderProps {
  text?: string;
  size?: number | "small" | "large";
  color?: Colors;
  style?: ViewStyle;
}

export const Loader = ({ text, size, color, style }: ILoaderProps) => {
  const { colors } = useTheme();
  return (
    <ActivityIndicator
      size={size}
      color={colors[color ?? "PRIMARY"]}
      style={style}
    />
  );
};
