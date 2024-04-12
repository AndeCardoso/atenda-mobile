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

export const useUserDetailController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { userId } = params;
  const queryClient = useQueryClient();

  const userService = new UserService();

  const { data, isLoading } = useQuery(
    ["userDetail", userId],
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
        console.log("error - users", JSON.stringify(error, null, 2));
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

  const handleServiceOrderReport = () => {
    console.log("report");
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const fabActions = [
    {
      icon: "file-edit",
      label: "Editar cadastro",
      onPress: handleGoToUpdateUser,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("userDetail");
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
