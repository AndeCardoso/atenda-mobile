import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { useTheme } from "styled-components";
import { ViewStyle } from "react-native";

interface IInputSearchProps {
  placeholder?: string;
  style?: ViewStyle;
  onChangeText?: (value?: string) => void;
}

export const InputSearch = ({
  placeholder = "Busca",
  style,
  onChangeText,
}: IInputSearchProps) => {
  const { colors } = useTheme();
  const defaultStyle: ViewStyle = {
    width: "100%",
    backgroundColor: colors.SECONDARY,
  };
  const [searchValue, setSearchValue] = useState("");

  const onChange = (value?: string) => {
    setSearchValue(value ?? "");
    onChangeText && onChangeText(value);
  };

  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChange}
      value={searchValue}
      style={style ?? defaultStyle}
    />
  );
};
