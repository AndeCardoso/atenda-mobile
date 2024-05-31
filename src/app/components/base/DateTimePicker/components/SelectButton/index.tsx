import React from "react";
import { Button, IconWrapper } from "./styles";
import { Text } from "@components/base/Text";
import { StyleProp, ViewStyle } from "react-native";
import { useTheme } from "styled-components";
import { useTheme as usePaperTheme } from "react-native-paper";
import { IconButton } from "@components/base/IconButton";

interface IInputButtonProps {
  value?: string | Date;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  isDirty?: boolean;
  error?: boolean;
  onPress: () => void;
  handleClear: () => void;
}

export const InputButton = ({
  value,
  placeholder,
  required,
  disabled,
  isDirty,
  error,
  onPress,
  handleClear,
}: IInputButtonProps) => {
  const { colors } = useTheme();
  const { colors: paperColors } = usePaperTheme();

  const inputStyle: StyleProp<ViewStyle> = {
    width: "100%",
    backgroundColor: colors.INPUT_BACKGROUND,
    borderWidth: error ? 2 : 1,
    borderColor: error ? paperColors.error : colors.SECONDARY_INACTIVE,
  };

  const disabledInputStyle: StyleProp<ViewStyle> = {
    ...(inputStyle as Object),
    pointerEvents: "none",
    borderColor: "transparent",
  };

  return (
    <Button
      onPress={onPress}
      style={disabled ? disabledInputStyle : inputStyle}
      activeOpacity={1}
    >
      {value ? (
        <Text color={disabled ? "SECONDARY_INACTIVE" : "WHITE"}>{value}</Text>
      ) : (
        <Text color={disabled ? "SECONDARY" : "SECONDARY_INACTIVE"}>
          {placeholder}
        </Text>
      )}
      <IconWrapper>
        <IconButton
          onPress={!disabled ? onPress : undefined}
          name={disabled ? "lock" : "calendar"}
          color="WHITE"
        />
        {!required && isDirty && !disabled ? (
          <>
            <Text color="WHITE" size={16}>
              |
            </Text>
            <IconButton
              disabled={disabled}
              onPress={handleClear}
              name={"close"}
              color="WHITE"
            />
          </>
        ) : null}
      </IconWrapper>
    </Button>
  );
};
