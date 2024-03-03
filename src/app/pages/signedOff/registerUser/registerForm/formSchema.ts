import * as yup from "yup";

export interface IRegisterUserForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const registerUserSchema: yup.ObjectSchema<IRegisterUserForm> = yup
  .object()
  .shape(
    {
      name: yup
        .string()
        .required("Campo obrigatório")
        .min(4, "Nome deve ter no minímo 4 caracteres")
        .max(32, "Nome deve ter no máximo de 32 caracteres"),
      email: yup
        .string()
        .email("E-mail inválido")
        .required("Campo obrigatório"),
      password: yup
        .string()
        .required("Campo obrigatório")
        .min(6, "Senha deve ter no minímo 6 caracteres")
        .max(10, "Senha deve ter no máximo de 10 caracteres")
        .oneOf([yup.ref("passwordConfirm")], "Senhas não coincidem"),
      passwordConfirm: yup
        .string()
        .required("Campo obrigatório")
        .oneOf([yup.ref("password")], "Senhas não coincidem"),
    },
    [["password", "passwordConfirm"]]
  );
