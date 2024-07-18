import { HttpStatusCode } from "axios";
import { useMutation } from "react-query";
import CompanyService from "@services/company";
import { SuperConsole } from "@tools/indentedConsole";
import { useNavigation } from "@react-navigation/native";
import { IRegisterCompanyForm } from "./registerForm/formSchema";
import { CompanyRegisterRequestDTO } from "@services/company/dtos/request/CompanyRegisterRequestDTO";
import { unmask } from "@utils/formatString";
import { useToast } from "@hooks/useToast";

export const useRegisterUserController = () => {
  const { goBack, canGoBack } = useNavigation<any>();
  const { unexpectedErrorToast } = useToast();

  const companyService = new CompanyService();

  const { mutateAsync: mutateAsyncRegister, isLoading } = useMutation(
    ["companyRegister"],
    async ({
      companyName,
      companyDocument,
      name,
      email,
      password,
    }: CompanyRegisterRequestDTO) =>
      await companyService.register({
        companyName,
        companyDocument,
        name,
        email,
        password,
      }),
    {
      onSuccess: async ({ statusCode, body }) => {
        switch (statusCode) {
          case HttpStatusCode.Created:
            return body;
          case HttpStatusCode.BadRequest:
          default:
            SuperConsole(body, "companyRegister");
            unexpectedErrorToast();
            return;
        }
      },
      onError: async (error) => {
        SuperConsole(error, "companyRegister");
        unexpectedErrorToast();
        return;
      },
    }
  );

  const handleGoBack = () => {
    canGoBack && goBack();
  };

  const handleRegister = async (values: IRegisterCompanyForm) => {
    const fixedValues = {
      ...values,
      companyDocument: unmask(values.companyDocument),
    };
    const res = await mutateAsyncRegister(fixedValues);
    if (res.statusCode === HttpStatusCode.Created) {
      handleGoBack();
    }
  };

  return {
    handleRegister,
    handleGoBack,
    viewState: {
      loading: isLoading,
    },
  };
};
