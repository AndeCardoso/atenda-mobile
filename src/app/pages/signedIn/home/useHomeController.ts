import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
import { useTheme } from "styled-components";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { useQuery, useQueryClient } from "react-query";
import HomeService from "@services/home";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback } from "react";
import { useToast } from "@hooks/useToast";

export const useHomeController = () => {
  const { colors } = useTheme();
  const { unexpectedErrorToast } = useToast();
  const { navigate } = useNavigation<any>();
  const { logout, userData } = useAuth();
  const queryClient = useQueryClient();

  const homeService = new HomeService();

  const { data: advertiseData, isLoading: isLodingAdvertise } = useQuery(
    ["advertise"],
    async () => {
      const { statusCode, body } = await homeService.getAdvertise();
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          return [];
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "advertise");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "advertise");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const handleGoToTechnicians = () => {
    navigate(SignedInNavigators.TECHNICIANS);
  };

  const handleGoToCustomers = () => {
    navigate(SignedInNavigators.CUSTOMERS);
  };

  const handleGoToServiceOrders = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS);
  };

  const handleGoToUsers = () => {
    navigate(SignedInNavigators.USERS);
  };

  const fabActions = [
    {
      icon: "logout",
      onPress: logout,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "tools",
      label: "Técnicos",
      onPress: handleGoToTechnicians,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "head",
      label: "Clientes",
      onPress: handleGoToCustomers,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "file-plus",
      label: "Ordens de serviço",
      onPress: handleGoToServiceOrders,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  if (userData?.admin) {
    fabActions.push({
      icon: "account-key",
      label: "Usuários",
      onPress: handleGoToUsers,
      color: colors.PRIMARY,
      style: actionStyles,
    });
  }

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("advertise");
    }, [])
  );

  return {
    userData,
    advertiseData,
    fabActions,
    viewState: {
      isLodingAdvertise,
    },
  };
};
