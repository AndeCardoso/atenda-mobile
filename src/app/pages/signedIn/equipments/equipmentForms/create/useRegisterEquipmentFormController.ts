import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import EquipmentService from "@services/equipment";
import { IEquipmentForm } from "../schema";
import { useToast } from "@hooks/useToast";
import { useAuth } from "@hooks/useAuth";

export const useRegisterEquipmentFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast, createToast } = useToast();
  const { params } = useRoute<any>();
  const { customerId } = params;
  const { logout } = useAuth();

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
            case HttpStatusCode.Unauthorized:
              logout();
              return;
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body, "equipmentRegister");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "equipmentRegister");
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
    if (res.statusCode === HttpStatusCode.Created) {
      createToast({
        message: "Equipamento cadastrado com sucesso",
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
