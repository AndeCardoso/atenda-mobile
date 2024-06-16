import React from "react";
import { ViewProps, ViewStyle } from "react-native";
import { StyledRow } from "./styles";

interface IRowProps extends ViewProps {
  gap?: number;
  space?: "space-between" | "space-around" | "space-evenly" | "flex-start";
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
    alignItems: "center",
    width:
      widthType === "half" ? "50%" : widthType === "auto" ? "auto" : "100%",
  };
  return (
    <StyledRow gap={gap} style={styles} {...rest}>
      {children}
    </StyledRow>
  );
};
