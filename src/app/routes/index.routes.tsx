import React from "react";
import { useTheme } from "react-native-paper";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { Navigators } from "./screens";

import { SignedOffNavigator } from "./signedOff.routes";
import { SignedInNavigator } from "./signedIn.routes";
import { useAuthContext } from "@contexts/auth/useAuthContext";
import { StatusBar } from "@components/base/StatusBar";

const Stack = createStackNavigator();

export const AppRoutes = () => {
  const { token } = useAuthContext();
  const { colors } = useTheme();

  return (
    <>
      <StatusBar textColor="dark" backgroundColor={colors.primary} />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        {token !== null ? (
          <Stack.Screen
            name={Navigators.SIGNED_IN_NAVIGATOR}
            component={SignedInNavigator}
          />
        ) : (
          <Stack.Screen
            name={Navigators.SIGNED_OFF_NAVIGATOR}
            component={SignedOffNavigator}
            options={{ animationTypeForReplace: "pop" }}
          />
        )}
      </Stack.Navigator>
    </>
  );
};
