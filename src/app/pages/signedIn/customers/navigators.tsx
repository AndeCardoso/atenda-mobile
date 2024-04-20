import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignedInScreens } from "@routes/screens";
import { CustomersPage } from ".";
import { CustomerDetailPage } from "./details";
import { CustomerRegisterFormPage } from "./customerForms/create";
import { CustomerUpdateFormPage } from "./customerForms/update";

export const CustomersNavigator = () => {
  type RootStackParamList = {
    [SignedInScreens.CUSTOMERS]: undefined;
    [SignedInScreens.CUSTOMERS_REGISTER_FORM]: undefined;
    [SignedInScreens.CUSTOMERS_UPDATE_FORM]: undefined;
    [SignedInScreens.CUSTOMERS_DETAILS]: undefined;
  };

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={SignedInScreens.CUSTOMERS} component={CustomersPage} />
      <Screen
        name={SignedInScreens.CUSTOMERS_REGISTER_FORM}
        component={CustomerRegisterFormPage}
      />
      <Screen
        name={SignedInScreens.CUSTOMERS_UPDATE_FORM}
        component={CustomerUpdateFormPage}
      />
      <Screen
        name={SignedInScreens.CUSTOMERS_DETAILS}
        component={CustomerDetailPage}
      />
    </Navigator>
  );
};
