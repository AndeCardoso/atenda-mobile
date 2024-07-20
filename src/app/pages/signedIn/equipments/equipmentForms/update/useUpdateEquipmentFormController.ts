import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { EquipmentRegisterRequestDTO } from "@services/equipment/dtos/request/EquipmentRegisterRequestDTO";
import EquipmentService from "@services/equipment";
import { IEquipmentForm } from "../schema";
import { useCallback } from "react";
import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";

export const useUpdateEquipmentFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast, createToast } = useToast();
  const { params } = useRoute<any>();
  const { equipmentId } = params;
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const equipmentService = new EquipmentService();

  const { data, isLoading: dataLoading } = useQuery(
    ["getEquipmentUpdate", equipmentId],
    async () => {
      const { statusCode, body } = await equipmentService.get(equipmentId);
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
          SuperConsole(body, "getEquipmentUpdate");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "getEquipmentUpdate");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["updateEquipment"],
      async (data: IEquipmentForm) => {
        const body = {
          ...data,
          voltage: data.voltage?.text,
          status: data.status?.value,
        };
        return await equipmentService.update(
          equipmentId,
          body as EquipmentRegisterRequestDTO
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
              SuperConsole(body, "updateEquipment");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "updateEquipment");
          unexpectedErrorToast();
          return;
        },
      }
    );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: IEquipmentForm) => {
    const res = await mutateAsyncRegister(values);
    if (res.statusCode === HttpStatusCode.Ok) {
      createToast({
        message: "Equipamento atualizado com sucesso",
        alertType: "success",
      });
      handleGoBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("getEquipmentUpdate");
    }, [])
  );

  return {
    equipmentData: data,
    handleRegister,
    handleGoBack,
    viewState: {
      registerLoading,
      dataLoading,
    },
  };
};
