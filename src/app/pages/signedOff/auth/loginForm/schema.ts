import * as yup from "yup";

export interface IAuthForm {
  email: string;
  password: string;
}

export const authSchema: yup.ObjectSchema<IAuthForm> = yup.object().shape({
  email: yup.string().email().required("E-mail é obrigatório"),
  password: yup.string().required("Senha é obrigatório"),
});
