import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TIconNames } from "./types";

interface IIconProps {
  name: TIconNames;
  size?: number;
  color?: string;
}

export const Icon = ({ name, color, size }: IIconProps) => {
  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color}
      style={{ fontFamily: MaterialCommunityIcons.getFontFamily() }}
    />
  );
};
