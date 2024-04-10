import React from "react";
import { useTheme } from "styled-components";
import { Divider as DividerPaper } from "react-native-paper";
import { ViewStyle } from "react-native";
import { Colors } from "@global/styles/colors";

interface IDividerProps {
  spaceVertical?: number;
  color?: Colors;
}

export const Divider = ({
  spaceVertical,
  color = "PRIMARY",
}: IDividerProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const style: ViewStyle = {
    marginVertical: spaceVertical,
    backgroundColor: colors[color ?? "WHITE"],
  };
  return <DividerPaper style={style} bold />;
};
