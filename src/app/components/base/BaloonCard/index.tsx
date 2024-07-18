import React, { PropsWithChildren } from "react";
import { Surface } from "react-native-paper";
import { ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { ElevationLevels } from "react-native-paper/lib/typescript/types";
import { Colors } from "@global/styles/colors";
import { Icon } from "../Icon";
import { TIconNames } from "../Icon/types";

interface IBaloonCardProps extends PropsWithChildren {
  color?: Colors;
  elevation?: ElevationLevels;
  styles?: ViewStyle;
  icon?: {
    name: TIconNames;
    color: Colors;
    size: number;
  };
}

export const BaloonCard = ({
  color,
  elevation = 4,
  children,
  styles,
  icon,
}: IBaloonCardProps) => {
  const { colors } = useTheme();
  const style: ViewStyle = {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    backgroundColor: colors[color ?? "PRIMARY"],
    borderRadius: 8,
    gap: 8,
    ...styles,
  };
  return (
    <Surface style={style} elevation={elevation}>
      {icon ? (
        <Icon name={icon.name} size={icon.size} color={icon.color} />
      ) : null}
      {children}
    </Surface>
  );
};
