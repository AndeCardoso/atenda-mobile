import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignedInNavigators, SignedInScreens } from "./screens";
import { HomePage } from "@pages/signedIn/home";
import { TransitionPresets } from "@react-navigation/stack";
import { TechniciansNavigator } from "@pages/signedIn/technicians/navigators";
import { UsersNavigator } from "@pages/signedIn/users/navigators";
import { CustomersNavigator } from "@pages/signedIn/customers/navigators";
import { EquipmentsNavigator } from "@pages/signedIn/equipment/navigators";

const SignedIn = createStackNavigator();

export const SignedInNavigator = () => {
  return (
    <SignedIn.Navigator>
      <SignedIn.Screen
        name={SignedInScreens.HOME}
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <SignedIn.Screen
        name={SignedInNavigators.USERS}
        component={UsersNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <SignedIn.Screen
        name={SignedInNavigators.TECHNICIANS}
        component={TechniciansNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <SignedIn.Screen
        name={SignedInNavigators.CUSTOMERS}
        component={CustomersNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
      <SignedIn.Screen
        name={SignedInNavigators.EQUIPMENTS}
        component={EquipmentsNavigator}
        options={{
          headerShown: false,
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
      />
    </SignedIn.Navigator>
  );
};
