import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { IUserForm } from "../schema";
import UserService from "@services/user";
import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";

export const useRegisterUserFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast, createToast } = useToast();
  const { logout } = useAuth();

  const userService = new UserService();

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["userRegister"],
      async (data: IUserForm) => {
        return await userService.register(data);
      },
      {
        onSuccess: async ({ statusCode, body }) => {
          switch (statusCode) {
            case HttpStatusCode.Created:
              return body;
            case HttpStatusCode.Unauthorized:
              logout();
              return;
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body, "userRegister");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "userRegister");
          unexpectedErrorToast();
          return;
        },
      }
    );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: IUserForm) => {
    const res = await mutateAsyncRegister(values);
    if (res.statusCode === HttpStatusCode.Created) {
      createToast({
        message: "Usuário cadastrado com sucesso",
        alertType: "success",
      });
      handleGoBack();
    }
  };

  return {
    handleRegister,
    handleGoBack,
    viewState: {
      registerLoading,
    },
  };
};
