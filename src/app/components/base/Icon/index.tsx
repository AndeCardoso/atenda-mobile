import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TIconNames } from "./types";
import { useTheme } from "styled-components";
import { Colors } from "@global/styles/colors";

interface IIconProps {
  name: TIconNames;
  size?: number;
  color?: Colors;
}

export const Icon = ({ name, color = "BLACK", size = 24 }: IIconProps) => {
  const { colors } = useTheme();
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={colors[color]}
      style={{ fontFamily: MaterialCommunityIcons.getFontFamily() }}
    />
  );
};
