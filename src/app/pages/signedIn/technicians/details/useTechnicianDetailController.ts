import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { useQuery, useQueryClient } from "react-query";
import TechnicianService from "@services/technician";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback } from "react";
import { useToast } from "@hooks/useToast";
import { serviceOrderFilteredByEnum } from "@pages/signedIn/serviceOrders/constants";
import { useAuth } from "@hooks/useAuth";

export const useTechnicianDetailController = () => {
  const { colors } = useTheme();
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { technicianId } = params;
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const technicianService = new TechnicianService();

  const { data, isLoading } = useQuery(
    ["technicianDetails", technicianId],
    async () => {
      const { statusCode, body } = await technicianService.get({
        technicianId,
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
          return;
        case HttpStatusCode.Unauthorized:
          logout();
          return;
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "technicianDetails");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "technicianDetails");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToUpdateTechnician = () => {
    navigate(SignedInScreens.TECHNICIANS_UPDATE_FORM, {
      technicianId,
    });
  };

  const handleGoToServiceOrderList = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS,
      params: {
        id: technicianId,
        filteredBy: serviceOrderFilteredByEnum.TECHNICIAN,
      },
    });
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const fabActions = [
    {
      icon: "file-edit",
      label: "Atualizar cadastro",
      onPress: handleGoToUpdateTechnician,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "file-table",
      label: "Histórico de ordens de serviço",
      onPress: handleGoToServiceOrderList,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("technicianDetails");
    }, [])
  );

  return {
    technicianData: data,
    handleGoBack,
    fabActions,
    viewState: {
      loading: isLoading,
    },
  };
};
