import React, { PropsWithChildren } from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { StyledRow } from "./styles";

interface IRowProps extends ViewProps {
  gap?: number;
  space?: "space-between" | "space-around" | "space-evenly";
  widthType?: "auto" | "half" | "full";
}

export const Row = ({
  children,
  gap,
  space,
  widthType = "full",
  ...rest
}: IRowProps) => {
  const styles: ViewStyle = {
    justifyContent: space,
    width:
      widthType === "half" ? "50%" : widthType === "auto" ? "auto" : "100%",
  };
  return (
    <StyledRow gap={gap} style={styles} {...rest}>
      {children}
    </StyledRow>
  );
};
