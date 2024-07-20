import { useCallback } from "react";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { ServiceOrderRegisterRequestDTO } from "@services/serviceOrder/dtos/request/ServiceOrderRegisterRequestDTO";
import ServiceOrderService from "@services/serviceOrder";
import { IServiceForm } from "../schema";
import { IServiceOrderModel } from "@model/entities/serviceOrder";
import { useToast } from "@hooks/useToast";
import { convertCurrencyToNumber } from "@utils/convertCurrency";
import { useAuth } from "@hooks/useAuth";

export const useUpdateServiceOrderFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast, createToast } = useToast();
  const { params } = useRoute<any>();
  const { serviceOrderId } = params;
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const serviceOrderService = new ServiceOrderService();

  const { data, isLoading: dataLoading } = useQuery(
    ["getServiceOrderUpdate", serviceOrderId],
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
          SuperConsole(body, "getServiceOrderUpdate");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "getServiceOrderUpdate");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["updateServiceOrder"],
      async (data: IServiceOrderModel) => {
        const body: ServiceOrderRegisterRequestDTO = {
          addressId: Number(data.address.id),
          customerId: Number(data.customer.id),
          equipmentId: Number(data.equipment.id),
          technicianId: Number(data.technician.id),
          orderedServices: data.orderedServices,
          reportedDefect: data.reportedDefect,
          selectedVoltage: data.selectedVoltage.text || data.selectedVoltage,
          executedServices: data.executedServices,
          foundDefect: data.foundDefect,
          observations: data.observations,
          openedAt: data.openedAt,
          closedAt: data.closedAt,
          totalValue: convertCurrencyToNumber(data.totalValue),
          status: data.status.value || data.status,
        };
        return await serviceOrderService.update(
          serviceOrderId,
          body as ServiceOrderRegisterRequestDTO
        );
      },
      {
        onSuccess: async ({ statusCode, body }) => {
          switch (statusCode) {
            case HttpStatusCode.Ok:
              return body;
            case HttpStatusCode.Unauthorized:
              logout();
              return;
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body, "updateServiceOrder");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "updateServiceOrder");
          unexpectedErrorToast();
          return;
        },
      }
    );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: IServiceForm) => {
    const res = await mutateAsyncRegister(values);
    if (res.statusCode === HttpStatusCode.Ok) {
      createToast({
        message: "O.S. atualizada com sucesso",
        alertType: "success",
      });
      handleGoBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("getServiceOrderUpdate");
    }, [])
  );

  return {
    serviceOrderData: data,
    handleRegister,
    handleGoBack,
    viewState: {
      registerLoading,
      dataLoading,
    },
  };
};
