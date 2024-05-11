import React from "react";
import { ProgressBar } from "react-native-paper";
import { useTheme } from "styled-components";
import { Text } from "../Text";
import { TextStyle, View, ViewStyle } from "react-native";

export interface IStepperProps {
  total: number;
  current: number;
}

export const Stepper = ({ total, current }: IStepperProps) => {
  const { colors } = useTheme();

  const counterStyle: TextStyle = {
    alignSelf: "flex-end",
  };

  const styles: ViewStyle = {
    width: "100%",
    paddingHorizontal: 8,
    gap: 4,
  };

  return (
    <View style={styles}>
      <ProgressBar
        progress={(current / total) * 1}
        color={colors.SECONDARY}
        style={{ width: "100%", backgroundColor: colors.PRIMARY_INACTIVE }}
      />
      <Text
        size={14}
        color="SECONDARY"
        style={counterStyle}
      >{`${current}/${total}`}</Text>
    </View>
  );
};
