import {
  IUserForm,
  userSchemaObject,
} from "@pages/signedIn/users/usersForms/schema";
import { cnpjValidation } from "@utils/cnpjValidation";
import { cpfValidation } from "@utils/cpfValidation";
import { unmask } from "@utils/formatString";
import * as yup from "yup";

export interface IRegisterCompanyForm extends IUserForm {
  companyName?: string;
  companyDocument: string;
}

export const registerCompanySchema: yup.ObjectSchema<IRegisterCompanyForm> = yup
  .object()
  .shape(
    {
      companyName: yup
        .string()
        .test({
          name: "min",
          test: (value) => {
            if (!value) return true;
            return value.length >= 4;
          },
          message: "Nome da empresa deve ter no minímo 4 caracteres",
        })
        .test({
          name: "max",
          test: (value) => {
            if (!value) return true;
            return value.length <= 32;
          },
          message: "Nome da empresa deve ter no máximo de 32 caracteres",
        }),
      companyDocument: yup
        .string()
        .test("valid-document", "Documento inválido", (value) => {
          if (value && value.length === 14) {
            return cpfValidation(value);
          }
          return cnpjValidation(value);
        }),
      ...userSchemaObject,
    },
    [["password", "passwordConfirm"]]
  );
