import { IOption, Select } from "@components/base/Select";
import { Text } from "@components/base/Text";
import React from "react";
import { Control, Controller, ControllerProps } from "react-hook-form";
import { Container } from "./styles";
import { StyleProp, TextStyle } from "react-native";
import { HelperText } from "react-native-paper";
import { useTheme } from "styled-components";
import { Mask } from "react-native-mask-input";

interface IControlledSelect extends Omit<ControllerProps, "render"> {
  label?: string;
  labelStyle?: StyleProp<TextStyle>;
  options?: IOption[];
  control: Control<any, any>;
  loading?: boolean;
  mode?: "flat" | "outlined";
  width?: number;
  placeholder?: string;
  mask?: Mask;
  onPress?: () => void;
  onSelect?: (value?: any) => void;
}

export const ControlledSelect = ({
  name,
  label,
  options,
  control,
  loading,
  mode,
  width,
  disabled,
  labelStyle,
  placeholder,
  mask,
  onPress,
  onSelect,
}: IControlledSelect) => {
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
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        const handleSelect = (value: any) => {
          onChange(value);
          onSelect && onSelect(value);
        };
        return (
          <Container width={width}>
            {label ? (
              <Text style={labelStyle ?? labelStylesDefault}>{label}</Text>
            ) : undefined}
            <Select
              options={options}
              value={value}
              onSelect={handleSelect}
              placeholder={placeholder}
              error={Boolean(error)}
              disabled={disabled}
              loading={loading}
              mode={mode}
              mask={mask}
              onPress={onPress}
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
