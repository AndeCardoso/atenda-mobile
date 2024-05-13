import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useInfiniteQuery, useQueryClient } from "react-query";
import TechnicianService from "@services/technician";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { useToast } from "@hooks/useToast";
import { requestStateEnum } from "app/constants/requestStates";
import { RegisterServiceOrderScreens } from "../../navigators";
import { useServiceOrderContext } from "@contexts/serviceOrder";
import { ITechnicianModel } from "@model/entities/technician";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";

export const useSelectTechnicianController = () => {
  const { createToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();

  const { onSelectTechnician } = useServiceOrderContext();

  const technicianService = new TechnicianService();

  const [techniciansSearch, setTechnicianSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const { data, refetch, fetchNextPage, isLoading, isRefetching } =
    useInfiniteQuery(
      ["technicians", techniciansSearch],
      async ({ pageParam }) => {
        const { statusCode, body } = await technicianService.list({
          limit: 10,
          page: pageParam ?? 1,
          column: "name",
          order: "asc",
          search: techniciansSearch,
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

  const onTechnicianSearch = (value?: string) => {
    setTechnicianSearch(value ?? "");
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleSelect = (technician: ITechnicianModel) => {
    onSelectTechnician(technician);
    navigate(RegisterServiceOrderScreens.REVIEW);
  };

  const handleGoToRegister = () => {
    navigate(SignedInNavigators.TECHNICIANS, {
      screen: SignedInScreens.TECHNICIANS_REGISTER_FORM,
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("technicians");
    }, [])
  );

  const emptyStateTexts = {
    title: techniciansSearch
      ? "Nenhum técnico encontrado"
      : "Ainda não há técnicos",
    subtitle: !techniciansSearch ? "Cadastre novos técnicos" : undefined,
    action: techniciansSearch
      ? {
          text: "Limpar busca",
          onPress: () => onTechnicianSearch(""),
        }
      : {
          text: "Cadastrar técnico",
          onPress: handleGoToRegister,
        },
  };

  return {
    technicianList: reducePages(data?.pages),
    textSearch: techniciansSearch,
    handleGoToRegister,
    onTechnicianSearch,
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