import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import TechnicianService from "@services/technician";
import { HttpStatusCode } from "axios";
import { useCallback, useState } from "react";
import { reducePages } from "@utils/reducePages";
import { requestStateEnum } from "app/constants/requestStates";
import { useToast } from "@hooks/useToast";
import { SuperConsole } from "@tools/indentedConsole";
import { technicianStatusEnum } from "./constants";
import { useAuth } from "@hooks/useAuth";

export const useTechniciansController = () => {
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const technicianService = new TechnicianService();

  const [statusFilter, setStatusFilter] = useState<technicianStatusEnum[]>();
  const [technicianSearch, setTechnicianSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();

  const {
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
  } = useInfiniteQuery(
    ["technicians", technicianSearch, statusFilter],
    async ({ pageParam }) => {
      const { statusCode, body } = await technicianService.list({
        limit: 10,
        page: pageParam ?? 1,
        column: "name",
        order: "asc",
        search: technicianSearch,
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
          SuperConsole(body, "technicians");
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
        SuperConsole(error, "technicians");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const onTechnicianSearch = (value?: string) => {
    setTechnicianSearch(value ?? "");
  };

  const onFilterStatus = (value: technicianStatusEnum) => {
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
    navigate(SignedInScreens.TECHNICIANS_REGISTER_FORM);
  };

  const handleGoToDetails = (technicianId: number) => {
    navigate(SignedInScreens.TECHNICIANS_DETAILS, {
      technicianId,
    });
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("technicians");
    }, [])
  );

  const emptyStateTexts = {
    title:
      technicianSearch || statusFilter
        ? "Nenhum técnico encontrado"
        : "Ainda não há técnicos",
    subtitle: technicianSearch
      ? undefined
      : statusFilter
      ? "Não há técnicos com este status"
      : "Cadastre novos técnicos",
    action: technicianSearch
      ? {
          text: "Limpar busca",
          onPress: () => onTechnicianSearch(""),
        }
      : statusFilter
      ? {
          text: "Limpar filtro",
          onPress: () => onFilterStatus(),
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
    },
  };
};
