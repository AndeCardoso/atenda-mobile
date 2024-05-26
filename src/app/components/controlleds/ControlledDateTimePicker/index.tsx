import { Text } from "@components/base/Text";
import React from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { Container } from "./styles";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { HelperText } from "react-native-paper";
import { useTheme } from "styled-components";
import {
  DateTimePicker,
  IDateTimePickerProps,
} from "@components/base/DateTimePicker";

interface IControlledDateTimePickerProps
  extends Omit<ControllerProps, "render">,
    Partial<IDateTimePickerProps> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  control: Control<any, any>;
  widthType?: "auto" | "half" | "full" | "flex";
  placeholder?: string;
}

export const ControlledDateTimePicker = ({
  name,
  label,
  control,
  disabled,
  required,
  widthType,
  labelStyle,
  placeholder,
  minDate,
  maxDate,
}: IControlledDateTimePickerProps) => {
  const { colors } = useTheme();
  const labelStylesDefault: StyleProp<TextStyle> = {
    color: colors.WHITE,
    fontWeight: "600",
    fontSize: 16,
  };

  const containerStyles: ViewStyle = {
    flex: widthType === "flex" ? 1 : 0,
    width:
      widthType === "half" ? "70%" : widthType === "auto" ? "auto" : "100%",
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <Container style={containerStyles}>
          {label ? (
            <Text style={labelStyle ?? labelStylesDefault}>{label}</Text>
          ) : undefined}
          <DateTimePicker
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            required={required}
            minDate={minDate}
            maxDate={maxDate}
          />
          <HelperText type="error" visible={Boolean(error)} disabled={disabled}>
            {error?.message}
          </HelperText>
        </Container>
      )}
    />
  );
};
