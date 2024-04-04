import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { TechnicianRegisterRequestDTO } from "@services/technician/dtos/request/TechnicianRegisterRequestDTO";
import TechnicianService from "@services/technician";
import { ITechnicianForm } from "../schema";

export const useTechnicianFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();

  const technicianService = new TechnicianService();

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      async (body: TechnicianRegisterRequestDTO) =>
        await technicianService.register(body),
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
    const body = {
      ...values,
      phone: values.phone.replace(/[^\d]/g, ""),
      cpf: values.cpf.replace(/[^\d]/g, ""),
      cep: values.cep.replace(/[^\d]/g, ""),
    };

    const res = await mutateAsyncRegister(body);
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
