import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useTheme } from "styled-components";
import { SignedInScreens } from "@routes/screens";
import { useQuery, useQueryClient } from "react-query";
import CustomerService from "@services/customer";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { useCallback } from "react";

export const useCustomerDetailController = () => {
  const { colors } = useTheme();
  const { navigate, canGoBack, goBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { customerId } = params;
  const queryClient = useQueryClient();

  const customerService = new CustomerService();

  const { data, isLoading } = useQuery(
    ["customerDetail", customerId],
    async () => {
      const { statusCode, body } = await customerService.get({
        customerId,
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
      onError: async (error) => {
        console.log("error - customers", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleGoToUpdateCustomer = () => {
    navigate(SignedInScreens.TECHNICIANS_UPDATE_FORM, {
      customerId,
    });
  };

  const handleServiceOrderReport = () => {
    console.log("report");
  };

  const actionStyles = {
    borderRadius: 50,
    marginRight: 16,
    backgroundColor: colors.SECONDARY,
  };

  const fabActions = [
    {
      icon: "file-edit",
      label: "Editar cadastro",
      onPress: handleGoToUpdateCustomer,
      color: colors.PRIMARY,
      style: actionStyles,
    },
    {
      icon: "file-table",
      label: "Relatorio de ordens de serviço",
      onPress: handleServiceOrderReport,
      color: colors.PRIMARY,
      style: actionStyles,
    },
  ];

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("customerDetail");
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
