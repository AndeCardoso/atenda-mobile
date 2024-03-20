import React from "react";
import { ViewStyle } from "react-native";
import {
  ButtonProps,
  Button as PaperButton,
  useTheme,
} from "react-native-paper";
import { StyledLoader } from "./styles";

interface IButtonProps extends ButtonProps {
  link?: boolean;
  fullwidth?: boolean;
}

export const Button = ({
  link,
  loading,
  fullwidth,
  children,
  mode,
  ...rest
}: IButtonProps) => {
  const { colors } = useTheme();

  const style: ViewStyle = {
    flex: fullwidth ? 1 : 0,
    borderColor: colors.primary,
    borderWidth: 2,
    justifyContent: "center",
  };

  const loadingColors = {
    text: "PRIMARY",
    outlined: "PRIMARY",
    contained: "SECONDARY",
  };

  return (
    <PaperButton
      textColor={colors[loadingColors[mode]]}
      style={style}
      labelStyle={{ fontSize: 16, fontWeight: "600" }}
      mode={mode}
      {...rest}
    >
      {children}

      {loading && <StyledLoader size={16} color={loadingColors[mode]} />}
    </PaperButton>
  );
};
