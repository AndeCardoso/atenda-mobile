import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { requestStateEnum } from "app/constants/requestStates";
import { useToast } from "@hooks/useToast";
import ServiceOrderService from "@services/serviceOrder";
import { RegisterServiceOrderScreens } from "./navigators";
import { SuperConsole } from "@tools/indentedConsole";
import { serviceOrderStatusEnum } from "./constants";
import { useAuth } from "@hooks/useAuth";

export const useServiceOrderController = () => {
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const { params } = useRoute<any>();
  const id = params?.id;
  const filteredBy = params?.filteredBy;

  const serviceOrderService = new ServiceOrderService();

  const [statusFilter, setStatusFilter] = useState<serviceOrderStatusEnum[]>();
  const [serviceOrderSearch, setServiceOrderSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const {
    data,
    refetch,
    fetchNextPage,
    isLoading,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["serviceOrders", serviceOrderSearch, id, filteredBy, statusFilter],
    async ({ pageParam }) => {
      const { statusCode, body } = await serviceOrderService.list({
        limit: 10,
        page: pageParam ?? 1,
        column: "created_at",
        order: "desc",
        search: serviceOrderSearch,
        [filteredBy]: id,
        statusFilter,
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          setListState(requestStateEnum.EMPTY);
          return;
        case HttpStatusCode.Unauthorized:
          logout();
          return;
        case HttpStatusCode.BadRequest:
        default:
          setListState(requestStateEnum.ERROR);
          SuperConsole(body, "serviceOrders");
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
        SuperConsole(error, "serviceOrders");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const onServiceOrderSearch = (value?: string) => {
    setServiceOrderSearch(value ?? "");
  };

  const onFilterStatus = (value: serviceOrderStatusEnum) => {
    if (statusFilter && statusFilter?.length > 0 && value === statusFilter[0]) {
      setStatusFilter(undefined);
    } else {
      setStatusFilter([value]);
    }
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
      queryClient.resetQueries("serviceOrders");
    }, [])
  );

  const emptyStateTexts = {
    title:
      serviceOrderSearch || statusFilter
        ? "Nenhuma O.S. encontrada"
        : "Ainda não há ordem de serviços",
    subtitle: serviceOrderSearch
      ? undefined
      : statusFilter
      ? "Não há O.S. com este status"
      : "Cadastre novas ordens de serviço",
    action: serviceOrderSearch
      ? {
          text: "Limpar busca",
          onPress: () => onServiceOrderSearch(""),
        }
      : statusFilter
      ? {
          text: "Limpar filtro",
          onPress: () => onFilterStatus(),
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
    onFilterStatus,
    fetchNextPage,
    statusFilter:
      statusFilter && statusFilter.length > 0
        ? (statusFilter[0] as number)
        : undefined,
    handleGoBack,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
      loadingNextPage: isFetchingNextPage,
      showNewRegisterButton: !Boolean(params),
      listState,
    },
  };
};
