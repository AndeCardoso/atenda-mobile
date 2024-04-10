import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { IAuthForm } from "./loginForm/formSchema";
import { useMutation } from "react-query";
import { AuthenticationRequestDTO } from "@services/auth/dtos/request/AuthenticationRequestDTO";
import AuthService from "@services/auth";
import { HttpStatusCode } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncAuthEnum } from "@model/asyncStorage/auth";
import { useAuthContext } from "@contexts/auth/useAuthContext";
import { SuperConsole } from "@tools/indentedConsole";
import { useAuth } from "@hooks/useAuth";

export const useAuthController = () => {
  const { navigate } = useNavigation<any>();
  const { changeTokenState } = useAuthContext();
  const { logout } = useAuth();
  const authService = new AuthService();

  const { mutateAsync: mutateAsyncAuth, isLoading: loadingAuth } = useMutation(
    ["authentication"],
    async ({ email, password }: AuthenticationRequestDTO) =>
      await authService.authentication({ email, password }),
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Ok:
            await AsyncStorage.setItem(AsyncAuthEnum.TOKEN, body.token);
            changeTokenState(body.token);
            return body.token;
          case HttpStatusCode.Unauthorized:
          default:
            SuperConsole(body);
            return;
        }
      },
      onError: async (error) => {
        console.log("error", JSON.stringify(error, null, 2));
        logout();
        return;
      },
    }
  );

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
