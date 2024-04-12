import {
  IUserForm,
  userSchemaObject,
} from "@pages/signedIn/users/usersForms/schema";
import * as yup from "yup";

export interface IRegisterCompanyForm extends IUserForm {
  companyName?: string;
}

export const registerCompanySchema: yup.ObjectSchema<IRegisterCompanyForm> = yup
  .object()
  .shape(
    {
      companyName: yup
        .string()
        .min(4, "Nome deve ter no minímo 4 caracteres")
        .max(32, "Nome deve ter no máximo de 32 caracteres"),
      ...userSchemaObject,
    },
    [["password", "passwordConfirm"]]
  );
