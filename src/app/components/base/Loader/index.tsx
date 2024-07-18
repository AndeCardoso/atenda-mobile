import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { useTheme } from "styled-components";
import { Dimensions, ViewStyle } from "react-native";
import { Colors } from "@global/styles/colors";

const { height } = Dimensions.get("window");

interface ILoaderProps {
  size?: number | "small" | "large";
  color?: Colors;
  padding?: number;
  small?: boolean;
  style?: ViewStyle;
}

export const Loader = ({
  size,
  color = "PRIMARY",
  padding = 0,
  small,
  style,
}: ILoaderProps) => {
  const { colors } = useTheme();

  const styleLoader = {
    ...style,
    padding: padding,
    ...(!small && { height: height - height * 0.2 }),
  };

  return (
    <ActivityIndicator size={size} color={colors[color]} style={styleLoader} />
  );
};
