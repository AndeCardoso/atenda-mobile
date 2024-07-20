import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { TechnicianRegisterRequestDTO } from "@services/technician/dtos/request/TechnicianRegisterRequestDTO";
import TechnicianService from "@services/technician";
import { ITechnicianForm } from "../schema";
import { unmask } from "@utils/formatString";
import { useCallback } from "react";
import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";

export const useUpdateTechnicianFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast, createToast } = useToast();
  const { params } = useRoute<any>();
  const { technicianId } = params;
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const technicianService = new TechnicianService();

  const { data, isLoading: dataLoading } = useQuery(
    ["getTechnicianUpdate", technicianId],
    async () => {
      const { statusCode, body } = await technicianService.get({
        technicianId,
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
          SuperConsole(body, "getTechnicianUpdate");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "getTechnicianUpdate");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["updateTechnician"],
      async (data: ITechnicianForm) => {
        const body = {
          ...data,
          phone: unmask(data.phone),
          cpf: unmask(data.cpf),
          cep: unmask(data.cep),
          position: data.position.value,
          status: data.status?.value,
          state: data.state.text ?? data.state,
          city: data.city.text ?? data.city,
        };
        return await technicianService.update(
          technicianId,
          body as TechnicianRegisterRequestDTO
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
              SuperConsole(body, "updateTechnician");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "updateTechnician");
          unexpectedErrorToast();
          return;
        },
      }
    );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: ITechnicianForm) => {
    const res = await mutateAsyncRegister(values);
    if (res.statusCode === HttpStatusCode.Ok) {
      createToast({
        message: "Técnico atualizado com sucesso",
        alertType: "success",
      });
      handleGoBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.resetQueries("getTechnicianUpdate");
    }, [])
  );

  return {
    technicianData: data,
    handleRegister,
    handleGoBack,
    viewState: {
      registerLoading,
      dataLoading,
    },
  };
};
