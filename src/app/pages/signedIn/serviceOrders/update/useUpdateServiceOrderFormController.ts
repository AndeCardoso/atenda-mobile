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

export const useUpdateServiceOrderFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { serviceOrderId } = params;
  const queryClient = useQueryClient();

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
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body);
          return;
      }
    },
    {
      onError: async (error) => {
        console.log("error - serviceOrder id", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["updateServiceOrder"],
      async (data: IServiceOrderModel) => {
        SuperConsole(data, "aqui");
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
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body);
              return;
          }
        },
        onError: async (error) => {
          console.log(
            "error - serviceOrder register",
            JSON.stringify(error, null, 2)
          );
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
      handleGoBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("getServiceOrderUpdate");
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
