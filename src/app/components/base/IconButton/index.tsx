import React from "react";
import { TouchableOpacity } from "react-native";
import { useTheme } from "styled-components";
import { IIconProps, Icon } from "../Icon";

interface IIconButtonProps extends IIconProps {
  onPress: (value?: any) => void;
}

export const IconButton = ({ onPress, ...rest }: IIconButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon {...rest} />
    </TouchableOpacity>
  );
};
