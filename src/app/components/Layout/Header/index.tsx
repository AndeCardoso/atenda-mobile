import React from "react";
import { Container, ContainerTop, StyledRow } from "./styles";
import { Text } from "@components/base/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@components/base/Icon";
import { InputSearch } from "@components/base/InputSearch";
import { Profile } from "@components/base/Profile";
import { useAuth } from "@hooks/useAuth";

interface IHeaderProps {
  text?: string;
  showProfile?: boolean;
  onSearch?: (value?: string) => void;
  goBack?: () => void;
  close?: () => void;
}

export const Header = ({
  text,
  showProfile,
  onSearch,
  goBack,
  close,
}: IHeaderProps) => {
  const { userData } = useAuth();
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
            <Text weight="700" size={32}>
              {text}
            </Text>
          )}
        </StyledRow>

        {showProfile && userData ? <Profile data={userData} /> : null}
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
