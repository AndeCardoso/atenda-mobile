import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { requestStateEnum } from "app/constants/requestStates";
import { useToast } from "@hooks/useToast";
import ServiceOrderService from "@services/serviceOrder";
import { RegisterServiceOrderScreens } from "./navigators";

export const useServiceOrderController = () => {
  const { colors } = useTheme();
  const { createToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();

  const serviceOrderService = new ServiceOrderService();

  const [serviceOrderSearch, setServiceOrderSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const { data, refetch, fetchNextPage, isLoading, isRefetching } =
    useInfiniteQuery(
      ["serviceOrders", serviceOrderSearch],
      async ({ pageParam }) => {
        const { statusCode, body } = await serviceOrderService.list({
          limit: 10,
          page: pageParam ?? 1,
          column: "created_at",
          order: "desc",
          search: serviceOrderSearch,
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
          createToast({
            message: "Erro inesperado, tente novamente",
            alertType: "error",
          });
          return;
        },
      }
    );

  const onServiceOrderSearch = (value?: string) => {
    setServiceOrderSearch(value ?? "");
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToRegister = () => {
    navigate(SignedInScreens.SERVICE_ORDERS_REGISTER_FLOW, {
      screen: RegisterServiceOrderScreens.SELECT_CUSTOMER,
    });
  };

  const handleGoToDetails = (serviceOrderId: number) => {
    navigate(SignedInScreens.SERVICE_ORDERS_DETAILS, {
      serviceOrderId,
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("serviceOrders");
    }, [])
  );

  const emptyStateTexts = {
    title: serviceOrderSearch
      ? "Nenhuma ordem de serviço encontrado"
      : "Ainda não há ordem de serviços",
    subtitle: !serviceOrderSearch
      ? "Cadastre novas ordem de serviços"
      : undefined,
    action: serviceOrderSearch
      ? {
          text: "Limpar busca",
          onPress: () => onServiceOrderSearch(""),
        }
      : {
          text: "Cadastrar ordem de serviço",
          onPress: handleGoToRegister,
        },
  };

  return {
    serviceOrderList: reducePages(data?.pages),
    textSearch: serviceOrderSearch,
    onServiceOrderSearch,
    handleGoToRegister,
    handleGoToDetails,
    emptyStateTexts,
    fetchNextPage,
    handleGoBack,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
      listState,
    },
  };
};
