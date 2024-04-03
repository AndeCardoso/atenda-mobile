import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { TechnicianRegisterRequestDTO } from "@services/technician/dtos/request/TechnicianRegisterRequestDTO";
import TechnicianService from "@services/technician";
import { ITechnicianForm } from "../schema";

export const useTechnicianFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { technicianId } = params;
  const technicianService = new TechnicianService();

  const { data, isLoading: dataLoading } = useQuery(
    ["getTechnicianUpdate", technicianId],
    async () => {
      const response = await technicianService.get({
        technicianId,
      });
      switch (response.statusCode) {
        case HttpStatusCode.Ok:
          return response.body;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
          SuperConsole(response.body);
          return;
        default:
          SuperConsole(response.body);
          return;
      }
    },
    {
      onError: async (error) => {
        console.log("error - technician id", JSON.stringify(error, null, 2));
        return;
      },
    }
  );

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      async (body: TechnicianRegisterRequestDTO) =>
        await technicianService.update(technicianId, body),
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

    delete body["address"];

    const res = await mutateAsyncRegister(body);
    SuperConsole(res);
    handleGoBack();
  };

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
