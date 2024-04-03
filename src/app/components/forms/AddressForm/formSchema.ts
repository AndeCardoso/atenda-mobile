import * as yup from "yup";

export interface IAdressForm {
  nickname?: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  state: string;
  city: string;
}

export const addressObjectSchema = {
  nickname: yup.string(),
  cep: yup.string().required("Campo obrigatório"),
  street: yup.string().required("Campo obrigatório"),
  number: yup.string().required("Campo obrigatório"),
  complement: yup.string(),
  district: yup.string().required("Campo obrigatório"),
  state: yup.string().required("Campo obrigatório"),
  city: yup.string().required("Campo obrigatório"),
};

export const adressSchema: yup.ObjectSchema<IAdressForm> = yup
  .object()
  .shape(addressObjectSchema);
