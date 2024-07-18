import React, { useEffect, useState } from "react";
import { Searchbar } from "react-native-paper";
import { useTheme } from "styled-components";
import { ViewStyle } from "react-native";

interface IInputSearchProps {
  placeholder?: string;
  text?: string;
  style?: ViewStyle;
  onChangeText?: (value?: string) => void;
}

export const InputSearch = ({
  placeholder = "Busca",
  text,
  style,
  onChangeText,
}: IInputSearchProps) => {
  const { colors } = useTheme();
  const [searchValue, setSearchValue] = useState(text || "");

  const defaultStyle: ViewStyle = {
    flex: 1,
    width: "100%",
    backgroundColor: colors.SECONDARY,
  };

  const onChange = (value?: string) => {
    setSearchValue(value ?? "");
    onChangeText && onChangeText(value);
  };

  useEffect(() => {
    setSearchValue(text || "");
  }, [text]);

  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={onChange}
      value={searchValue}
      style={style ?? defaultStyle}
    />
  );
};
