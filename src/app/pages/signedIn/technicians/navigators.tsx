import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignedInScreens } from "@routes/screens";
import { TechniciansPage } from ".";
import { TechnicianDetailPage } from "./details";
import { TechnicianRegisterFormPage } from "./technicianForms/create";
import { TechnicianUpdateFormPage } from "./technicianForms/update";

export const TechniciansNavigator = () => {
  type RootStackParamList = {
    [SignedInScreens.TECHNICIANS]: undefined;
    [SignedInScreens.TECHNICIANS_REGISTER_FORM]: undefined;
    [SignedInScreens.TECHNICIANS_UPDATE_FORM]: undefined;
    [SignedInScreens.TECHNICIANS_DETAILS]: undefined;
  };

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={SignedInScreens.TECHNICIANS} component={TechniciansPage} />
      <Screen
        name={SignedInScreens.TECHNICIANS_REGISTER_FORM}
        component={TechnicianRegisterFormPage}
      />
      <Screen
        name={SignedInScreens.TECHNICIANS_UPDATE_FORM}
        component={TechnicianUpdateFormPage}
      />
      <Screen
        name={SignedInScreens.TECHNICIANS_DETAILS}
        component={TechnicianDetailPage}
      />
    </Navigator>
  );
};
