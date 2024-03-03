import { Input } from "@components/base/Input";
import { Text } from "@components/base/Text";
import React from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { Container } from "./styles";
import { StyleProp, TextStyle } from "react-native";
import { HelperText } from "react-native-paper";

interface IControlledInput extends Omit<ControllerProps, "render"> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  control: Control<any, any>;
  placeholder?: string;
  password?: boolean;
  error?: string;
}

export const ControlledInput = ({
  name,
  error,
  label,
  control,
  disabled,
  password,
  labelStyle,
  placeholder,
  defaultValue,
}: IControlledInput) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      disabled={disabled}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Container>
          {label ? <Text style={labelStyle}>{label}</Text> : undefined}
          <Input
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            password={password}
            error={Boolean(error)}
          />
          <HelperText type="error" visible={Boolean(error)}>
            {error?.message}
          </HelperText>
        </Container>
      )}
    />
  );
};
