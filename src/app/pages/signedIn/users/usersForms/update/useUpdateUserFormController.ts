import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import UserService from "@services/user";
import { IUserForm } from "../schema";
import { useCallback } from "react";
import { useToast } from "@hooks/useToast";

export const useUpdateUserFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast } = useToast();
  const { params } = useRoute<any>();
  const { userId } = params;
  const queryClient = useQueryClient();

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
          SuperConsole(body, "getUserUpdate");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "getUserUpdate");
        unexpectedErrorToast();
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
              SuperConsole(body, "updateUser");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "updateUser");
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
    if (res.statusCode === HttpStatusCode.Ok) {
      handleGoBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("getUserUpdate");
    }, [])
  );

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
