import * as yup from "yup";
import {
  IAddressForm,
  addressObjectSchema,
} from "@components/forms/AddressForm/formSchema";
import { IOption } from "@components/base/Select";
import { cpfValidation } from "@utils/cpfValidation";

export interface ITechnicianForm extends IAddressForm {
  name: string;
  phone: string;
  cpf: string;
  position: IOption | string;
  status?: IOption | string;
}

export const technicianSchema: yup.ObjectSchema<ITechnicianForm> = yup
  .object()
  .shape({
    name: yup
      .string()
      .required("Campo obrigatório")
      .min(4, "Nome deve ter no minímo 4 caracteres")
      .max(32, "Nome deve ter no máximo de 32 caracteres"),
    phone: yup.string().required("Campo obrigatório"),
    cpf: yup
      .string()
      .test("valid-cpf", "CPF inválido", (value) => {
        return cpfValidation(value);
      })
      .required("Campo obrigatório"),
    position: yup
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
    status: yup
      .mixed()
      .test("is-object-or-string", (value) => {
        return (
          yup.object().isValidSync(value) || yup.string().isValidSync(value)
        );
      })
      .notRequired(),
    ...addressObjectSchema,
  });
