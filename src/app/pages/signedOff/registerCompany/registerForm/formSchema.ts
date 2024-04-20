import {
  IUserForm,
  userSchemaObject,
} from "@pages/signedIn/users/usersForms/schema";
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
        .test({
          name: "min",
          test: (value) => {
            if (!value) return true;
            return unmask(value).length >= 11;
          },
          message: "Documento da empresa deve ter no minímo 11 caracteres",
        })
        .test({
          name: "max",
          test: (value) => {
            if (!value) return true;
            return unmask(value).length <= 14;
          },
          message: "Documento da empresa deve ter no máximo de 14 caracteres",
        }),
      ...userSchemaObject,
    },
    [["password", "passwordConfirm"]]
  );
