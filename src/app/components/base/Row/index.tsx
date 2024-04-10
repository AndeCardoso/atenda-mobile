import React, { PropsWithChildren } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { StyledRow } from "./styles";

interface IRowProps extends ViewProps {
  gap?: number;
  space?: "space-between" | "space-around" | "space-evenly";
}

export const Row = ({ children, gap, space, ...rest }: IRowProps) => {
  const styles: ViewStyle = {
    justifyContent: space,
  };
  return (
    <StyledRow gap={gap} style={styles} {...rest}>
      {children}
    </StyledRow>
  );
};
