import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";
import { SuperConsole } from "@tools/indentedConsole";
import CustomerService from "@services/customer";
import { HttpStatusCode } from "axios";
import { ICustomerForm } from "../schema";
import { unmask } from "@utils/formatString";
import { IAddressForm } from "@components/forms/AddressForm/formSchema";
import { useToast } from "@hooks/useToast";

export const useRegisterCustomerFormController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { createToast, unexpectedErrorToast } = useToast();

  const customerService = new CustomerService();

  const { mutateAsync: mutateAsyncRegister, isLoading: registerLoading } =
    useMutation(
      ["customerRegister"],
      async (data: ICustomerForm) => {
        const newAddresses: IAddressForm[] = [];
        data.addresses.map((address) => {
          newAddresses.push({
            ...address,
            cep: unmask(address.cep),
            state: address.state.text,
            city: address.city.text,
          });
        });
        const body = {
          ...data,
          phone: unmask(data.phone),
          secondPhone: unmask(data.secondPhone),
          status: data.status?.value,
          addresses: newAddresses,
        };
        return await customerService.register(body);
      },
      {
        onSuccess: async ({ statusCode, body }) => {
          switch (statusCode) {
            case HttpStatusCode.Created:
              return body;
            case HttpStatusCode.BadRequest:
            default:
              SuperConsole(body, "customerRegister");
              unexpectedErrorToast();
              return;
          }
        },
        onError: async (error) => {
          SuperConsole(error, "customerRegister");
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
