import { useServiceOrderContext } from "@contexts/serviceOrder";
import { useNavigation } from "@react-navigation/native";
import { RegisterServiceOrderScreens } from "../../navigators";
import { SignedInNavigators } from "@routes/screens";

export const useServiceOrderRegisterReview = () => {
  const { navigate } = useNavigation<any>();

  const { data } = useServiceOrderContext();

  const handleGoToCustomerValidation = () => {
    navigate(RegisterServiceOrderScreens.CUSTOMER_VALIDATION);
  };

  const handleAbbandon = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS);
  };

  return {
    data,
    handleAbbandon,
    handleGoToCustomerValidation,
  };
};
