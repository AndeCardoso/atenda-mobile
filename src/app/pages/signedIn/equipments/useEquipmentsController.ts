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

export const useEquipmentsController = () => {
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const { params } = useRoute<any>();

  const equipmentService = new EquipmentService();

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
    ["equipments", equipmentSearch, params?.customerId],
    async ({ pageParam }) => {
      const dataParams: GetEquipmentListRequestDTO = {
        limit: 10,
        page: pageParam,
        column: "nickname",
        order: "asc",
        search: equipmentSearch,
        searchType: params?.customerId ? "nickname" : "customerName",
        customerId: params?.customerId,
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
    title: equipmentSearch
      ? "Nenhum equipamento encontrado"
      : "Ainda não há equipamentos para este cliente",
    subtitle: !equipmentSearch ? "Cadastre novos equipamentos" : undefined,
    action: equipmentSearch
      ? {
          text: "Limpar busca",
          onPress: () => onEquipmentSearch(""),
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
    fetchNextPage,
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
