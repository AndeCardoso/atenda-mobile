import { colors } from "@global/styles/colors";
import { MD3DarkTheme as DefaultTheme, MD3Theme } from "react-native-paper";

export const theme: MD3Theme = {
  ...DefaultTheme,
  mode: "exact",
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.PRIMARY,
    secondary: colors.SECONDARY,
    surfaceDisabled: colors.SECONDARY_INACTIVE,
    ...colors,
  },
};

export const StyledThemes = {
  title: "default",
  colors: {
    ...colors,
  },
};
