import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import TechnicianService from "@services/technician";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { requestStateEnum } from "app/constants/requestStates";
import { useToast } from "@hooks/useToast";

export const useTechniciansController = () => {
  const { createToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();

  const technicianService = new TechnicianService();

  const [technicianSearch, setTechnicianSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const { data, refetch, fetchNextPage, isLoading, isRefetching } =
    useInfiniteQuery(
      ["technicians", technicianSearch],
      async ({ pageParam }) => {
        const { statusCode, body } = await technicianService.list({
          limit: 10,
          page: pageParam ?? 1,
          column: "name",
          order: "asc",
          search: technicianSearch,
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

  const handleGoToRegister = () => {
    navigate(SignedInScreens.TECHNICIANS_REGISTER_FORM);
  };

  const handleGoToDetails = (technicianId: number) => {
    navigate(SignedInScreens.TECHNICIANS_DETAILS, {
      technicianId,
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("technicians");
    }, [])
  );

  const emptyStateTexts = {
    title: technicianSearch
      ? "Nenhum técnico encontrado"
      : "Ainda não há clientes",
    subtitle: !technicianSearch ? "Cadastre novos clientes" : undefined,
    action: technicianSearch
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
    textSearch: technicianSearch,
    onTechnicianSearch,
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
