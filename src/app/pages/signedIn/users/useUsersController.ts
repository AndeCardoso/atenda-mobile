import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback, useState } from "react";
import UserService from "@services/user";
import { IPaginationResponse } from "@model/http/paginationRequest";
import { UserGetResponseDTO } from "@services/user/dtos/response/UserGetResponseDTO";

export const useUsersController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();

  const userService = new UserService();

  const [userSearch, setUserSearch] = useState("");

  const { data, refetch, isLoading, isRefetching } = useInfiniteQuery(
    ["users", userSearch],
    async ({ pageParam }) => {
      const { statusCode, body } = await userService.list({
        limit: 10,
        page: pageParam ?? 1,
        column: "name",
        order: "asc",
        search: userSearch,
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
      getNextPageParam: (lastPage) => {
        if (lastPage)
          return lastPage?.currentPage < lastPage?.totalPages
            ? lastPage?.currentPage + 1
            : undefined;
      },
      onError: async (error) => {
        console.log("error - user", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const onUserSearch = (value?: string) => {
    setUserSearch(value ?? "");
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const handleGoToRegister = () => {
    navigate(SignedInScreens.USERS_REGISTER_FORM);
  };

  const handleGoToDetails = (userId: number) => {
    navigate(SignedInScreens.USERS_DETAILS, {
      userId,
    });
  };

  const fabActions = [
    {
      icon: "plus",
      label: "Cadastrar",
      onPress: handleGoToRegister,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("users");
    }, [])
  );

  return {
    userList: data?.pages.reduce((acc: any, cur) => {
      if (acc.length > 0) {
        return [...acc?.data.concat(cur?.data)];
      }
      return cur?.data;
    }, []),
    onUserSearch,
    handleGoToDetails,
    handleGoBack,
    fabActions,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
    },
  };
};
