import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { CustomerRegisterRequestDTO } from "@services/customer/dtos/request/CustomerRegisterRequestDTO";
import CustomerService from "@services/customer";
import { ICustomerForm } from "../schema";
import { unmask } from "@utils/formatString";
import { useCallback, useState } from "react";
import { useToast } from "@hooks/useToast";

export const useUpdateCustomerFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { createToast, unexpectedErrorToast } = useToast();
  const { params } = useRoute<any>();
  const { customerId } = params;
  const queryClient = useQueryClient();

  const customerService = new CustomerService();

  const [buttonEnabledState, setButtonEnabledState] = useState<boolean>(true);

  const handleEnabledButton = (enable: boolean) => {
    setButtonEnabledState(enable);
  };

  const { data, isLoading: dataLoading } = useQuery(
    ["getCustomerUpdate", customerId],
    async () => {
      const { statusCode, body } = await customerService.get({
        customerId,
      });
      switch (statusCode) {
        case HttpStatusCode.Ok:
          return body;
        case HttpStatusCode.NoContent:
        case HttpStatusCode.BadRequest:
        default:
          SuperConsole(body, "getCustomerUpdate");
          unexpectedErrorToast();
          return;
      }
    },
    {
      onError: async (error) => {
        SuperConsole(error, "getCustomerUpdate");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["updateCustomer"],
      async (data: ICustomerForm) => {
        const addressBody = data?.addresses?.map((address) => {
          return {
            ...address,
            cep: unmask(address.cep),
            state: address.state.text ?? address.state,
            city: address.city.text ?? address.city,
          };
        });
        const body = {
          ...data,
          phone: unmask(data.phone),
          secondPhone: unmask(data.secondPhone),
          document: unmask(data.document),
          status: data.status?.value,
          addresses: addressBody,
        };
        return await customerService.update(
          customerId,
          body as CustomerRegisterRequestDTO
        );
      },
      {
        onSuccess: async ({ statusCode, body }) => {
          switch (statusCode) {
            case HttpStatusCode.Ok:
              return body;
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body, "updateCustomer");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "updateCustomer");
          unexpectedErrorToast();
          return;
        },
      }
    );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: ICustomerForm) => {
    const addressesForm = values.addresses;
    if (addressesForm.length === 0) {
      createToast({
        duration: 5000,
        alertType: "alert",
        message: "É obrigatório informar ao menos um endereço",
      });
      return;
    }
    const res = await mutateAsyncRegister(values);
    if (res.statusCode === HttpStatusCode.Ok) {
      handleGoBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      queryClient.invalidateQueries("getCustomerUpdate");
    }, [])
  );

  return {
    customerData: data,
    handleEnabledButton,
    handleRegister,
    handleGoBack,
    viewState: {
      registerLoading,
      dataLoading,
      buttonEnabledState,
    },
  };
};
