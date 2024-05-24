import React from "react";
import { IIconProps } from "../Icon";
import {
  IconButton as PaperIconButton,
  IconButtonProps,
} from "react-native-paper";
import { useTheme } from "styled-components";
import { Colors } from "@global/styles/colors";

interface IIconButtonProps extends IIconProps, Omit<IconButtonProps, "icon"> {
  disabled?: boolean;
  onPress?: (value?: any) => void;
}

export const IconButton = ({
  disabled,
  onPress,
  name,
  color,
  ...rest
}: IIconButtonProps) => {
  const { colors } = useTheme();
  return (
    <PaperIconButton
      {...rest}
      icon={name}
      iconColor={colors[color as Colors]}
      onPress={onPress}
      disabled={disabled}
      style={{ margin: 0 }}
    />
  );
};
