import React from "react";
import { TextStyle, ViewStyle } from "react-native";
import { ButtonProps, Button as PaperButton } from "react-native-paper";
import { useTheme } from "styled-components";
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
    borderColor: colors.PRIMARY,
    borderWidth: mode === "text" ? 0 : 2,
    justifyContent: "center",
    borderRadius: 50,
  };

  const labelStyle: TextStyle = {
    fontSize: 16,
    fontWeight: "600",
  };

  const loadingColors = {
    text: "WHITE",
    outlined: "PRIMARY",
    contained: "SECONDARY",
  };

  return (
    <PaperButton
      textColor={colors[loadingColors[mode]]}
      style={style}
      labelStyle={labelStyle}
      mode={mode}
      {...rest}
    >
      {children}
      {loading ? <StyledLoader size={16} color={loadingColors[mode]} /> : null}
    </PaperButton>
  );
};
