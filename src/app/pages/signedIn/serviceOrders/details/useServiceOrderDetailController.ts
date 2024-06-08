import { useCallback } from "react";
import { HttpStatusCode } from "axios";
import { useQuery, useQueryClient } from "react-query";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { SuperConsole } from "@tools/indentedConsole";
import ServiceOrderService from "@services/serviceOrder";
import { useToast } from "@hooks/useToast";

export const useServiceOrderDetailController = () => {
  const { colors } = useTheme();
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { serviceOrderId } = params;
  const queryClient = useQueryClient();

  const serviceOrderService = new ServiceOrderService();

  const { data, isLoading } = useQuery(
    ["serviceOrderDetails", serviceOrderId],
    async () => {
      const { statusCode, body } = await serviceOrderService.get({
        serviceOrderId,
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "serviceOrderDetails");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "serviceOrderDetails");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleGoToTechnicianDetail = (technicianId: number) => {
    navigate(SignedInNavigators.TECHNICIANS, {
      screen: SignedInScreens.TECHNICIANS_DETAILS,
      params: { technicianId },
    });
  };

  const handleGoToCustomerDetail = (customerId: number) => {
    navigate(SignedInNavigators.CUSTOMERS, {
      screen: SignedInScreens.CUSTOMERS_DETAILS,
      params: { customerId },
    });
  };

  const handleGoToPdfView = async () => {
    navigate(SignedInScreens.SERVICE_ORDERS_REPORT, {
      serviceOrderId,
    });
  };

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToUpdateServiceOrder = () => {
    navigate(SignedInScreens.SERVICE_ORDERS_UPDATE_FORM, {
      serviceOrderId,
    });
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const fabActions = [
    {
      icon: "file-pdf-box",
      label: "Emitir PDF",
      onPress: handleGoToPdfView,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "file-edit",
      label: "Atualizar cadastro",
      onPress: handleGoToUpdateServiceOrder,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("serviceOrderDetails");
    }, [])
  );

  return {
    serviceOrderData: data,
    handleGoToTechnicianDetail,
    handleGoToCustomerDetail,
    handleGoBack,
    fabActions,
    viewState: {
      loading: isLoading,
    },
  };
};
