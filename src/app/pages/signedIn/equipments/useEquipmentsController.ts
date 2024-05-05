import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import EquipmentService from "@services/equipment";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { requestStateEnum } from "app/constants/requestStates";
import { useToast } from "@hooks/useToast";

export const useEquipmentsController = () => {
  const { colors } = useTheme();
  const { createToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const { params } = useRoute<any>();
  const { customerId } = params;

  const equipmentService = new EquipmentService();

  const [equipmentSearch, setEquipmentSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const { data, refetch, fetchNextPage, isLoading, isRefetching } =
    useInfiniteQuery(
      ["equipments", equipmentSearch, customerId],
      async ({ pageParam }) => {
        const { statusCode, body } = await equipmentService.list({
          limit: 10,
          page: pageParam ?? 1,
          column: "nickname",
          order: "asc",
          search: equipmentSearch,
          customerId: customerId,
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

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const handleGoToRegister = () => {
    navigate(SignedInScreens.EQUIPMENTS_REGISTER_FORM, {
      customerId,
    });
  };

  const handleGoToDetails = (equipmentId: number) => {
    navigate(SignedInScreens.EQUIPMENTS_DETAILS, {
      equipmentId,
      customerId,
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
      queryClient.invalidateQueries("equipments");
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
    onEquipmentSearch,
    handleGoToDetails,
    emptyStateTexts,
    fetchNextPage,
    handleGoBack,
    fabActions,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
      listState,
    },
  };
};
