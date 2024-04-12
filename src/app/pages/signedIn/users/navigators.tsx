import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignedInScreens } from "@routes/screens";
import { UsersPage } from ".";
import { UserDetailPage } from "./details";
import { UserRegisterFormPage } from "./usersForms/create";
import { UserUpdateFormPage } from "./usersForms/update";

export const UsersNavigator = () => {
  type RootStackParamList = {
    [SignedInScreens.USERS]: undefined;
    [SignedInScreens.USERS_REGISTER_FORM]: undefined;
    [SignedInScreens.USERS_UPDATE_FORM]: undefined;
    [SignedInScreens.USERS_DETAILS]: undefined;
  };

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={SignedInScreens.USERS} component={UsersPage} />
      <Screen
        name={SignedInScreens.USERS_REGISTER_FORM}
        component={UserRegisterFormPage}
      />
      <Screen
        name={SignedInScreens.USERS_UPDATE_FORM}
        component={UserUpdateFormPage}
      />
      <Screen name={SignedInScreens.USERS_DETAILS} component={UserDetailPage} />
    </Navigator>
  );
};
