import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery, useQueryClient } from "react-query";
import TechnicianService from "@services/technician";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback, useState } from "react";

export const useTechniciansController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const queryClient = useQueryClient();

  const technicianService = new TechnicianService();

  const [technicianSearch, setTechnicianSearch] = useState("");

  const { data, isLoading } = useInfiniteQuery(
    ["technicians", technicianSearch],
    async ({ pageParam }) => {
      const { statusCode, body } = await technicianService.list({
        limit: 10,
        page: pageParam ?? 1,
        column: "name",
        order: "asc",
        search: undefined,
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
        console.log("error - technicians", JSON.stringify(error, null, 2));
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

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const handleGoToRegister = () => {
    navigate(SignedInScreens.TECHNICIANS_REGISTER_FORM);
  };

  const handleGoToDetails = (technicianId: number) => {
    navigate(SignedInScreens.TECHNICIANS_DETAILS, {
      technicianId,
    });
  };

  const fabActions = [
    {
      icon: "refresh",
      label: "Atualizar",
      onPress: handleGoToRegister,
      color: colors.PRIMARY,
      style: actionStyles,
    },
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
      queryClient.invalidateQueries("technicians");
    }, [])
  );

  return {
    technicianList: data?.pages[0]?.data,
    onTechnicianSearch,
    handleGoToDetails,
    handleGoBack,
    fabActions,
    viewState: {
      loading: isLoading,
    },
  };
};