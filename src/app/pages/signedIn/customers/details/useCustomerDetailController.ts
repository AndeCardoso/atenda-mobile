import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInNavigators, SignedInScreens } from "@routes/screens";
import { useQuery, useQueryClient } from "react-query";
import CustomerService from "@services/customer";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback } from "react";
import { useToast } from "@hooks/useToast";
import { serviceOrderFilteredByEnum } from "@pages/signedIn/serviceOrders/constants";
import { useAuth } from "@hooks/useAuth";

export const useCustomerDetailController = () => {
  const { colors } = useTheme();
  const { unexpectedErrorToast } = useToast();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { customerId } = params;
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const customerService = new CustomerService();

  const { data, isLoading } = useQuery(
    ["customerDetails", customerId],
    async () => {
      const { statusCode, body } = await customerService.get({
        customerId,
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
          SuperConsole(body, "customerDetails");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "customerDetails");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToUpdateCustomer = () => {
    navigate(SignedInScreens.CUSTOMERS_UPDATE_FORM, {
      customerId,
    });
  };

  const handleGoToEquipments = () => {
    navigate(SignedInNavigators.EQUIPMENTS, {
      screen: SignedInScreens.EQUIPMENTS,
      params: { customerId },
    });
  };

  const handleGoToServiceOrderList = () => {
    navigate(SignedInNavigators.SERVICE_ORDERS, {
      screen: SignedInScreens.SERVICE_ORDERS,
      params: {
        id: customerId,
        filteredBy: serviceOrderFilteredByEnum.CUSTOMER,
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
      icon: "laptop",
      label: "Equipamentos",
      onPress: handleGoToEquipments,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "file-edit",
      label: "Atualizar cadastro",
      onPress: handleGoToUpdateCustomer,
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
      queryClient.resetQueries("customerDetails");
    }, [])
  );

  return {
    customerData: data,
    handleGoBack,
    fabActions,
    viewState: {
      loading: isLoading,
    },
  };
};
