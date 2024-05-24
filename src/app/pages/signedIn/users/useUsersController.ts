import { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import UserService from "@services/user";
import { reducePages } from "@utils/reducePages";
import { requestStateEnum } from "app/constants/requestStates";
import { useToast } from "@hooks/useToast";
import { SuperConsole } from "@tools/indentedConsole";

export const useUsersController = () => {
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { unexpectedErrorToast } = useToast();
  const queryClient = useQueryClient();

  const userService = new UserService();

  const [userSearch, setUserSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const {
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
  } = useInfiniteQuery(
    ["users", userSearch],
    async ({ pageParam }) => {
      const { statusCode, body } = await userService.list({
        limit: 10,
        page: pageParam,
        column: "name",
        order: "asc",
        search: userSearch,
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          setListState(requestStateEnum.EMPTY);
          return;
        case HttpStatusCode.BadRequest:
        default:
          setListState(requestStateEnum.ERROR);
          SuperConsole(body, "users");
          unexpectedErrorToast();
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
        SuperConsole(error, "users");
        unexpectedErrorToast();
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

  const handleGoToRegister = () => {
    navigate(SignedInScreens.USERS_REGISTER_FORM);
  };

  const handleGoToDetails = (userId: number) => {
    navigate(SignedInScreens.USERS_DETAILS, {
      userId,
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("users");
    }, [])
  );

  return {
    userList: reducePages(data?.pages),
    handleGoToRegister,
    handleGoToDetails,
    fetchNextPage,
    onUserSearch,
    handleGoBack,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
      loadingNextPage: isFetchingNextPage,
      listState,
    },
  };
};
