import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import EquipmentService from "@services/equipment";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { useToast } from "@hooks/useToast";
import { requestStateEnum } from "app/constants/requestStates";
import { RegisterServiceOrderScreens } from "../../navigators";
import { useServiceOrderContext } from "@contexts/serviceOrder";
import { IEquipmentModel } from "@model/entities/equipment";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { SuperConsole } from "@tools/indentedConsole";

export const useSelectEquipmentController = () => {
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const route = useRoute<any>();
  const { customerId } = route.params;

  const { onSelectEquipment } = useServiceOrderContext();

  const equipmentService = new EquipmentService();

  const [abandomentOpenModalState, setAbandomentOpenModalState] =
    useState(false);
  const [equipmentsSearch, setEquipmentSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const {
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
  } = useInfiniteQuery(
    ["equipments", equipmentsSearch],
    async ({ pageParam }) => {
      const { statusCode, body } = await equipmentService.list({
        limit: 10,
        page: pageParam,
        column: "nickname",
        order: "asc",
        search: equipmentsSearch,
        customerId,
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

  const onAbandomentModalToggle = () => {
    setAbandomentOpenModalState(!abandomentOpenModalState);
  };

  const handleConfirmAbandonment = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS,
    });
  };

  const handleSelect = (equipment: IEquipmentModel) => {
    onSelectEquipment(equipment);
    navigate(RegisterServiceOrderScreens.SELECT_TECHNICIAN);
  };

  const handleGoToRegister = () => {
    navigate(SignedInNavigators.EQUIPMENTS, {
      screen: SignedInScreens.EQUIPMENTS_REGISTER_FORM,
      params: { customerId },
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("equipments");
    }, [])
  );

  const emptyStateTexts = {
    title: equipmentsSearch
      ? "Nenhum equipamento encontrado"
      : "Ainda não há equipamentos",
    subtitle: !equipmentsSearch ? "Cadastre novos equipamentos" : undefined,
    action: equipmentsSearch
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
    textSearch: equipmentsSearch,
    handleConfirmAbandonment,
    onAbandomentModalToggle,
    handleGoToRegister,
    onEquipmentSearch,
    emptyStateTexts,
    fetchNextPage,
    handleGoBack,
    handleSelect,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
      loadingNextPage: isFetchingNextPage,
      listState,
      abandomentOpenModalState,
    },
  };
};
