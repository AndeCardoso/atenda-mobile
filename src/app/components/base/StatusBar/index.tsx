import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";

interface IStatusBarProps {
  textColor?: "dark" | "light" | "auto";
  backgroundColor?: string;
  hidden?: boolean;
}

export const StatusBar = ({
  textColor,
  backgroundColor,
  hidden,
}: IStatusBarProps) => {
  return !hidden ? (
    <>
      <ExpoStatusBar
        style={textColor ?? "dark"}
        backgroundColor={backgroundColor}
        networkActivityIndicatorVisible
      />
      <SafeAreaView style={{ flex: 0, backgroundColor: backgroundColor }} />
    </>
  ) : null;
};
