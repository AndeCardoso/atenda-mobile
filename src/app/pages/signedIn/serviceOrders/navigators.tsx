import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SignedInScreens } from "@routes/screens";
import { ServiceOrdersPage } from ".";
import { ServiceOrderDetailPage } from "./details";
import { ServiceOrderUpdateFormPage } from "./update";
import { ServiceOrderRegisterFlowNavigator } from "./register/navigators";
import { ReportPage } from "./report";

export enum RegisterServiceOrderScreens {
  SELECT_CUSTOMER = "SelectCustomer",
  SELECT_EQUIPMENT = "SelectEquipment",
  SERVICE_FORM = "ServiceForm",
  SELECT_ADDRESS = "SelectAddress",
  SELECT_TECHNICIAN = "SelectTechnician",
  REVIEW = "Review",
  CUSTOMER_VALIDATION = "CustomerValidation",
}

export const ServiceOrdersNavigator = () => {
  type RootStackParamList = {
    [SignedInScreens.SERVICE_ORDERS]: undefined;
    [SignedInScreens.SERVICE_ORDERS_REGISTER_FLOW]: undefined;
    [SignedInScreens.SERVICE_ORDERS_UPDATE_FORM]: undefined;
    [SignedInScreens.SERVICE_ORDERS_DETAILS]: undefined;
    [SignedInScreens.SERVICE_ORDERS_REPORT]: undefined;
  };

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen
        name={SignedInScreens.SERVICE_ORDERS}
        component={ServiceOrdersPage}
      />
      <Screen
        name={SignedInScreens.SERVICE_ORDERS_REGISTER_FLOW}
        component={ServiceOrderRegisterFlowNavigator}
      />
      <Screen
        name={SignedInScreens.SERVICE_ORDERS_UPDATE_FORM}
        component={ServiceOrderUpdateFormPage}
      />
      <Screen
        name={SignedInScreens.SERVICE_ORDERS_DETAILS}
        component={ServiceOrderDetailPage}
      />
      <Screen
        name={SignedInScreens.SERVICE_ORDERS_REPORT}
        component={ReportPage}
      />
    </Navigator>
  );
};
