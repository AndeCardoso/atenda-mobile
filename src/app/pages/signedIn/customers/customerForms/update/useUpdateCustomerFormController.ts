import { useNavigation, useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "react-query";
import { HttpStatusCode } from "axios";
import { SuperConsole } from "@tools/indentedConsole";
import { CustomerRegisterRequestDTO } from "@services/customer/dtos/request/CustomerRegisterRequestDTO";
import CustomerService from "@services/customer";
import { ICustomerForm } from "../schema";
import { unmask } from "@utils/formatString";
import { useState } from "react";

export const useUpdateCustomerFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { params } = useRoute<any>();
  const { customerId } = params;
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
          SuperConsole(body);
          return;
      }
    },
    {
      onError: async (error) => {
        console.log("error - customer id", JSON.stringify(error, null, 2));
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
              SuperConsole(body);
              return;
          }
        },
        onError: async (error) => {
          console.log(
            "error - customer register",
            JSON.stringify(error, null, 2)
          );
          return;
        },
      }
    );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: ICustomerForm) => {
    // SuperConsole(values);
    const res = await mutateAsyncRegister(values);
    if (res.statusCode === HttpStatusCode.Ok) {
      handleGoBack();
    }
  };

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
