import { Input } from "@components/base/Input";
import { Text } from "@components/base/Text";
import React from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { Container } from "./styles";
import { StyleProp, TextStyle } from "react-native";
import { HelperText } from "react-native-paper";
import { useTheme } from "styled-components";
import { Mask } from "react-native-mask-input";

interface IControlledInput extends Omit<ControllerProps, "render"> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  control: Control<any, any>;
  mode?: "flat" | "outlined";
  width?: number;
  placeholder?: string;
  password?: boolean;
  mask?: Mask;
}

export const ControlledInput = ({
  name,
  label,
  control,
  mode,
  width,
  disabled,
  password,
  labelStyle,
  placeholder,
  defaultValue,
  mask,
}: IControlledInput) => {
  const { colors } = useTheme();

  const labelStylesDefault: StyleProp<TextStyle> = {
    color: colors.WHITE,
    fontWeight: "600",
    fontSize: 16,
  };
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Container width={width}>
          {label ? (
            <Text style={labelStyle ?? labelStylesDefault}>{label}</Text>
          ) : undefined}
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            password={password}
            error={Boolean(error)}
            disabled={disabled}
            mode={mode}
            mask={mask}
          />
          <HelperText type="error" visible={Boolean(error)} disabled={disabled}>
            {error?.message}
          </HelperText>
        </Container>
      )}
    />
  );
};
