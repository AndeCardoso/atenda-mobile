import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import EquipmentService from "@services/equipment";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { requestStateEnum } from "app/constants/requestStates";
import { useToast } from "@hooks/useToast";
import { SuperConsole } from "@tools/indentedConsole";
import { GetEquipmentListRequestDTO } from "@services/equipment/dtos/request/GetEquipmentListRequestDTO";
import { equipmentStatusEnum } from "./constants";

export const useEquipmentsController = () => {
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const { params } = useRoute<any>();

  const isGeneralList = !Boolean(params?.customerId);

  const equipmentService = new EquipmentService();

  const [statusFilter, setStatusFilter] = useState<equipmentStatusEnum[]>();
  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const {
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
  } = useInfiniteQuery(
    ["equipments", equipmentSearch, params?.customerId, statusFilter],
    async ({ pageParam }) => {
      const dataParams: GetEquipmentListRequestDTO = {
        limit: 10,
        page: pageParam ?? 1,
        column: "nickname",
        order: "asc",
        search: equipmentSearch,
        searchType: params?.customerId ? "nickname" : "customerName",
        customerId: params?.customerId,
        statusFilter,
      };
      const { statusCode, body } = await equipmentService.list(dataParams);
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          setListState(requestStateEnum.EMPTY);
          return;
        case HttpStatusCode.BadRequest:
        default:
          setListState(requestStateEnum.ERROR);
          SuperConsole(body, "equipments");
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
        SuperConsole(error, "equipments");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const onEquipmentSearch = (value?: string) => {
    setEquipmentSearch(value ?? "");
  };

  const onFilterStatus = (value: equipmentStatusEnum) => {
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
    navigate(SignedInScreens.EQUIPMENTS_REGISTER_FORM, {
      customerId: params?.customerId,
    });
  };

  const handleGoToDetails = (equipmentId: number) => {
    navigate(SignedInScreens.EQUIPMENTS_DETAILS, {
      equipmentId,
      customerId: params?.customerId,
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("equipments");
    }, [])
  );

  const emptyStateTexts = {
    title:
      equipmentSearch || statusFilter
        ? "Nenhum equipamento encontrado"
        : "Ainda não há equipamentos para este cliente",
    subtitle: equipmentSearch
      ? undefined
      : statusFilter
      ? "Não há equipamentos com este status"
      : "Cadastre novos equipamentos",
    action: equipmentSearch
      ? {
          text: "Limpar busca",
          onPress: () => onEquipmentSearch(""),
        }
      : statusFilter
      ? {
          text: "Limpar filtro",
          onPress: () => onFilterStatus(),
        }
      : {
          text: "Cadastrar equipamento",
          onPress: handleGoToRegister,
        },
  };

  return {
    equipmentList: reducePages(data?.pages),
    textSearch: equipmentSearch,
    handleGoToRegister,
    onEquipmentSearch,
    handleGoToDetails,
    emptyStateTexts,
    onFilterStatus,
    fetchNextPage,
    handleGoBack,
    statusFilter:
      statusFilter && statusFilter.length > 0
        ? (statusFilter[0] as number)
        : undefined,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
      loadingNextPage: isFetchingNextPage,
      listState,
      isGeneralList,
    },
  };
};
