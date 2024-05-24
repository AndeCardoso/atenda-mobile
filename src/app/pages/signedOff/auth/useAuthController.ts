import { useState } from "react";
import { HttpStatusCode } from "axios";
import { useMutation } from "react-query";
import { IAuthForm } from "./loginForm/schema";
import { SignedOffScreens } from "@routes/screens";
import { useNavigation } from "@react-navigation/native";
import { AuthenticationRequestDTO } from "@services/auth/dtos/request/AuthenticationRequestDTO";
import { useAuthContext } from "@contexts/auth/useAuthContext";
import { SuperConsole } from "@tools/indentedConsole";
import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";
import AuthService from "@services/auth";

export const useAuthController = () => {
  const { navigate } = useNavigation<any>();
  const { changeTokenState } = useAuthContext();
  const { logout } = useAuth();
  const { unexpectedErrorToast } = useToast();

  const authService = new AuthService();

  const [alertState, setAlertState] = useState("");
  const [loginErrorState, setLoginErrorState] = useState("");

  const { mutateAsync: mutateAsyncAuth, isLoading: loadingAuth } = useMutation(
    ["authentication"],
    async ({ email, password }: AuthenticationRequestDTO) =>
      await authService.authentication({ email, password }),
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Ok:
            changeTokenState(body.token);
            return body.token;
          case HttpStatusCode.Unauthorized:
            setLoginErrorState(body.message);
            return;
          case HttpStatusCode.Forbidden:
            setAlertState(body.message);
            return;
          case HttpStatusCode.BadRequest:
          default:
            SuperConsole(body, "authentication");
            unexpectedErrorToast();
            return;
        }
      },
      onError: async (error) => {
        SuperConsole(error, "authentication");
        unexpectedErrorToast();
        logout();
        return;
      },
    }
  );

  const onClearAlert = () => {
    setAlertState("");
    setLoginErrorState("");
  };

  const handleLogin = async (authValues: IAuthForm) => {
    await mutateAsyncAuth(authValues);
  };

  const goToUserRegister = () => {
    navigate(SignedOffScreens.COMPANY_REGISTER);
  };

  const goToRecoverPassword = () => {
    navigate(SignedOffScreens.SEND_RECOVER_TOKEN);
  };

  return {
    alertState,
    handleLogin,
    onClearAlert,
    loginErrorState,
    goToUserRegister,
    goToRecoverPassword,
    viewState: {
      loading: loadingAuth,
    },
  };
};
