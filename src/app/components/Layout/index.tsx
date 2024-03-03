import React, { PropsWithChildren, ReactNode } from "react";
import { SafeAreaView, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import { Header } from "./Header";
import { StatusBar } from "../base/StatusBar";

interface ILayoutProps extends PropsWithChildren {
  header?: string;
  footer?: ReactNode;
  goBack?: () => void;
  close?: () => void;
}

export const Layout = ({
  header,
  footer,
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

      {children}

      {footer && footer}
      <StatusBar textColor="dark" backgroundColor={colors.primary} />
    </SafeAreaView>
  );
};
