import React, { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { StyledRow } from "./styles";

interface IRowProps extends ViewProps {}

export const Row = ({ children, ...rest }: IRowProps) => {
  return <StyledRow {...rest}>{children}</StyledRow>;
};
