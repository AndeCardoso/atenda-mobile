import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import TechnicianService from "@services/technician";
import { ITechnicianForm } from "../schema";
import { unmask } from "@utils/formatString";

export const useRegisterTechnicianFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();

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
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body);
              return;
          }
        },
        onError: async (error) => {
          console.log(
            "error - technician register",
            JSON.stringify(error, null, 2)
          );
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
