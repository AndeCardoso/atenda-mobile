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

export const useSelectEquipmentController = () => {
  const { createToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const route = useRoute<any>();
  const { customerId } = route.params;

  const { onSelectEquipment } = useServiceOrderContext();

  const equipmentService = new EquipmentService();

  const [equipmentsSearch, setEquipmentSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const { data, refetch, fetchNextPage, isLoading, isRefetching } =
    useInfiniteQuery(
      ["equipments", equipmentsSearch],
      async ({ pageParam }) => {
        const { statusCode, body } = await equipmentService.list({
          limit: 10,
          page: pageParam ?? 1,
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

  const onEquipmentSearch = (value?: string) => {
    setEquipmentSearch(value ?? "");
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleSelect = (equipment: IEquipmentModel) => {
    onSelectEquipment(equipment);
    navigate(RegisterServiceOrderScreens.SERVICE_FORM);
  };

  const handleGoToRegister = () => {
    navigate(SignedInNavigators.EQUIPMENTS, {
      screen: SignedInScreens.EQUIPMENTS_REGISTER_FORM,
      params: { customerId },
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("equipments");
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
      listState,
    },
  };
};
