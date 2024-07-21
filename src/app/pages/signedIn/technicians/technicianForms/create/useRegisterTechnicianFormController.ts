import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import TechnicianService from "@services/technician";
import { ITechnicianForm } from "../schema";
import { unmask } from "@utils/formatString";
import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";

export const useRegisterTechnicianFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast, createToast } = useToast();
  const { logout } = useAuth();

  const technicianService = new TechnicianService();

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["technicianRegister"],
      async (data: ITechnicianForm) => {
        const body = {
          ...data,
          phone: unmask(data.phone),
          cpf: unmask(data.cpf),
          cep: unmask(data.cep),
          position: data.position.value,
          status: data.status?.value,
          state: data.state.text,
          city: data.city.text,
        };
        return await technicianService.register(body);
      },
      {
        onSuccess: async ({ statusCode, body }) => {
          switch (statusCode) {
            case HttpStatusCode.Created:
              return body;
            case HttpStatusCode.Unauthorized:
              logout();
              return;
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body, "technicianRegister");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "technicianRegister");
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
    if (res.statusCode === HttpStatusCode.Created) {
      createToast({
        message: "Técnico cadastrado com sucesso",
        alertType: "success",
      });
      handleGoBack();
    }
  };

  return {
    handleRegister,
    handleGoBack,
    viewState: {
      registerLoading,
    },
  };
};
