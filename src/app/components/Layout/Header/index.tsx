import React from "react";
import { Container, StyledRow } from "./styles";
import { Text } from "@components/base/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Row } from "@components/base/Row";
import { Icon } from "@components/base/Icon";

interface IHeaderProps {
  text?: string;
  goBack?: () => void;
  close?: () => void;
}

export const Header = ({ text, goBack, close }: IHeaderProps) => {
  return (
    <Container>
      <StyledRow>
        {Boolean(goBack) && (
          <TouchableOpacity onPress={goBack}>
            <Icon name={"chevron-left"} size={28} />
          </TouchableOpacity>
        )}
        {Boolean(text) && (
          <Text weight="700" size={24}>
            {text}
          </Text>
        )}
      </StyledRow>

      {Boolean(close) && (
        <TouchableOpacity onPress={close}>
          <Icon name={"close"} size={30} />
        </TouchableOpacity>
      )}
    </Container>
  );
};
