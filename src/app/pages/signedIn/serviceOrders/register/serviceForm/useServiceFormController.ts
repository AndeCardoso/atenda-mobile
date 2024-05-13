import { useNavigation } from "@react-navigation/native";
import { RegisterServiceOrderScreens } from "../../navigators";
import { useServiceOrderContext } from "@contexts/serviceOrder";
import { IServiceForm } from "../../schema";
import { IAddressModel } from "@model/entities/address";

export const useServiceFormController = () => {
  const { navigate, canGoBack, goBack } = useNavigation<any>();

  const { data, onSaveServiceForm, onSaveAddressForm } =
    useServiceOrderContext();

  const handleGoBack = () => {
    canGoBack && goBack();
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
    handleSaveForm,
    handleGoBack,
  };
};
