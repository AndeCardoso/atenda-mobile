import { Input } from "@components/base/Input";
import { Text } from "@components/base/Text";
import React from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { Container } from "./styles";
import {
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { HelperText } from "react-native-paper";
import { useTheme } from "styled-components";
import { Mask } from "react-native-mask-input";

interface IControlledInput extends Omit<ControllerProps, "render"> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  control: Control<any, any>;
  mode?: "flat" | "outlined";
  widthType?: "auto" | "half" | "full";
  fullwidth?: boolean;
  placeholder?: string;
  password?: boolean;
  longText?: boolean;
  mask?: Mask;
  keyboardTypes?: KeyboardTypeOptions;
}

export const ControlledInput = ({
  name,
  label,
  control,
  mode,
  widthType,
  fullwidth,
  disabled,
  password,
  labelStyle,
  placeholder,
  defaultValue,
  longText,
  mask,
  keyboardTypes,
}: IControlledInput) => {
  const { colors } = useTheme();

  const labelStylesDefault: StyleProp<TextStyle> = {
    color: colors.WHITE,
    fontWeight: "600",
    fontSize: 16,
  };

  const containerStyles: ViewStyle = {
    width:
      widthType === "half" ? "47%" : widthType === "auto" ? "auto" : "100%",
  };
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Container style={containerStyles} fullwidth={fullwidth}>
          {label ? (
            <Text style={labelStyle ?? labelStylesDefault}>{label}</Text>
          ) : null}
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            longText={longText}
            password={password}
            error={Boolean(error)}
            disabled={disabled}
            mode={mode}
            mask={mask}
            keyboardType={keyboardTypes}
          />
          <HelperText type="error" visible={Boolean(error)} disabled={disabled}>
            {error?.message}
          </HelperText>
        </Container>
      )}
    />
  );
};
