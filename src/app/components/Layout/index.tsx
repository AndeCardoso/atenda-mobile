import React, { PropsWithChildren, ReactNode } from "react";
import { KeyboardAvoidingView, Platform, View, ViewStyle } from "react-native";
import { Header } from "./Header";
import { StatusBar } from "../base/StatusBar";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FooterContainer } from "./styles";

interface ILayoutProps extends PropsWithChildren {
  header?: string;
  footer?: ReactNode;
  hasBrand?: boolean;
  hasScroll?: boolean;
  showProfile?: boolean;
  onSearch?: (value?: string) => void;
  goBack?: () => void;
  close?: () => void;
}

const ios = Platform.OS === "ios";

export const Layout = ({
  header,
  footer,
  hasBrand,
  hasScroll,
  showProfile,
  onSearch,
  goBack,
  close,
  children,
}: ILayoutProps) => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();

  const style: ViewStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.SECONDARY,
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    width: "100%",
  };

  return (
    <KeyboardAvoidingView behavior={ios ? "padding" : "height"} style={style}>
      <Header
        text={header}
        onSearch={onSearch}
        goBack={goBack}
        close={close}
        hasBrand={hasBrand}
        showProfile={showProfile}
      />

      {hasScroll ? (
        <ScrollView style={containerStyle} showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={containerStyle}>{children}</View>
      )}

      {footer && (
        <FooterContainer paddingBottom={bottom || 16}>{footer}</FooterContainer>
      )}
      <StatusBar textColor="dark" backgroundColor={colors.primary} />
    </KeyboardAvoidingView>
  );
};
