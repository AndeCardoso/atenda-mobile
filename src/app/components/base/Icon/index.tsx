import React from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

interface IIconProps {
  name: string;
  size?: number;
  color?: string;
}

export const Icon = ({ name, color, size }: IIconProps) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />;
};
