import React from "react";
import { TouchableOpacity } from "react-native";
import { IIconProps, Icon } from "../Icon";
import { IconButtonProps } from "react-native-paper";

interface IIconButtonProps extends IIconProps, Omit<IconButtonProps, "icon"> {
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
