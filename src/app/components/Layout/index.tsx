import React, { PropsWithChildren, ReactNode } from "react";
import { SafeAreaView, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { Header } from "./Header";
import { StatusBar } from "../base/StatusBar";
import { ScrollView } from "react-native-gesture-handler";

interface ILayoutProps extends PropsWithChildren {
  header?: string;
  footer?: ReactNode;
  hasScroll?: boolean;
  goBack?: () => void;
  close?: () => void;
}

export const Layout = ({
  header,
  footer,
  hasScroll,
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

  return (
    <SafeAreaView style={style}>
      {header && <Header text={header} goBack={goBack} close={close} />}

      {hasScroll ? (
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={{ width: "100%", flex: 1 }}>{children}</View>
      )}

      {footer && footer}
      <StatusBar textColor="dark" backgroundColor={colors.primary} />
    </SafeAreaView>
  );
};
