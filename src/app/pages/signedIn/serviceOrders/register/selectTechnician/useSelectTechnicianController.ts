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
import { SuperConsole } from "@tools/indentedConsole";

export const useSelectTechnicianController = () => {
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();

  const { onSelectTechnician } = useServiceOrderContext();

  const technicianService = new TechnicianService();

  const [techniciansSearch, setTechnicianSearch] = useState("");
  const [listState, setListState] = useState<requestStateEnum | undefined>();
  const [abandomentOpenModalState, setAbandomentOpenModalState] =
    useState(false);

  const onAbandomentModalToggle = () => {
    setAbandomentOpenModalState(!abandomentOpenModalState);
  };

  const {
    data,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isRefetching,
  } = useInfiniteQuery(
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

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleConfirmAbandonment = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS,
    });
  };

  const handleSelect = (technician: ITechnicianModel) => {
    onSelectTechnician(technician);
    navigate(RegisterServiceOrderScreens.SERVICE_FORM);
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
    handleConfirmAbandonment,
    onAbandomentModalToggle,
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
      loadingNextPage: isFetchingNextPage,
      listState,
      abandomentOpenModalState,
    },
  };
};
