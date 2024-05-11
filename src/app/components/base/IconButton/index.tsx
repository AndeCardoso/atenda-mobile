import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import { IIconProps, Icon } from "../Icon";

interface IIconButtonProps extends IIconProps {
  disabled?: boolean;
  onPress: (value?: any) => void;
}

export const IconButton = ({
  disabled,
  onPress,
  ...rest
}: IIconButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{ opacity: disabled ? 0.3 : 1 }}
    >
      <Icon {...rest} />
    </TouchableOpacity>
  );
};
