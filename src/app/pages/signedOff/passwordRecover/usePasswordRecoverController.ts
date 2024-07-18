import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { IRecoverPasswordForm } from "./recoverForm/formSchema";
import { useMutation } from "react-query";
import { RecoverPasswordRequestDTO } from "@services/auth/dtos/request/RecoverPasswordRequestDTO";
import { HttpStatusCode } from "axios";
import AuthService from "@services/auth";
import { useToast } from "@hooks/useToast";
import { SuperConsole } from "@tools/indentedConsole";

export const usePasswordRecoverController = () => {
  const { navigate, goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast } = useToast();

  const authService = new AuthService();

  const { mutateAsync: mutateAsyncRecoverPassword, isLoading } = useMutation(
    ["recoverPassword"],
    async ({ email, password, token }: RecoverPasswordRequestDTO) =>
      await authService.recoverPassword({ email, password, token }),
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Ok:
            return body;
          case HttpStatusCode.BadRequest:
          default:
            SuperConsole(body, "recoverPassword");
            unexpectedErrorToast();
            return;
        }
      },
      onError: async (error) => {
        SuperConsole(error, "recoverPassword");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: IRecoverPasswordForm) => {
    const res = await mutateAsyncRecoverPassword(values);
    if (res.statusCode === HttpStatusCode.Ok) navigate(SignedOffScreens.AUTH);
  };

  return {
    handleRegister,
    handleGoBack,
    viewState: {
      loading: isLoading,
    },
  };
};
