import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { SuperConsole } from "@tools/indentedConsole";
import { IRecoverPasswordForm } from "./recoverForm/formSchema";
import { useMutation } from "react-query";
import { RecoverPasswordRequestDTO } from "@services/auth/dtos/request/RecoverPasswordRequestDTO";
import { HttpStatusCode } from "axios";
import AuthService from "@services/auth";

export const usePasswordRecoverController = () => {
  const { navigate, goBack, canGoBack } = useNavigation<any>();
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
            SuperConsole(body);
            return;
        }
      },
      onError: async (error) => {
        console.log("error", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

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
      loading: isLoading,
    },
  };
};
