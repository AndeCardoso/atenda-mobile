import React from "react";
import { DimensionValue, View, ViewStyle } from "react-native";

interface ISpacerProps {
  spaceVertical?: DimensionValue;
  spaceHorizontal?: DimensionValue;
}

export const Spacer = ({ spaceVertical, spaceHorizontal }: ISpacerProps) => {
  const style: ViewStyle = {
    height: spaceVertical,
    width: spaceHorizontal,
  };
  return <View style={style} />;
};
