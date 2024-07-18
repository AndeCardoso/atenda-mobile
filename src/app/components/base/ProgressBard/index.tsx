import React from "react";
import { ProgressBar as ProgressBarPaper } from "react-native-paper";
import { useTheme } from "styled-components";

interface IProgressBarProps {
  progressValue: number;
}

export const ProgressBar = ({ progressValue }: IProgressBarProps) => {
  const { colors } = useTheme();
  return (
    <ProgressBarPaper
      progress={progressValue}
      color={colors.PRIMARY_INACTIVE}
    />
  );
};
