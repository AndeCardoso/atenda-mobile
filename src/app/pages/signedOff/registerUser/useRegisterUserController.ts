import { useNavigation } from "@react-navigation/native";
import { useUser } from "@hooks/connection/useUser";
import { IRegisterUserForm } from "./registerForm/formSchema";
import { HttpStatusCode } from "axios";

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
    if (res.statusCode === HttpStatusCode.Ok) {
      handleGoBack();
    }
  };

  return {
    handleRegister,
    handleGoBack,
    viewState: {
      loading: isLoadingRegister,
    },
  };
};
