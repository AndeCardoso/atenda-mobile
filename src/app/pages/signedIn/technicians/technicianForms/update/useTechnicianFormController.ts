import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { TechnicianRegisterRequestDTO } from "@services/technician/dtos/request/TechnicianRegisterRequestDTO";
import TechnicianService from "@services/technician";
import { ITechnicianForm } from "../schema";
import { unmask } from "@utils/formatString";

export const useTechnicianFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { technicianId } = params;
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
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body);
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
      ["updateTechnician"],
      async (data: ITechnicianForm) => {
        delete data["address"];
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
    if (res.statusCode === HttpStatusCode.Ok) {
      handleGoBack();
    }
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
