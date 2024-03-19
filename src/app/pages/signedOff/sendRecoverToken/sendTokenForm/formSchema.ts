import * as yup from "yup";

export interface ISendRecoverTokenForm {
  email: string;
}

export const sendRecoverTokenSchema: yup.ObjectSchema<ISendRecoverTokenForm> =
  yup.object().shape({
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
  });
