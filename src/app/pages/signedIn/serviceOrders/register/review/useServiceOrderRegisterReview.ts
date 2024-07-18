import { useServiceOrderContext } from "@contexts/serviceOrder";
import { useNavigation } from "@react-navigation/native";
import { RegisterServiceOrderScreens } from "../../navigators";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { useState } from "react";

export const useServiceOrderRegisterReview = () => {
  const { navigate, canGoBack, goBack } = useNavigation<any>();

  const { data } = useServiceOrderContext();

  const [abandomentOpenModalState, setAbandomentOpenModalState] =
    useState(false);

  const onAbandomentModalToggle = () => {
    setAbandomentOpenModalState(!abandomentOpenModalState);
  };

  const handleConfirmAbandonment = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS,
    });
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToCustomerValidation = () => {
    navigate(RegisterServiceOrderScreens.CUSTOMER_VALIDATION);
  };

  return {
    data,
    handleGoBack,
    onAbandomentModalToggle,
    handleConfirmAbandonment,
    handleGoToCustomerValidation,
    viewState: {
      abandomentOpenModalState,
    },
  };
};
