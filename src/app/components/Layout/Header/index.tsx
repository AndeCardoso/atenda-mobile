import React, { ReactNode, useCallback, useRef } from "react";
import { Image, Platform } from "react-native";
import { Container, ContainerTop, StyledRow } from "./styles";
import { Text } from "@components/base/Text";
import { InputSearch } from "@components/base/InputSearch";
import { Profile } from "@components/base/Profile";
import { useAuth } from "@hooks/useAuth";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IconButton } from "@components/base/IconButton";
import { Row } from "@components/base/Row";
import { IStepperProps, Stepper } from "@components/base/Stepper";
import debounce from "lodash.debounce";
import { Icon } from "@components/base/Icon";
import { TIconNames } from "@components/base/Icon/types";

interface IHeaderProps {
  text?: string;
  textSearch?: string;
  showProfile?: boolean;
  hasBrand?: boolean;
  steps?: IStepperProps;
  searchPlaceholder?: string;
  contextIcon?: TIconNames;
  onRegister?: () => void;
  onSearch?: (value?: string) => void;
  goBack?: () => void;
  close?: () => void;
  headerComponent?: ReactNode;
}

const android = Platform.OS === "android";

export const Header = ({
  text,
  textSearch,
  searchPlaceholder = "Buscar",
  showProfile,
  contextIcon,
  onRegister,
  hasBrand,
  onSearch,
  goBack,
  close,
  steps,
  headerComponent,
}: IHeaderProps) => {
  const { userData } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleDebouncedChange = useCallback(
    debounce((value?: string) => {
      onSearch && onSearch(value);
    }, 500),
    []
  );

  return (
    <Container paddingTop={android ? top + 16 : top}>
      <ContainerTop>
        <StyledRow>
          {Boolean(goBack) && (
            <IconButton
              name="chevron-left"
              onPress={() => goBack && goBack()}
              size={28}
              color="SECONDARY"
            />
          )}
          {hasBrand ? (
            <Image
              resizeMode="contain"
              style={{ width: 150, height: 70 }}
              source={require("../../../assets/brand/brand-dark.png")}
            />
          ) : null}
          {Boolean(text) ? (
            <Text weight="700" size={22} color="SECONDARY">
              {text}
            </Text>
          ) : null}
          {contextIcon ? <Icon name={contextIcon} color="SECONDARY" /> : null}
        </StyledRow>

        {showProfile && userData ? <Profile data={userData} /> : null}
        {Boolean(close) ? (
          <IconButton
            name="close"
            onPress={() => close && close()}
            size={28}
            color="SECONDARY"
          />
        ) : null}
      </ContainerTop>
      {steps ? <Stepper current={steps.current} total={steps.total} /> : null}
      {onSearch ? (
        <Row>
          <InputSearch
            onChangeText={handleDebouncedChange}
            text={textSearch}
            placeholder={searchPlaceholder}
          />
          {onRegister ? (
            <IconButton
              name="plus"
              onPress={onRegister}
              size={40}
              color="SECONDARY"
            />
          ) : null}
        </Row>
      ) : null}
      {Boolean(headerComponent) ? headerComponent : null}
    </Container>
  );
};
