import React, { useRef, useState } from "react";
import { StyleProp, TextStyle, TextInput as TextInputRN } from "react-native";
import MaskInput, { Mask } from "react-native-mask-input";
import { TextInput, TextInputProps } from "react-native-paper";
import { useTheme } from "styled-components";

interface IInputProps extends TextInputProps {
  password?: boolean;
  mask?: Mask;
}

export const Input = ({
  value,
  password,
  onChangeText,
  placeholder,
  disabled,
  mask,
  error,
}: IInputProps) => {
  const theme = useTheme();
  const { colors } = theme;
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInputRN>(null);

  const handleToogleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  function handleClear() {
    inputRef.current?.clear();
    onChangeText?.("");
  }

  const inputStyle: StyleProp<TextStyle> = {
    width: "100%",
    backgroundColor: "black",
  };

  const disabledInputStyle: StyleProp<TextStyle> = {
    width: "100%",
    backgroundColor: "black",
    color: colors.SECONDARY_INACTIVE,
    pointerEvents: "none",
  };

  return password ? (
    <TextInput
      value={value}
      mode={"outlined"}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={!showPassword}
      textColor={theme.colors.primary}
      outlineColor={theme.colors.primary}
      placeholderTextColor={theme.colors.secondary}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      style={inputStyle}
      error={error}
      right={
        (isFocused || (value && value.length > 0)) && (
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            color={theme.colors.primary}
            onPress={handleToogleShowPassword}
          />
        )
      }
    />
  ) : (
    <TextInput
      value={value}
      mode={"outlined"}
      onChangeText={onChangeText}
      placeholder={placeholder}
      textColor={disabled ? colors.SECONDARY_INACTIVE : theme.colors.primary}
      outlineColor={disabled ? "transparent" : theme.colors.primary}
      placeholderTextColor={theme.colors.secondary}
      style={disabled ? disabledInputStyle : inputStyle}
      error={error}
      right={
        value &&
        value.length > 0 && (
          <TextInput.Icon
            icon={disabled ? "lock" : "close"}
            color={theme.colors.primary}
            onPress={handleClear}
          />
        )
      }
      render={(props) => <MaskInput {...props} mask={mask} />}
    />
  );
};
