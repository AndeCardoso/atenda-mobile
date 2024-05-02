import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import EquipmentService from "@services/equipment";
import { IEquipmentForm } from "../schema";

export const useRegisterEquipmentFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { customerId } = params;

  const equipmentService = new EquipmentService();

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["equipmentRegister"],
      async (data: IEquipmentForm) => {
        const body = {
          ...data,
          customerId: customerId,
          voltage: data.voltage?.text,
          status: data.status.value,
        };
        return await equipmentService.register(body);
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
