import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { EquipmentRegisterRequestDTO } from "@services/equipment/dtos/request/EquipmentRegisterRequestDTO";
import EquipmentService from "@services/equipment";
import { IEquipmentForm } from "../schema";

export const useUpdateEquipmentFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { equipmentId, customerId } = params;
  const equipmentService = new EquipmentService();

  const { data, isLoading: dataLoading } = useQuery(
    ["getEquipmentUpdate", equipmentId],
    async () => {
      const { statusCode, body } = await equipmentService.get(equipmentId);
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
        console.log("error - equipment id", JSON.stringify(error, null, 2));
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
          customerId,
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
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body);
              return;
          }
        },
        onError: async (error) => {
          console.log(
            "error - equipment register",
            JSON.stringify(error, null, 2)
          );
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
      handleGoBack();
    }
  };

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
