import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useInfiniteQuery } from "react-query";
import TechnicianService from "@services/technician";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useState } from "react";

export const useTechniciansController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const technicianService = new TechnicianService();

  const [technicianSearch, setTechnicianSearch] = useState("");

  const { data } = useInfiniteQuery(
    ["technicians", technicianSearch],
    async ({ pageParam }) => {
      const response = await technicianService.list({
        limit: 10,
        page: pageParam ?? 1,
        column: "name",
        order: "asc",
        search: undefined,
      });
      switch (response.statusCode) {
        case HttpStatusCode.Ok:
          return response.body;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
          SuperConsole(response.body);
          return;
        default:
          SuperConsole(response.body);
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
      refetchOnWindowFocus: true,
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

  return {
    technicianList: data?.pages[0]?.data,
    onTechnicianSearch,
    handleGoToDetails,
    handleGoBack,
    fabActions,
  };
};
