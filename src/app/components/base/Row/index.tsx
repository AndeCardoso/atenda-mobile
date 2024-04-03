import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { StyledRow } from "./styles";

interface IRowProps extends ViewProps {
  gap?: number;
}

export const Row = ({ children, gap, ...rest }: IRowProps) => {
  return (
    <StyledRow gap={gap} {...rest}>
      {children}
    </StyledRow>
  );
};
