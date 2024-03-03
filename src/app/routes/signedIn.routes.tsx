import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Navigators, SignedInScreens } from "./screens";
import { HomeScreen } from "@pages/signedIn/home";

const SignedIn = createStackNavigator();

export const SignedInNavigator = () => {
  return (
    <SignedIn.Navigator>
      {/* <SignedIn.Screen
        name={Navigators.TAB_NAVIGATOR}
        options={{
          headerShown: false,
        }}
      >
        {(props) => <TabNavigator {...props} />}
      </SignedIn.Screen> */}
      <SignedIn.Screen
        name={SignedInScreens.HOME}
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
    </SignedIn.Navigator>
  );
};
