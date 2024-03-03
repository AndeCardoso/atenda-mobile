import React from "react";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { SignedOffScreens } from "./screens";
import { AuthPage } from "../pages/signedOff/auth";
import { PasswordRecoverPage } from "../pages/signedOff/passwordRecover";
import { RegisterUserPage } from "../pages/signedOff/registerUser";
import { SendRecoverTokenPage } from "@pages/signedOff/sendRecoverToken";

const SignedOff = createStackNavigator();

export const SignedOffNavigator = () => {
  return (
    <SignedOff.Navigator>
      <SignedOff.Group
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      >
        <SignedOff.Screen
          name={SignedOffScreens.AUTH}
          component={AuthPage}
          options={{
            headerShown: false,
          }}
        />
        <SignedOff.Screen
          name={SignedOffScreens.SEND_RECOVER_TOKEN}
          component={SendRecoverTokenPage}
          options={{
            headerShown: false,
          }}
        />
        <SignedOff.Screen
          name={SignedOffScreens.PASSWORD_RECOVER}
          component={PasswordRecoverPage}
          options={{
            headerShown: false,
          }}
        />
        <SignedOff.Screen
          name={SignedOffScreens.USER_REGISTER}
          component={RegisterUserPage}
          options={{
            headerShown: false,
          }}
        />
      </SignedOff.Group>
    </SignedOff.Navigator>
  );
};
