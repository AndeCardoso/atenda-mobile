import { useNavigation } from "@react-navigation/native";
import { IRegisterUserForm } from "./registerForm/formSchema";
import { HttpStatusCode } from "axios";
import UserService from "@services/user";
import { UserRegisterRequestDTO } from "@services/user/dtos/request/UserRegisterRequestDTO";
import { useMutation } from "react-query";
import { SuperConsole } from "@tools/indentedConsole";

export const useRegisterUserController = () => {
  const { goBack, canGoBack } = useNavigation<any>();

  const userService = new UserService();

  const { mutateAsync: mutateAsyncRegister, isLoading } = useMutation(
    ["userRegister"],
    async ({ name, email, password }: UserRegisterRequestDTO) =>
      await userService.register({ name, email, password }),
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
        console.log("error - userRegister", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

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
      loading: isLoading,
    },
  };
};
