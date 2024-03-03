import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { useUser } from "@hooks/connection/useUser";
import { SuperConsole } from "@tools/indentedConsole";
import { IRegisterUserForm } from "./registerForm/formSchema";

export const useRegisterUserController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const {
    register: {
      mutateAsync: mutateAsyncRegister,
      isLoading: isLoadingRegister,
    },
  } = useUser();

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: IRegisterUserForm) => {
    const res = await mutateAsyncRegister(values);
    SuperConsole(res);
    handleGoBack();
  };

  return {
    handleRegister,
    handleGoBack,
    viewState: {
      loading: isLoadingRegister,
    },
  };
};
