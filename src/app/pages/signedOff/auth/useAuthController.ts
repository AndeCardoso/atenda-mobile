import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { IAuthForm } from "./loginForm/formSchema";
import { useAuth } from "@hooks/connection/useAuth";

export const useAuthController = () => {
  const { navigate } = useNavigation<any>();
  const {
    authentication: { mutateAsync: mutateAsyncAuth, isLoading: loadingAuth },
  } = useAuth();

  const handleLogin = async (authValues: IAuthForm) => {
    await mutateAsyncAuth(authValues);
  };

  const goToUserRegister = () => {
    navigate(SignedOffScreens.USER_REGISTER);
  };

  const goToRecoverPassword = () => {
    navigate(SignedOffScreens.SEND_RECOVER_TOKEN);
  };

  return {
    handleLogin,
    goToUserRegister,
    goToRecoverPassword,
    viewState: {
      loading: loadingAuth,
    },
  };
};
