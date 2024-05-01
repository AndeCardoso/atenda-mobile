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

export const useEquipmentsController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const { params } = useRoute<any>();
  const { customerId } = params;

  const equipmentService = new EquipmentService();

  const [equipmentSearch, setEquipmentSearch] = useState("");

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
          console.log("error - equipments", JSON.stringify(error, null, 2));
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

  return {
    equipmentList: reducePages(data?.pages),
    onEquipmentSearch,
    handleGoToDetails,
    handleGoBack,
    fetchNextPage,
    fabActions,
    refetch,
    viewState: {
      loading: isLoading,
      reloading: isRefetching,
    },
  };
};
