import React from "react";
import { Image, Platform } from "react-native";
import { Container, ContainerTop, StyledRow } from "./styles";
import { Text } from "@components/base/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@components/base/Icon";
import { InputSearch } from "@components/base/InputSearch";
import { Profile } from "@components/base/Profile";
import { useAuth } from "@hooks/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IHeaderProps {
  text?: string;
  showProfile?: boolean;
  hasBrand?: boolean;
  onSearch?: (value?: string) => void;
  goBack?: () => void;
  close?: () => void;
}

const android = Platform.OS === "android";

export const Header = ({
  text,
  showProfile,
  hasBrand,
  onSearch,
  goBack,
  close,
}: IHeaderProps) => {
  const { userData } = useAuth();
  const { top } = useSafeAreaInsets();

  return (
    <Container paddingTop={android ? top + 16 : top}>
      <ContainerTop>
        <StyledRow>
          {Boolean(goBack) && (
            <TouchableOpacity onPress={goBack}>
              <Icon name={"chevron-left"} size={28} />
            </TouchableOpacity>
          )}
          {hasBrand ? (
            <Image
              resizeMode="center"
              style={{ width: 155, height: 70 }}
              source={require("../../../assets/brand/brand-dark.png")}
            />
          ) : null}
          {Boolean(text) ? (
            <Text weight="700" size={24}>
              {text}
            </Text>
          ) : null}
        </StyledRow>

        {showProfile && userData ? <Profile data={userData} /> : null}
        {Boolean(close) ? (
          <TouchableOpacity onPress={close}>
            <Icon name={"close"} size={30} />
          </TouchableOpacity>
        ) : null}
      </ContainerTop>
      {onSearch ? <InputSearch onChangeText={onSearch} /> : null}
    </Container>
  );
};
