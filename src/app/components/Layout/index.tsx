import React, {
  MutableRefObject,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  View,
  ViewStyle,
} from "react-native";
import { Header } from "./Header";
import { StatusBar } from "../base/StatusBar";
import { ScrollView } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FooterContainer } from "./styles";
import { IStepperProps } from "@components/base/Stepper";
import { TIconNames } from "@components/base/Icon/types";

interface ILayoutProps extends PropsWithChildren {
  header?: string;
  footer?: ReactNode;
  hasBrand?: boolean;
  textSearch?: string;
  hasScroll?: boolean;
  showProfile?: boolean;
  steps?: IStepperProps;
  contextIcon?: TIconNames;
  searchPlaceholder?: string;
  onRegister?: () => void;
  onSearch?: (value?: string) => void;
  goBack?: () => void;
  close?: () => void;
  headerComponent?: ReactNode;
  scrollViewRef?: MutableRefObject<ScrollView | null>;
}

const ios = Platform.OS === "ios";

export const Layout = ({
  header,
  footer,
  hasBrand,
  hasScroll,
  showProfile,
  searchPlaceholder,
  contextIcon,
  textSearch,
  onRegister,
  onSearch,
  goBack,
  close,
  steps,
  children,
  scrollViewRef,
  headerComponent,
}: ILayoutProps) => {
  const { colors } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

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

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardWillShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardWillHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={ios ? "padding" : "height"} style={style}>
      <Header
        text={header}
        onSearch={onSearch}
        onRegister={onRegister}
        textSearch={textSearch}
        searchPlaceholder={searchPlaceholder}
        contextIcon={contextIcon}
        goBack={goBack}
        steps={steps}
        close={close}
        hasBrand={hasBrand}
        showProfile={showProfile}
        headerComponent={headerComponent}
      />

      {hasScroll ? (
        <ScrollView
          style={containerStyle}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={containerStyle}>{children}</View>
      )}

      {footer && (
        <FooterContainer paddingBottom={isKeyboardVisible ? 16 : bottom || 16}>
          {footer}
        </FooterContainer>
      )}
      <StatusBar textColor="dark" backgroundColor={colors.primary} />
    </KeyboardAvoidingView>
  );
};
