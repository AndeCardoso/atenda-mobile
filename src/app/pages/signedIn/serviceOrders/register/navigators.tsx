import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { RegisterServiceOrderScreens } from "../navigators";

import { SelectCustomerPage } from "./selectCustomer";
import { SelectEquipmentPage } from "./selectEquipment";
import { ServiceFormPage } from "./serviceForm";
import { SelectTechnicianPage } from "./selectTechnician";
import { ServiceOrderRegisterReviewPage } from "./review";

import { ServiceOrderContextProvider } from "@contexts/serviceOrder";
import { CustomerValidationPage } from "./customerValidation";

export const ServiceOrderRegisterFlowNavigator = () => {
  type RootStackParamList = {
    [RegisterServiceOrderScreens.SELECT_CUSTOMER]: undefined;
    [RegisterServiceOrderScreens.SELECT_EQUIPMENT]: undefined;
    [RegisterServiceOrderScreens.SERVICE_FORM]: undefined;
    [RegisterServiceOrderScreens.SELECT_ADDRESS]: undefined;
    [RegisterServiceOrderScreens.SELECT_TECHNICIAN]: undefined;
    [RegisterServiceOrderScreens.REVIEW]: undefined;
    [RegisterServiceOrderScreens.CUSTOMER_VALIDATION]: undefined;
  };

  const { Navigator, Screen } = createStackNavigator<RootStackParamList>();
  return (
    <ServiceOrderContextProvider>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen
          name={RegisterServiceOrderScreens.SELECT_CUSTOMER}
          component={SelectCustomerPage}
        />
        <Screen
          name={RegisterServiceOrderScreens.SELECT_EQUIPMENT}
          component={SelectEquipmentPage}
        />
        <Screen
          name={RegisterServiceOrderScreens.SELECT_TECHNICIAN}
          component={SelectTechnicianPage}
        />
        <Screen
          name={RegisterServiceOrderScreens.SERVICE_FORM}
          component={ServiceFormPage}
        />
        <Screen
          name={RegisterServiceOrderScreens.REVIEW}
          component={ServiceOrderRegisterReviewPage}
        />
        <Screen
          name={RegisterServiceOrderScreens.CUSTOMER_VALIDATION}
          component={CustomerValidationPage}
        />
      </Navigator>
    </ServiceOrderContextProvider>
  );
};
