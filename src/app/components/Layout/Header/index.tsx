import React from "react";
import { Container, ContainerTop, StyledRow } from "./styles";
import { Text } from "@components/base/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@components/base/Icon";
import { InputSearch } from "@components/base/InputSearch";

interface IHeaderProps {
  text?: string;
  onSearch?: (value?: string) => void;
  goBack?: () => void;
  close?: () => void;
}

export const Header = ({ text, onSearch, goBack, close }: IHeaderProps) => {
  return (
    <Container>
      <ContainerTop>
        <StyledRow>
          {Boolean(goBack) && (
            <TouchableOpacity onPress={goBack}>
              <Icon name={"chevron-left"} size={28} />
            </TouchableOpacity>
          )}
          {Boolean(text) && (
            <Text weight="700" size={24} style={{ flex: 0 }}>
              {text}
            </Text>
          )}
        </StyledRow>

        {Boolean(close) && (
          <TouchableOpacity onPress={close}>
            <Icon name={"close"} size={30} />
          </TouchableOpacity>
        )}
      </ContainerTop>
      {onSearch ? <InputSearch onChangeText={onSearch} /> : null}
    </Container>
  );
};
