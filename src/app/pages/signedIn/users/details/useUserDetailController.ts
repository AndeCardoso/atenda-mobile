import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback } from "react";
import UserService from "@services/user";
import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";

export const useUserDetailController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { unexpectedErrorToast } = useToast();
  const { params } = useRoute<any>();
  const { userId } = params;
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const userService = new UserService();

  const { data, isLoading } = useQuery(
    ["userDetails", userId],
    async () => {
      const { statusCode, body } = await userService.get({
        userId,
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          return;
        case HttpStatusCode.Unauthorized:
          logout();
          return;
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "userDetails");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "userDetails");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToUpdateUser = () => {
    navigate(SignedInScreens.USERS_UPDATE_FORM, {
      userId,
    });
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const fabActions = [
    {
      icon: "file-edit",
      label: "Atualizar cadastro",
      onPress: handleGoToUpdateUser,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("userDetails");
    }, [])
  );

  return {
    userData: data,
    handleGoBack,
    fabActions,
    viewState: {
      loading: isLoading,
    },
  };
};
