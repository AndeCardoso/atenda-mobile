import React, { PropsWithChildren, ReactNode } from "react";
import { SafeAreaView, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { Header } from "./Header";
import { StatusBar } from "../base/StatusBar";
import { ScrollView } from "react-native-gesture-handler";

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
  const style: ViewStyle = {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.secondary,
  };

  const containerStyle: ViewStyle = {
    flex: 1,
    width: "100%",
  };

  return (
    <SafeAreaView style={style}>
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

      {footer && footer}
      <StatusBar textColor="dark" backgroundColor={colors.primary} />
    </SafeAreaView>
  );
};
