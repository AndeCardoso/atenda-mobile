import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignedInScreens } from "@routes/screens";
import { EquipmentsPage } from ".";
import { EquipmentDetailPage } from "./details";
import { EquipmentRegisterFormPage } from "./equipmentForms/create";
import { EquipmentUpdateFormPage } from "./equipmentForms/update";

export const EquipmentsNavigator = () => {
  type RootStackParamList = {
    [SignedInScreens.EQUIPMENTS]: undefined;
    [SignedInScreens.EQUIPMENTS_REGISTER_FORM]: undefined;
    [SignedInScreens.EQUIPMENTS_UPDATE_FORM]: undefined;
    [SignedInScreens.EQUIPMENTS_DETAILS]: undefined;
  };

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={SignedInScreens.EQUIPMENTS} component={EquipmentsPage} />
      <Screen
        name={SignedInScreens.EQUIPMENTS_REGISTER_FORM}
        component={EquipmentRegisterFormPage}
      />
      <Screen
        name={SignedInScreens.EQUIPMENTS_UPDATE_FORM}
        component={EquipmentUpdateFormPage}
      />
      <Screen
        name={SignedInScreens.EQUIPMENTS_DETAILS}
        component={EquipmentDetailPage}
      />
    </Navigator>
  );
};
