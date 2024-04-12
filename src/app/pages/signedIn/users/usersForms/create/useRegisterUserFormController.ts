import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { IUserForm } from "../schema";
import UserService from "@services/user";

export const useRegisterUserFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();

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
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body);
              return;
          }
        },
        onError: async (error) => {
          console.log("error - user register", JSON.stringify(error, null, 2));
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
