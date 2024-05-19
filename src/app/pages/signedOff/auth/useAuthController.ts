import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { IAuthForm } from "./loginForm/formSchema";
import { useMutation } from "react-query";
import { AuthenticationRequestDTO } from "@services/auth/dtos/request/AuthenticationRequestDTO";
import AuthService from "@services/auth";
import { HttpStatusCode } from "axios";
import { useAuthContext } from "@contexts/auth/useAuthContext";
import { useAuth } from "@hooks/useAuth";
import { useToast } from "@hooks/useToast";
import { SuperConsole } from "@tools/indentedConsole";

export const useAuthController = () => {
  const { navigate } = useNavigation<any>();
  const { changeTokenState } = useAuthContext();
  const { logout } = useAuth();
  const { unexpectedErrorToast } = useToast();

  const authService = new AuthService();

  const { mutateAsync: mutateAsyncAuth, isLoading: loadingAuth } = useMutation(
    ["authentication"],
    async ({ email, password }: AuthenticationRequestDTO) =>
      await authService.authentication({ email, password }),
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Ok:
            await changeTokenState(body.token);
            return body.token;
          case HttpStatusCode.BadRequest:
          case HttpStatusCode.Unauthorized:
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
    handleLogin,
    goToUserRegister,
    goToRecoverPassword,
    viewState: {
      loading: loadingAuth,
    },
  };
};
