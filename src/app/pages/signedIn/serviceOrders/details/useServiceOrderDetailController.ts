import { useCallback } from "react";
import { HttpStatusCode } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
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
import { Platform } from "react-native";
import { openBrowserAsync } from "expo-web-browser";
import { useAuth } from "@hooks/useAuth";

const android = Platform.OS === "android";

export const useServiceOrderDetailController = () => {
  const { colors } = useTheme();
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { serviceOrderId } = params;
  const queryClient = useQueryClient();
  const { logout } = useAuth();

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
        case HttpStatusCode.Unauthorized:
          logout();
          return;
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

  const { mutateAsync: pdfMutateAsync, isLoading: pdfLoading } = useMutation(
    ["getPdfReport", serviceOrderId],
    async () => {
      const { statusCode, body } = await serviceOrderService.getPdfReport(
        serviceOrderId
      );
      switch (statusCode) {
        case HttpStatusCode.Ok:
          await openBrowserAsync(body.url);
          return;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.Unauthorized:
          logout();
          return;
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "getPdfReport");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "getPdfReport");
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
    if (android) {
      await pdfMutateAsync();
      return;
    }
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
      label: "Emitir relatório",
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
      loading: isLoading || pdfLoading,
    },
  };
};
