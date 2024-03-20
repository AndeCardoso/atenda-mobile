import React, { PropsWithChildren } from "react";
import { Surface } from "react-native-paper";
import { Colors } from "../Text";
import { ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { ElevationLevels } from "react-native-paper/lib/typescript/types";

interface IBaloonCardProps extends PropsWithChildren {
  color?: Colors;
  elevation?: ElevationLevels;
}

export const BaloonCard = ({
  color,
  elevation = 4,
  children,
}: IBaloonCardProps) => {
  const { colors } = useTheme();
  const style: ViewStyle = {
    width: "100%",
    padding: 16,
    backgroundColor: colors[color],
    borderRadius: 8,
  };
  return (
    <Surface style={style} elevation={elevation}>
      {children}
    </Surface>
  );
};
