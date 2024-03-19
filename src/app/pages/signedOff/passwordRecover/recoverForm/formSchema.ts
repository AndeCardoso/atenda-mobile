import * as yup from "yup";

export interface IRecoverPasswordForm {
  email: string;
  password: string;
  passwordConfirm: string;
  token: string;
}

export const recoverPasswordSchema: yup.ObjectSchema<IRecoverPasswordForm> = yup
  .object()
  .shape(
    {
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
      token: yup.string().required("Campo obrigatório"),
    },
    [["password", "passwordConfirm"]]
  );
