import { Text } from "@components/base/Text";
import React from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { Container } from "./styles";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { HelperText } from "react-native-paper";
import { useTheme } from "styled-components";
import { RadioGroup } from "@components/base/RadioGroup";

interface IControlledRadioGroup extends Omit<ControllerProps, "render"> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  itemList: any[];
  control: Control<any, any>;
}

export const ControlledRadioGroup = ({
  name,
  label,
  control,
  disabled,
  itemList,
  labelStyle,
  defaultValue,
}: IControlledRadioGroup) => {
  const { colors } = useTheme();

  const labelStylesDefault: StyleProp<TextStyle> = {
    color: colors.WHITE,
    fontWeight: "600",
    fontSize: 16,
  };

  const containerStyles: ViewStyle = {
    width: "100%",
  };
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <Container style={containerStyles}>
            {label ? (
              <Text style={labelStyle ?? labelStylesDefault}>{label}</Text>
            ) : undefined}
            <RadioGroup
              onSelect={onChange}
              selectedValue={value}
              items={itemList}
              error={Boolean(error)}
            />
            <HelperText
              type="error"
              visible={Boolean(error)}
              disabled={disabled}
            >
              {error?.message}
            </HelperText>
          </Container>
        );
      }}
    />
  );
};
