import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import UserService from "@services/user";
import { IUserForm } from "../schema";

export const useUpdateUserFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { userId } = params;
  const userService = new UserService();

  const { data: userData, isLoading: dataLoading } = useQuery(
    ["getUserUpdate", userId],
    async () => {
      const { statusCode, body } = await userService.get({
        userId,
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body);
          return;
      }
    },
    {
      onError: async (error) => {
        console.log("error - user id", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["updateUser"],
      async (data: IUserForm) => {
        return await userService.update(userId, data);
      },
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
          console.log("error - user update", JSON.stringify(error, null, 2));
          return;
        },
      }
    );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: IUserForm) => {
    const res = await mutateAsyncRegister(values);
    if (res.statusCode === HttpStatusCode.Ok) {
      handleGoBack();
    }
  };

  return {
    userData,
    handleRegister,
    handleGoBack,
    viewState: {
      registerLoading,
      dataLoading,
    },
  };
};
