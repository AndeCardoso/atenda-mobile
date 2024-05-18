import { useNavigation } from "@react-navigation/native";
import { RegisterServiceOrderScreens } from "../../navigators";
import { useServiceOrderContext } from "@contexts/serviceOrder";
import { IServiceForm } from "../../schema";
import { IAddressModel } from "@model/entities/address";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { useState } from "react";

export const useServiceFormController = () => {
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { data, onSaveServiceForm, onSaveAddressForm } =
    useServiceOrderContext();

  const [abandomentOpenModalState, setAbandomentOpenModalState] =
    useState(false);

  const onAbandomentModalToggle = () => {
    setAbandomentOpenModalState(!abandomentOpenModalState);
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleConfirmAbandonment = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS,
    });
  };

  const handleSaveForm = ({
    serviceForm,
    addressForm,
  }: {
    serviceForm: IServiceForm;
    addressForm: IAddressModel;
  }) => {
    onSaveServiceForm(serviceForm);
    onSaveAddressForm(addressForm);
    navigate(RegisterServiceOrderScreens.SELECT_TECHNICIAN);
  };

  return {
    addressList: data?.customer.addresses,
    handleConfirmAbandonment,
    onAbandomentModalToggle,
    handleSaveForm,
    handleGoBack,
    viewState: {
      abandomentOpenModalState,
    },
  };
};
