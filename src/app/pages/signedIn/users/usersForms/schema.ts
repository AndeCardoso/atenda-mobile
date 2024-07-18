import * as yup from "yup";

export interface IUserForm {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export const userSchemaObject = {
  name: yup
    .string()
    .test({
      name: "min",
      test: (value) => {
        if (!value) return true;
        return value.length >= 4;
      },
      message: "Nome de usuário deve ter no minímo 4 caracteres",
    })
    .test({
      name: "max",
      test: (value) => {
        if (!value) return true;
        return value.length <= 32;
      },
      message: "Nome de usuário deve ter no máximo de 32 caracteres",
    })
    .required("Campo obrigatório"),
  email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
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
};

export const userSchema: yup.ObjectSchema<IUserForm> = yup
  .object()
  .shape({ ...userSchemaObject }, [["password", "passwordConfirm"]]);
