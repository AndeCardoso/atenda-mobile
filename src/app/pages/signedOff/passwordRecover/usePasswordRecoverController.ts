import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { SuperConsole } from "@tools/indentedConsole";
import { useAuth } from "@hooks/connection/useAuth";
import { IRecoverPasswordForm } from "./recoverForm/formSchema";

export const usePasswordRecoverController = () => {
  const { navigate, goBack, canGoBack } = useNavigation<any>();
  const {
    recoverPassword: {
      mutateAsync: mutateAsyncRecoverPassword,
      isLoading: isLoadingSendRecoverPassword,
    },
  } = useAuth();

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: IRecoverPasswordForm) => {
    // const res = await mutateAsyncRecoverPassword(values);
    SuperConsole(values);
    navigate(SignedOffScreens.AUTH);
  };

  return {
    handleRegister,
    handleGoBack,
    viewState: {
      loading: isLoadingSendRecoverPassword,
    },
  };
};
