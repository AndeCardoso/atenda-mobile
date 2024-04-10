import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { SuperConsole } from "@tools/indentedConsole";
import { ISendRecoverTokenForm } from "./sendTokenForm/formSchema";
import { useMutation } from "react-query";
import { SendRecoverTokenRequestDTO } from "@services/auth/dtos/request/SendRecoverTokenRequestDTO";
import AuthService from "@services/auth";
import { HttpStatusCode } from "axios";

export const useSendRecoverTokenController = () => {
  const { navigate, goBack, canGoBack } = useNavigation<any>();
  const authService = new AuthService();

  const { mutateAsync: mutateAsyncSendRecoverToken, isLoading } = useMutation(
    ["sendRecover"],
    async ({ email }: SendRecoverTokenRequestDTO) =>
      await authService.sendRecoverToken({ email }),
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

  const handleRegister = async (values: ISendRecoverTokenForm) => {
    // const res = await mutateAsyncSendRecoverToken(values);
    SuperConsole(values);
    navigate(SignedOffScreens.PASSWORD_RECOVER);
  };

  return {
    handleRegister,
    handleGoBack,
    viewState: {
      loading: isLoading,
    },
  };
};
