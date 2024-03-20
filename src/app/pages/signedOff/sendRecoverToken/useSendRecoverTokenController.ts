import { useNavigation } from "@react-navigation/native";
import { SignedOffScreens } from "@routes/screens";
import { SuperConsole } from "@tools/indentedConsole";
import { ISendRecoverTokenForm } from "./sendTokenForm/formSchema";
import { useAuth } from "@hooks/connection/useAuth";

export const useSendRecoverTokenController = () => {
  const { navigate, goBack, canGoBack } = useNavigation<any>();
  const {
    sendRecoverToken: {
      mutateAsync: mutateAsyncSendRecoverToken,
      isLoading: isLoadingSendRecoverToken,
    },
  } = useAuth();

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
      loading: isLoadingSendRecoverToken,
    },
  };
};
