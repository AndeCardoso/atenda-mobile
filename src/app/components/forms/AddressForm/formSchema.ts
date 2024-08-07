import { IOption } from "@components/base/Select";
import * as yup from "yup";

export interface IAddressForm {
  nickname?: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  district: string;
  state: IOption | string;
  city: IOption | string;
}

export const addressObjectSchema = {
  nickname: yup
    .string()
    .test({
      name: "min",
      test: (value) => {
        if (!value) return true;
        return value.length >= 4;
      },
      message: "Apelido deve ter no minímo 4 caracteres",
    })
    .test({
      name: "max",
      test: (value) => {
        if (!value) return true;
        return value.length <= 32;
      },
      message: "Apelido deve ter no máximo de 32 caracteres",
    })
    .notRequired(),
  cep: yup.string().required("Campo obrigatório"),
  street: yup.string().required("Campo obrigatório"),
  number: yup.string().required("Campo obrigatório"),
  complement: yup.string().notRequired(),
  district: yup.string().required("Campo obrigatório"),
  state: yup
    .mixed()
    .test("is-object-or-string", "Campo obrigatório", (value) => {
      return (
        (yup.object().isValidSync(value) && Object.keys(value).length > 0) ||
        (yup.string().isValidSync(value) &&
          value !== undefined &&
          value.trim().length > 0)
      );
    })
    .required("Campo obrigatório"),
  city: yup
    .mixed()
    .test("is-object-or-string", "Campo obrigatório", (value) => {
      return (
        (yup.object().isValidSync(value) && Object.keys(value).length > 0) ||
        (yup.string().isValidSync(value) &&
          value !== undefined &&
          value.trim().length > 0)
      );
    })
    .required("Campo obrigatório"),
};

export const addressSchema: yup.ObjectSchema<IAddressForm> = yup
  .object()
  .shape(addressObjectSchema);
